import { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import axios from "~/app/axios.ts"
import { AD } from "~/shared/types"

export const ADS_QUERY_KEY = "ADS"
export const ADS_LIMIT = 5

export async function getAllAds(): Promise<AD[]> {
	const res = await axios.get<AD[]>("/items")
	return res.data
}

export function useGetAllAds(options?: Omit<UseQueryOptions<AD[], AxiosError>, "queryFn" | "queryKey">) {
	return useQuery({
		queryKey: [ADS_QUERY_KEY],
		queryFn: getAllAds,
		...options,
	})
}

export async function getAdById(id: string | number): Promise<AD> {
	const res = await axios.get<AD>(`/items/${id}`)
	return res.data
}

export function useGetAdById(
	id: string | number,
	options?: Omit<UseQueryOptions<AD, AxiosError>, "queryFn" | "queryKey">,
) {
	return useQuery({
		queryKey: [id],
		queryFn: () => getAdById(id),
		...options,
	})
}
