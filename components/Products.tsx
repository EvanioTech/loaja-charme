'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

type Produto = {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem_url: string
}

export function Products() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [selecionado, setSelecionado] = useState<Produto | null>(null)

  useEffect(() => {
    async function buscarProdutos() {
      const { data } = await supabase.from('produtos').select('*')
      if (data) setProdutos(data)
    }
    buscarProdutos()
  }, [])

  function abrirWhatsapp(produto: Produto) {
    const mensagem = `Olá! Tenho interesse em: ${produto.nome} - R$ ${produto.preco}`
    const url = `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-4">
        {produtos.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-2xl p-4 aspect-square relative cursor-pointer"
            onClick={() => setSelecionado(p)}
          >
            <Image
              src={p.imagem_url}
              alt={p.nome}
              width={400}
              height={400}
              className="object-cover rounded-2xl w-full h-full"
            />
            <div className="flex flex-col justify-between mt-2 items-center md:flex-row md:justify-between  ">
            <p className=" bottom-6 left-6 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-lg md:text-sm">{p.nome}</p>
            <p className=" bottom-6 right-6 bg-black/50 text-white text-xs px-2 py-1 rounded-lg font-bold mt-2 md:text-sm">R$ {p.preco}</p>
            </div>
          </article>
        ))}
      </div>

      {selecionado && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center  p-4"
          onClick={() => setSelecionado(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selecionado.imagem_url}
              alt={selecionado.nome}
              width={400}
              height={400}
              className="object-cover rounded-2xl w-full"
            />
            <h2 className="text-xl font-bold mt-4">{selecionado.nome}</h2>
            <p className="text-gray-500 mt-1">{selecionado.descricao}</p>
            <p className="text-lg font-bold mt-2">R$ {selecionado.preco}</p>
            <button
              onClick={() => abrirWhatsapp(selecionado)}
              className="mt-2 w-full bg-green-500 text-white py-2 rounded-xl"
            >
              Chamar no WhatsApp
            </button>
            <button
              onClick={() => setSelecionado(null)}
              className="mt-2 w-full bg-black text-white py-2 rounded-xl"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}