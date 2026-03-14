"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabase"
import { usePathname, useRouter } from "next/navigation"

type Profile = {
  username: string | null
  avatar_url: string | null
}

export default function Header() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setProfile(null)
          return
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", user.id)
          .maybeSingle()

        if (error) {
          console.error("Erreur profil:", error)
          return
        }

        setProfile(data ?? null)
      } catch (err) {
        console.error("Erreur header:", err)
      }
    }

    loadProfile()
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return

      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (pathname === "/login") {
    return null
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #27272a",
        background: "#09090b",
        color: "white",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: 700 }}>FAE Team App</div>

      <div
        ref={menuRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "14px", color: "#d4d4d8" }}>
          {profile?.username || "Utilisateur"}
        </span>

        <img
          src={profile?.avatar_url || "/default-avatar.png"}
          alt="Avatar"
          width={40}
          height={40}
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "9999px",
            objectFit: "cover",
            border: "1px solid #3f3f46",
            display: "block",
            cursor: "pointer",
          }}
        />

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "52px",
              right: 0,
              width: "180px",
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              zIndex: 50,
            }}
          >
            <button
              onClick={() => {
                setMenuOpen(false)
                router.push("/profile")
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 14px",
                background: "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Edit profile
            </button>

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 14px",
                background: "transparent",
                color: "#f87171",
                border: "none",
                borderTop: "1px solid #27272a",
                cursor: "pointer",
              }}
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  )
}