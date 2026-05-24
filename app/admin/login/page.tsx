'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function fazerLogin() {
    setLoading(true)
    setErro("")
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setErro("Email ou senha incorretos")
    } else {
      router.push('/admin')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 shadow max-w-sm w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        {erro && <p className="bg-red-100 text-red-600 p-3 rounded-xl text-center">{erro}</p>}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-xl p-3"
        />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border rounded-xl p-3"
        />
        <button
          onClick={fazerLogin}
          disabled={loading}
          className="bg-black text-white py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  )
}