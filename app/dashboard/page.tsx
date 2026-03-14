export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 73px)",
        background: "#09090b",
        color: "white",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, marginBottom: "24px" }}>
          Dashboard
        </h1>

        <div
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "8px" }}>Prochain match</h2>
          <p style={{ margin: 0, color: "#a1a1aa" }}>
            À connecter avec la table events.
          </p>
        </div>

        <div
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "8px" }}>Derniers résultats</h2>
          <p style={{ margin: 0, color: "#a1a1aa" }}>
            À connecter avec la table matches.
          </p>
        </div>

        <div
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "8px" }}>Accès rapide</h2>
          <p style={{ margin: 0, color: "#a1a1aa" }}>
            Chat, calendrier, strats.
          </p>
        </div>
      </div>
    </main>
  )
}