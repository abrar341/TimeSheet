export function buildQueryString(filters: Record<string, unknown>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === "") continue
    params.set(key, String(value))
  }

  const str = params.toString()
  return str.length ? str : ""
}

