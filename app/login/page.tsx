"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const health = await fetch(
        "https://lbuceegfaxgtsipdbclo.supabase.co/auth/v1/health"
      )
      const healthText = await health.text()
      console.log("HEALTH STATUS =", health.status)
      console.log("HEALTH BODY =", healthText)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("LOGIN DATA:", data)
      console.log("LOGIN ERROR:", error)

      if (error) {
        setError(error.message)
        return
      }

      alert("Login OK")
    } catch (err) {
      console.error("FULL ERROR:", err)
      setError("Failed to fetch")
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
          width: 320,
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h1 style={{ marginBottom: 20 }}>Connexion à l'app FAE</h1>

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

        {error && (
          <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
        )}

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
      </form>
    </main>
  )
}
