import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios'

export const createAxiosInstance = (
  clientUrl: string,
  headers?: RawAxiosRequestHeaders
): AxiosInstance => {
  const isServer = typeof window === 'undefined'
  const isProd = process.env.NODE_ENV === 'production'

  // Determine base domain
  const productionDomain = process.env.NEXT_PUBLIC_PROD_DOMAIN
  const localDomain = 'http://localhost:3000'

  // const baseURL = isServer
  //   ? `${isProd ? productionDomain : localDomain}/api${clientUrl}`
  //   : `/api${clientUrl}`
  const baseURL = 'https://nimasa-nysc-clearance-app1.onrender.com/api' + clientUrl

  return axios.create({
    timeout: 60000,
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}