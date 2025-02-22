import { apiClient } from "@/lib/api"

export const user = async ( id: string ) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
}

export const users = async () => {
    const response = await apiClient.get(`/users`);
    return response.data;
}