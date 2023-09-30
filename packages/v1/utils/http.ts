export const parseCookie = (cookie: string = "") => {
  if (!cookie) return {}

  const cookies = Object.fromEntries(
    cookie
      .trim()
      .split(";")
      .map((cookie) => cookie.split("="))
      .map(([name, value]) => [
        decodeURIComponent(name.trim()),
        decodeURIComponent(value.trim()),
      ]),
  )

  return cookies
}
