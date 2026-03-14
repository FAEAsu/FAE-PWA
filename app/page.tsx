export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">FAE Team App</h1>
        <p className="text-zinc-300 mb-6">
          Application interne pour gérer les strats, le planning, les résultats et le chat.
        </p>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="font-semibold">Calendrier</h2>
            <p className="text-sm text-zinc-400">Scrims, matchs, reviews, training.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="font-semibold">Strats</h2>
            <p className="text-sm text-zinc-400">Par map, side, agent, image et clip.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="font-semibold">Chat équipe</h2>
            <p className="text-sm text-zinc-400">Temps réel pour chaque roster.</p>
          </div>
        </div>
      </div>
    </main>
  )
}