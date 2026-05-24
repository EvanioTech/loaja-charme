'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Produto = {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem_url: string
  disponivel: boolean
}

export default function AdminPage() {
  const [aba, setAba] = useState<'cadastrar' | 'gerenciar'>('cadastrar')
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [editando, setEditando] = useState<Produto | null>(null)

  const router = useRouter()

useEffect(() => {
  async function verificarSessao() {
    const { data } = await supabase.auth.getSession()
    if (!data.session) router.push('/admin/login')
  }
  verificarSessao()
}, [])

  useEffect(() => {
    if (aba === 'gerenciar') buscarProdutos()
  }, [aba])

  async function buscarProdutos() {
    const { data } = await supabase.from('produtos').select('*')
    if (data) setProdutos(data)
  }

  function selecionarImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setArquivo(file)
    setPreview(URL.createObjectURL(file))
  }

  async function uploadImagem(): Promise<string | null> {
    if (!arquivo) return null
    const nomeArquivo = `${Date.now()}_${arquivo.name}`
    const { error } = await supabase.storage.from('produtos').upload(nomeArquivo, arquivo)
    if (error) return null
    const { data } = supabase.storage.from('produtos').getPublicUrl(nomeArquivo)
    return data.publicUrl
  }

  async function cadastrarProduto() {
    if (!arquivo) return alert("Seleciona uma imagem!")
    setLoading(true)
    const url = await uploadImagem()
    if (!url) { alert("Erro no upload!"); setLoading(false); return }

    const { error } = await supabase.from('produtos').insert({
      nome, descricao, preco: Number(preco), imagem_url: url, disponivel: true
    })

    if (!error) {
      setSucesso(true)
      setNome(""); setDescricao(""); setPreco("")
      setArquivo(null); setPreview(null)
      setTimeout(() => setSucesso(false), 3000)
    }
    setLoading(false)
  }

  async function salvarEdicao() {
    if (!editando) return
    setLoading(true)

    let imagemUrl = editando.imagem_url
    if (arquivo) {
      const url = await uploadImagem()
      if (url) imagemUrl = url
    }

    await supabase.from('produtos').update({
      nome: editando.nome,
      descricao: editando.descricao,
      preco: editando.preco,
      imagem_url: imagemUrl
    }).eq('id', editando.id)

    setEditando(null)
    setArquivo(null)
    setPreview(null)
    buscarProdutos()
    setLoading(false)
  }

  async function deletarProduto(id: string) {
    if (!confirm("Deletar produto?")) return
    await supabase.from('produtos').delete().eq('id', id)
    buscarProdutos()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-black text-white p-4 text-center font-bold text-lg">
        Admin — Charme Chicc
      </div>

      {/* Abas */}
      <div className="flex">
        <button
          onClick={() => setAba('cadastrar')}
          className={`flex-1 py-3 font-bold text-sm ${aba === 'cadastrar' ? 'bg-white border-b-2 border-black' : 'bg-gray-200 text-gray-500'}`}
        >
          Cadastrar
        </button>
        <button
          onClick={() => setAba('gerenciar')}
          className={`flex-1 py-3 font-bold text-sm ${aba === 'gerenciar' ? 'bg-white border-b-2 border-black' : 'bg-gray-200 text-gray-500'}`}
        >
          Gerenciar
        </button>
      </div>

      <div className="p-4 max-w-md mx-auto">

        {/* ABA CADASTRAR */}
        {aba === 'cadastrar' && (
          <div className="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
            {sucesso && (
              <p className="bg-green-100 text-green-700 p-3 rounded-xl text-center">
                Produto cadastrado! ✅
              </p>
            )}
            <input placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} className="border rounded-xl p-3" />
            <input placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="border rounded-xl p-3" />
            <input placeholder="Preço (ex: 45.00)" value={preco} onChange={(e) => setPreco(e.target.value)} className="border rounded-xl p-3" />
            <label className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50">
              {preview ? (
                <Image src={preview} alt="Preview" width={400} height={200} className="rounded-xl object-cover w-full h-48" />
              ) : (
                <span className="text-gray-400">Clique para selecionar imagem</span>
              )}
              <input type="file" accept="image/*" onChange={selecionarImagem} className="hidden" />
            </label>
            <button onClick={cadastrarProduto} disabled={loading} className="bg-black text-white py-3 rounded-xl font-bold disabled:opacity-50">
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
                  // Modo edição
                  <div className="flex flex-col gap-3">
                    <Image src={preview || editando.imagem_url} alt={editando.nome} width={400} height={200} className="rounded-xl object-cover w-full h-40" />
                    <label className="border-2 border-dashed rounded-xl p-2 text-center cursor-pointer text-sm text-gray-400">
                      Trocar imagem
                      <input type="file" accept="image/*" onChange={selecionarImagem} className="hidden" />
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
                  // Modo visualização
                  <div className="flex gap-3 items-center">
                    <Image src={p.imagem_url} alt={p.nome} width={80} height={80} className="rounded-xl object-cover w-20 h-20" />
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
      </div>
    </div>
  )
}