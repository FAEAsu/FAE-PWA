import dns from "node:dns/promises"

export async function GET() {
  const host = "lbuceegfaxgtsipdbclo.supabase.co"
  const rootUrl = `https://${host}`
  const healthUrl = `${rootUrl}/auth/v1/health`

  const result: Record<string, unknown> = {
    host,
    rootUrl,
    healthUrl,
  }

  try {
    const lookup = await dns.lookup(host)
    result.dns = {
      ok: true,
      lookup,
    }
  } catch (error) {
    result.dns = {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "UnknownError",
      code:
        typeof error === "object" && error && "code" in error
          ? (error as { code?: string }).code
          : undefined,
      cause:
        typeof error === "object" && error && "cause" in error
          ? String((error as { cause?: unknown }).cause)
          : undefined,
    }
  }

  try {
    const res = await fetch(rootUrl, {
      method: "GET",
      cache: "no-store",
    })
    const text = await res.text()

    result.rootFetch = {
      ok: true,
      status: res.status,
      body: text,
    }
  } catch (error) {
    result.rootFetch = {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "UnknownError",
      stack: error instanceof Error ? error.stack : undefined,
      cause:
        typeof error === "object" && error && "cause" in error
          ? String((error as { cause?: unknown }).cause)
          : undefined,
      code:
        typeof error === "object" && error && "code" in error
          ? (error as { code?: string }).code
          : undefined,
    }
  }

  try {
    const res = await fetch(healthUrl, {
      method: "GET",
      cache: "no-store",
    })
    const text = await res.text()

    result.healthFetch = {
      ok: true,
      status: res.status,
      body: text,
    }
  } catch (error) {
    result.healthFetch = {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "UnknownError",
      stack: error instanceof Error ? error.stack : undefined,
      cause:
        typeof error === "object" && error && "cause" in error
          ? String((error as { cause?: unknown }).cause)
          : undefined,
      code:
        typeof error === "object" && error && "code" in error
          ? (error as { code?: string }).code
          : undefined,
    }
  }

  return Response.json(result)
}
