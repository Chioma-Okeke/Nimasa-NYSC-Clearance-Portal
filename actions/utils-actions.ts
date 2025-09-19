import { cookies } from "next/headers"

export type TCookieOpts = {
  expires?: number | Date
  domain?: string
  path?: string
  secure?: boolean
  sameSite?: boolean | 'none' | 'lax' | 'strict'
  partitioned?: boolean
  httpOnly?: boolean
  maxAge?: number
  priority?: 'low' | 'medium' | 'high'
}

export const getCookie = async (name: string) => {
    return (await cookies()).get(name)?.value
}

export const getAccessRefreshTokens = async () => {
    const refreshToken = await getCookie("refreshToken")
    return refreshToken ? { refreshToken } : { refreshToken: null }
}

export const setCookie = async (
  name: string,
  value: string,
  cookieOpts?: TCookieOpts
) => {
  const cookieStore = await cookies()
  cookieStore.set(name, value, cookieOpts)
}

// export const setAccessRefreshTokens = async (
//   accessToken: string,
//   refreshToken: string
// ) => {
//   await Promise.all([
//     setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, ACCESS_TOKEN_COOKIE_OPTS),
//     setCookie(
//       COOKIE_NAMES.REFRESH_TOKEN,
//       refreshToken,
//       REFRESH_TOKEN_COOKIE_OPTS
//     ),
//     setCookie(
//       COOKIE_NAMES.ACCESS_TOKEN_EXPIRATION,
//       (new Date().getTime() + 3 * 86400 * 1000).toString(),
//       ACCESS_TOKEN_EXPIRATION_COOKIE_OPTS
//     ),
//   ])
// }
