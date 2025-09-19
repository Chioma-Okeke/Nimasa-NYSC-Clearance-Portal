import axios from "axios";

export async function refreshAccessRefreshTokens(
  refreshToken: string
): Promise<{ access_token: string, refresh_token: string }> {
  const client = axios.create({
    timeout: 120000,
    baseURL: `https://nimasa-nysc-clearance-app1.onrender.com/api`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
  })
  const resp = await client.post<{
    data: { access_token: string; refresh_token: string }
  }>('/unified-auth/refresh')
  return resp.data.data
}