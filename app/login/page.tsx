"use client"

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, setResult] = useState("")

  const supabaseUrl = "https://lbuceegfaxgtsipdbclo.supabase.co"
  const supabaseKey = "sb_publishable_v5W0Bu23eM_gMNfw70YXCA_Mtu3sqDU"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setResult("Test en cours...")

    try {
      const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const rawText = await res.text()

      console.log("STATUS =", res.status)
      console.log("RAW RESPONSE =", rawText)

      setResult(`STATUS: ${res.status}\n\nRAW:\n${rawText}`)
    } catch (err) {
      console.error("FULL ERROR =", err)
      setResult(
        `ERREUR FETCH:\n${
          err instanceof Error ? err.message : String(err)
        }`
      )
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
        padding: 24,
      }}
    >
      <div style={{ display: "grid", gap: 20, width: "100%", maxWidth: 800 }}>
        <form
          onSubmit={handleLogin}
          style={{
            width: 340,
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 16,
            padding: 24,
            margin: "0 auto",
          }}
        >
          <h1 style={{ marginBottom: 20 }}>Connexion test2</h1>

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
              background: "#09090b",
              color: "white",
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
              background: "#09090b",
              color: "white",
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
            Tester le login
          </button>
        </form>

        <pre
          style={{
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: 16,
            padding: 20,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            margin: 0,
          }}
        >
          {result || "Aucun test lancé."}
        </pre>
      </div>
    </main>
  )
}
