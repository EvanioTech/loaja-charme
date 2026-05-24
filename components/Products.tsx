'use client'

import Image from "next/image"
import { useState } from "react"

const produtos = [
  { id: 1, src: "/produtos/i1.webp", nome: "Vestido", preco: "45,00", descricao: "Vestido floral lindo" },
  { id: 2, src: "/produtos/i2.webp", nome: "Vestido", preco: "45,00", descricao: "Vestido floral lindo" },
  { id: 3, src: "/produtos/i3.webp", nome: "Vestido", preco: "45,00", descricao: "Vestido floral lindo" },
  { id: 4, src: "/produtos/i4.webp", nome: "Vestido", preco: "45,00", descricao: "Vestido floral lindo" },
  { id: 5, src: "/produtos/i5.webp", nome: "Vestido", preco: "45,00", descricao: "Vestido floral lindo" },
  { id: 6, src: "/produtos/i6.webp", nome: "Vestido", preco: "45,00", descricao: "Vestido floral lindo" },
]

type Produto = typeof produtos[0]

export function Products() {
  const [selecionado, setSelecionado] = useState<Produto | null>(null)

  function callWpp() {
    const mensagem = `Olá! Tenho interesse em: ${selecionado?.nome} - R$ ${selecionado?.preco}`
    const url = `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {produtos.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-2xl p-4 h-100 relative cursor-pointer"
            onClick={() => setSelecionado(p)}
          >
            <Image
              src={p.src}
              alt={p.nome}
              width={400}
              height={400}
              className="object-cover rounded-2xl w-full h-full"
            />
            <p className="absolute bottom-6 left-6 bg-black/50 text-white font-bold px-2 py-1 rounded-lg">{p.nome}</p>
            <p className="absolute bottom-6 right-6 bg-black/50 text-white px-2 py-1 rounded-lg font-bold">R$ {p.preco}</p>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selecionado && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelecionado(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selecionado.src}
              alt={selecionado.nome}
              width={400}
              height={400}
              className="object-cover rounded-2xl w-full"
            />
            <h2 className="text-xl font-bold mt-4">{selecionado.nome}</h2>
            <p className="text-gray-500 mt-1">{selecionado.descricao}</p>
            <p className="text-lg font-bold mt-2">R$ {selecionado.preco}</p>
            <button
              onClick={() => callWpp()}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded-xl"
            >
                Chamar no WhatsApp
            </button>
            <button
              onClick={() => setSelecionado(null)}
              className="mt-4 w-full bg-black text-white py-2 rounded-xl"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}