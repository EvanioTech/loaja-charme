'use client'
import { WhatsappLogo } from "@phosphor-icons/react"
import React from "react"


export function WppButton() {
    const mensagem = "Olá, gostaria de saber mais sobre os produtos da Charme Chicc!"
    const url = `https://wa.me/5585997264124?text=${encodeURIComponent(mensagem)}`

    return (
      <a  
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors"
      >
        <WhatsappLogo size={28} weight="fill" />
    </a>
    )
}
      
