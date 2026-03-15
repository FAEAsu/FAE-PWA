"use client"

import { useState } from "react"

export default function LoginPage() {
  const [result, setResult] = useState("")

  const testFetch = async () => {
    try {
      const res = await fetch("https://lbuceegfaxgtsipdbclo.supabase.co/auth/v1/health", {
        method: "GET",
      })

      const text = await res.text()
      setResult(`STATUS: ${res.status}\n\n${text}`)
    } catch (err) {
      setResult(
        `ERREUR FETCH:\n${err instanceof Error ? err.message : String(err)}`
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
      <div
        style={{
          width: 500,
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h1>Test fetch Supabase</h1>

        <button
          onClick={testFetch}
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
          }}
        >
          Tester /auth/v1/health
        </button>

        <pre
          style={{
            marginTop: 20,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {result || "Aucun test lancé"}
        </pre>
      </div>
    </main>
  )
}
