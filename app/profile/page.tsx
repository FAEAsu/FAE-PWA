"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setError("Utilisateur non connecté.")
          setLoading(false)
          return
        }

        setUserId(user.id)

        const { data, error } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", user.id)
          .maybeSingle()

        if (error) {
          setError("Erreur lors du chargement du profil.")
          setLoading(false)
          return
        }

        if (data) {
          setUsername(data.username || "")
          setAvatarUrl(data.avatar_url || "")
        }

        setLoading(false)
      } catch {
        setError("Erreur inattendue.")
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!userId) {
      setError("Utilisateur introuvable.")
      return
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username: username.trim(),
        avatar_url: avatarUrl.trim(),
      })
      .eq("id", userId)

    if (error) {
      setError("Impossible de sauvegarder le profil.")
      console.error(error)
      return
    }

    setMessage("Profil mis à jour avec succès.")
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "calc(100vh - 73px)",
          background: "#09090b",
          color: "white",
          padding: "32px",
        }}
      >
        Chargement...
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 73px)",
        background: "#09090b",
        color: "white",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "20px" }}>
          Edit profile
        </h1>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#d4d4d8",
              }}
            >
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #3f3f46",
                background: "#09090b",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#d4d4d8",
              }}
            >
              Avatar URL
            </label>

            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #3f3f46",
                background: "#09090b",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "10px", color: "#d4d4d8" }}>Preview</p>

            <img
              src={avatarUrl || "/default-avatar.png"}
              alt="Preview avatar"
              width={84}
              height={84}
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "9999px",
                objectFit: "cover",
                border: "1px solid #3f3f46",
                display: "block",
              }}
            />
          </div>

          {message && (
            <p style={{ color: "#4ade80", marginBottom: "12px" }}>{message}</p>
          )}

          {error && (
            <p style={{ color: "#f87171", marginBottom: "12px" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              background: "white",
              color: "black",
              border: "none",
              borderRadius: "10px",
              padding: "12px 16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sauvegarder
          </button>
        </form>
      </div>
    </main>
  )
}