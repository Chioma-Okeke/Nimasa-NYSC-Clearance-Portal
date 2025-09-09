import { cookies } from "next/headers"

export const getCookie = async (name: string) => {
    return (await cookies()).get(name)?.value
}

export const getAuthToken = async () => {
    const authToken = await getCookie("authToken");
    return authToken
}