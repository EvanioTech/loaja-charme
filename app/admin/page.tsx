'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

function sanitizarNome(nome: string): string {
  if (!nome) return 'imagem_mobile.jpg'
  return String(nome)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.(?=.*\.)/g, '_')
}

type Produto = {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem_url: string
  disponivel: boolean
}

type Banner = {
  id: string
  imagem_url: string
  ordem: number
}

export default function AdminPage() {
  const [aba, setAba] = useState<'cadastrar' | 'gerenciar' | 'banners'>('cadastrar')
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")
  const [arquivoProduto, setArquivoProduto] = useState<File | null>(null)
  const [arquivoBanner, setArquivoBanner] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [editando, setEditando] = useState<Produto | null>(null)
  const [loadingBanner, setLoadingBanner] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function verificarSessao() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) router.push('/admin/login')
    }
    verificarSessao()
  }, [router])

  useEffect(() => {
    if (aba === 'gerenciar') buscarProdutos()
    if (aba === 'banners') buscarBanners()
  }, [aba])

  // ========== PRODUTOS ==========
  async function buscarProdutos() {
    const { data } = await supabase.from('produtos').select('*')
    if (data) setProdutos(data)
  }

  function selecionarImagemProduto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setArquivoProduto(file)
    setPreview(URL.createObjectURL(file))
  }

  function selecionarImagemBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setArquivoBanner(file)
  }

  async function uploadImagemProduto(): Promise<string | null> {
    if (!arquivoProduto) return null
    const nomeArquivo = `${Date.now()}_${sanitizarNome(arquivoProduto.name)}`
    console.log("Upload produto:", nomeArquivo)
    try {
      // Converte para ArrayBuffer para evitar o bug de travamento do Safari/iOS em HTTP/2 na Vercel
      const buffer = await arquivoProduto.arrayBuffer()
      
      const { error, data } = await supabase.storage.from('produtos').upload(nomeArquivo, buffer, {
        contentType: arquivoProduto.type
      })
      
      console.log("Erro:", error, "Data:", data)
      if (error) {
        console.error("Erro no Supabase Storage:", error)
        alert("Falha no upload (Storage): " + error.message)
        return null
      }
      const { data: urlData } = supabase.storage.from('produtos').getPublicUrl(nomeArquivo)
      return urlData.publicUrl
    } catch (err: any) {
      console.error("Exceção ao fazer upload:", err)
      alert("Erro inesperado no upload: " + (err.message || "Desconhecido"))
      return null
    }
  }

  async function cadastrarProduto() {
    console.log("arquivoProduto:", arquivoProduto)
    if (!arquivoProduto) return alert("Seleciona uma imagem!")
    setLoading(true)

    try {
      const url = await uploadImagemProduto()
      if (!url) { alert("Erro no upload!"); setLoading(false); return }

      const { error } = await supabase.from('produtos').insert({
        nome, descricao, preco: Number(preco), imagem_url: url, disponivel: true
      })

      if (error) {
        console.error("Erro ao cadastrar no banco:", error)
        alert("Erro ao cadastrar no banco: " + error.message)
      } else {
        setSucesso(true)
        setNome(""); setDescricao(""); setPreco("")
        setArquivoProduto(null); setPreview(null)
        setTimeout(() => setSucesso(false), 3000)
      }
    } catch (err: any) {
      console.error("Erro geral (crash):", err)
      alert("Erro inesperado no celular: " + (err.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  async function salvarEdicao() {
    if (!editando) return
    setLoading(true)
    let imagemUrl = editando.imagem_url
    if (arquivoProduto) {
      const url = await uploadImagemProduto()
      if (url) imagemUrl = url
    }
    await supabase.from('produtos').update({
      nome: editando.nome,
      descricao: editando.descricao,
      preco: editando.preco,
      imagem_url: imagemUrl
    }).eq('id', editando.id)

    setEditando(null)
    setArquivoProduto(null)
    setPreview(null)
    buscarProdutos()
    setLoading(false)
  }

  async function deletarProduto(id: string) {
    if (!confirm("Deletar produto?")) return
    await supabase.from('produtos').delete().eq('id', id)
    buscarProdutos()
  }

  // ========== BANNERS ==========
  async function buscarBanners() {
    const { data } = await supabase.from('banners').select('*').order('ordem')
    if (data) setBanners(data)
  }

  async function adicionarBanner() {
    if (!arquivoBanner) return alert("Seleciona uma imagem!")
    if (banners.length >= 3) return alert("Máximo 3 banners!")
    setLoadingBanner(true)

    const nomeArquivo = `banner_${Date.now()}_${sanitizarNome(arquivoBanner.name)}`
    console.log("Upload banner:", nomeArquivo)

    try {
      const buffer = await arquivoBanner.arrayBuffer()

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('produtos')
        .upload(nomeArquivo, buffer, {
          contentType: arquivoBanner.type
        })

      console.log("Upload error:", uploadError)
      console.log("Upload data:", uploadData)

      if (uploadError) {
        alert(`Erro: ${uploadError.message}`)
        setLoadingBanner(false)
        return
      }

      const { data } = supabase.storage.from('produtos').getPublicUrl(nomeArquivo)

      await supabase.from('banners').insert({
        imagem_url: data.publicUrl,
        ordem: banners.length
      })
    } catch (err: any) {
      alert("Erro inesperado no banner: " + (err.message || String(err)))
    } finally {
      setArquivoBanner(null)
      buscarBanners()
      setLoadingBanner(false)
    }
  }

  async function deletarBanner(id: string) {
    if (!confirm("Remover banner?")) return
    await supabase.from('banners').delete().eq('id', id)
    buscarBanners()
  }

  async function fazerLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="font-bold text-lg mx-auto pl-8">
          Admin — Charme Chicc
        </div>
        <button onClick={fazerLogout} className="bg-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700">
          Sair
        </button>
      </div>

      <div className="flex">
        {(['cadastrar', 'gerenciar', 'banners'] as const).map((a) => (
          <button
            key={a}
            onClick={() => setAba(a)}
            className={`flex-1 py-3 font-bold text-sm capitalize ${aba === a ? 'bg-white border-b-2 border-black' : 'bg-gray-200 text-gray-500'}`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="p-4 max-w-md mx-auto">

        {/* ABA CADASTRAR */}
        {aba === 'cadastrar' && (
          <div className="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
            {sucesso && (
              <p className="bg-green-100 text-green-700 p-3 rounded-xl text-center">Produto cadastrado! ✅</p>
            )}
            <input placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} className="border rounded-xl p-3" />
            <input placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="border rounded-xl p-3" />
            <input placeholder="Preço (ex: 45.00)" value={preco} onChange={(e) => setPreco(e.target.value)} className="border rounded-xl p-3" />
            <label className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50">
              {preview
                ? <img src={preview} alt="Preview" className="rounded-xl object-cover w-full h-48" />
                : <span className="text-gray-400">Clique para selecionar imagem</span>
              }
              <input type="file" accept="image/*" onChange={selecionarImagemProduto} className="hidden" />
            </label>
            <button
              onClick={cadastrarProduto}
              disabled={loading}
              className="bg-black text-white py-3 rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? "Cadastrando..." : "Cadastrar Produto"}
            </button>
          </div>
        )}

        {/* ABA GERENCIAR */}
        {aba === 'gerenciar' && (
          <div className="flex flex-col gap-4">
            {produtos.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-4 shadow">
                {editando?.id === p.id ? (
                  <div className="flex flex-col gap-3">
                    <img src={preview || editando.imagem_url} alt={editando.nome} className="rounded-xl object-cover w-full h-40" />
                    <label className="border-2 border-dashed rounded-xl p-2 text-center cursor-pointer text-sm text-gray-400">
                      Trocar imagem
                      <input type="file" accept="image/*" onChange={selecionarImagemProduto} className="hidden" />
                    </label>
                    <input value={editando.nome} onChange={(e) => setEditando({ ...editando, nome: e.target.value })} className="border rounded-xl p-2" />
                    <input value={editando.descricao} onChange={(e) => setEditando({ ...editando, descricao: e.target.value })} className="border rounded-xl p-2" />
                    <input value={editando.preco} onChange={(e) => setEditando({ ...editando, preco: Number(e.target.value) })} className="border rounded-xl p-2" />
                    <div className="flex gap-2">
                      <button onClick={salvarEdicao} disabled={loading} className="flex-1 bg-black text-white py-2 rounded-xl font-bold">
                        {loading ? "Salvando..." : "Salvar"}
                      </button>
                      <button onClick={() => { setEditando(null); setPreview(null) }} className="flex-1 bg-gray-200 py-2 rounded-xl">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 items-center">
                    <img src={p.imagem_url} alt={p.nome} className="rounded-xl object-cover w-20 h-20 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold">{p.nome}</p>
                      <p className="text-gray-500 text-sm">{p.descricao}</p>
                      <p className="font-bold text-green-600">R$ {p.preco}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => { setEditando(p); setPreview(null) }} className="bg-gray-100 px-3 py-1 rounded-lg text-sm">✏️</button>
                      <button onClick={() => deletarProduto(p.id)} className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm">🗑️</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ABA BANNERS */}
        {aba === 'banners' && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 text-sm text-center">{banners.length}/3 banners</p>

            {banners.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl p-4 shadow relative">
                <img src={b.imagem_url} alt="Banner" className="rounded-xl object-cover w-full h-40" />
                <button
                  onClick={() => deletarBanner(b.id)}
                  className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  🗑️
                </button>
              </div>
            ))}

            {banners.length < 3 && (
              <div className="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
                <label className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50">
                  {arquivoBanner
                    ? <p className="text-green-600 font-bold">{arquivoBanner.name} ✅</p>
                    : <span className="text-gray-400">Selecionar banner</span>
                  }
                  <input type="file" accept="image/*" onChange={selecionarImagemBanner} className="hidden" />
                </label>
                <button onClick={adicionarBanner} disabled={loadingBanner} className="bg-black text-white py-3 rounded-xl font-bold disabled:opacity-50">
                  {loadingBanner ? "Enviando..." : "Adicionar Banner"}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}