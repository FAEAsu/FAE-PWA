"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type DebugInfo = {
  step: string
  ok: boolean
  details: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [debugLogs, setDebugLogs] = useState<DebugInfo[]>([])
  const [loading, setLoading] = useState(false)

  const addLog = (step: string, ok: boolean, details: unknown) => {
    const text =
      typeof details === "string"
        ? details
        : JSON.stringify(details, null, 2)

    setDebugLogs((prev) => [...prev, { step, ok, details: text }])
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setDebugLogs([])
    setLoading(true)

    try {
      const hardcodedUrl = "https://lbuceegfaxgtsipdbclo.supabase.co"

      addLog("1. URL hardcodée", true, hardcodedUrl)

      try {
        const healthRes = await fetch(`${hardcodedUrl}/auth/v1/health`)
        const healthText = await healthRes.text()

        addLog("2. Test /auth/v1/health", healthRes.ok, {
          status: healthRes.status,
          body: healthText,
        })
      } catch (err) {
        addLog("2. Test /auth/v1/health", false, {
          message: err instanceof Error ? err.message : String(err),
          name: err instanceof Error ? err.name : "UnknownError",
        })
      }

      let loginResult
      try {
        loginResult = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        addLog("3. signInWithPassword retour brut", true, {
          data: loginResult.data,
          error: loginResult.error,
        })
      } catch (err) {
        addLog("3. signInWithPassword throw", false, {
          message: err instanceof Error ? err.message : String(err),
          name: err instanceof Error ? err.name : "UnknownError",
          stack: err instanceof Error ? err.stack : "no-stack",
        })
        setError("Erreur pendant signInWithPassword")
        setLoading(false)
        return
      }

      const { data, error } = loginResult

      if (error) {
        addLog("4. Erreur Supabase auth", false, error)
        setError(error.message)
        setLoading(false)
        return
      }

      const userId = data.user?.id

      addLog("5. User ID", !!userId, userId || "Aucun user.id")

      if (!userId) {
        setError("Utilisateur introuvable")
        setLoading(false)
        return
      }

      try {
        const profileQuery = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle()

        addLog("6. Lecture profil", !profileQuery.error, profileQuery)

        if (profileQuery.error) {
          setError("Erreur lecture profil")
          setLoading(false)
          return
        }

        if (!profileQuery.data) {
          setError("Profil introuvable")
          setLoading(false)
          return
        }
      } catch (err) {
        addLog("6. Lecture profil throw", false, {
          message: err instanceof Error ? err.message : String(err),
          name: err instanceof Error ? err.name : "UnknownError",
          stack: err instanceof Error ? err.stack : "no-stack",
        })
        setError("Erreur lecture profil")
        setLoading(false)
        return
      }

      addLog("7. Fin login", true, "Login complet OK")
      alert("Login OK")
    } catch (err) {
      addLog("Erreur globale catch", false, {
        message: err instanceof Error ? err.message : String(err),
        name: err instanceof Error ? err.name : "UnknownError",
        stack: err instanceof Error ? err.stack : "no-stack",
      })
      setError("Erreur globale")
    }

    setLoading(false)
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
      <div style={{ display: "grid", gap: 20, width: "100%", maxWidth: 900 }}>
        <form
          onSubmit={handleLogin}
          style={{
            width: 320,
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 16,
            padding: 24,
            margin: "0 auto",
          }}
        >
          <h1 style={{ marginBottom: 20 }}>Connexion à l'app V3</h1>

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

          {error && (
            <p style={{ color: "#ef4444", marginBottom: 12 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading ? "Test en cours..." : "Se connecter"}
          </button>
        </form>

        <section
          style={{
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: 16,
            padding: 20,
            maxWidth: 900,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Diagnostic</h2>

          {debugLogs.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>
              Aucun test lancé pour le moment.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {debugLogs.map((log, index) => (
                <div
                  key={`${log.step}-${index}`}
                  style={{
                    background: "#0b1220",
                    border: `1px solid ${log.ok ? "#166534" : "#991b1b"}`,
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: log.ok ? "#4ade80" : "#f87171",
                      marginBottom: 8,
                    }}
                  >
                    {log.ok ? "OK" : "ERREUR"} — {log.step}
                  </div>

                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      margin: 0,
                      color: "#e5e7eb",
                      fontSize: 13,
                    }}
                  >
                    {log.details}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
