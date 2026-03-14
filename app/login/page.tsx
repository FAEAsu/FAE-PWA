"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("LOGIN RESULT:", data)
    console.log("LOGIN ERROR:", error)

    if (error) {
      setError(error.message)
      return
    }

    const userId = data.user?.id
    console.log("USER ID:", userId)

    if (!userId) {
      setError("Utilisateur introuvable")
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle()

    console.log("PROFILE:", profile)
    console.log("PROFILE ERROR:", profileError)

    if (!profile) {
      setError("Profil introuvable")
      return
    }

    router.push("/dashboard")
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "12px",
          width: "320px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Connexion</h2>

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}