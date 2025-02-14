import { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import axios from "~/app/axios.ts"
import { AD } from "~/shared/types"

export async function getAllAds(): Promise<AD[]> {
	const res = await axios.get("items")
	return res.data
}

export function useGetAllAds(options?: Omit<UseQueryOptions<AD[], AxiosError>, "queryFn" | "queryKey">) {
	return useQuery({
		queryKey: ["ADS"],
		queryFn: getAllAds,
		...options,
	})
}
