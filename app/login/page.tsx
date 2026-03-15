"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, setResult] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setResult("Test en cours...")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("LOGIN ERROR:", error)
        setResult(`Erreur: ${error.message}`)
        return
      }

      console.log("LOGIN DATA:", data)
      setResult("Login OK")
    } catch (err) {
      console.error("FULL ERROR:", err)
      setResult("Erreur réseau / fetch")
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 340,
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h1 style={{ marginBottom: 20 }}>Connexion test</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid #3f3f46",
          }}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid #3f3f46",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
          }}
        >
          Se connecter
        </button>

        <p style={{ marginTop: 16, color: "#facc15" }}>{result}</p>
      </form>
    </main>
  )
}
