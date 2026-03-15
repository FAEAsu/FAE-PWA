export async function GET() {
  const supabaseUrl = "https://lbuceegfaxgtsipdbclo.supabase.co"

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: "GET",
      cache: "no-store",
    })

    const text = await res.text()

    return Response.json({
      ok: res.ok,
      status: res.status,
      body: text,
      testedUrl: `${supabaseUrl}/auth/v1/health`,
    })
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        testedUrl: `${supabaseUrl}/auth/v1/health`,
      },
      { status: 500 }
    )
  }
}