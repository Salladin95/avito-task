import { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import axios from "~/app/axios.ts"
import { AD } from "~/shared/types"

export const ADS_QUERY_KEY = "ADS"
export const ADS_LIMIT = 5

export async function getAllAds(
	page = 1,
	limit = ADS_LIMIT,
): Promise<{
	items: AD[]
	totalItems: number
	totalPages: number
}> {
	const res = await axios.get("/items", {
		params: {
			page,
			limit,
		},
	})
	return res.data
}

export function useGetAllAds(
	page = 1,
	limit = ADS_LIMIT,
	options?: Omit<
		UseQueryOptions<
			{
				items: AD[]
				totalItems: number
				totalPages: number
			},
			AxiosError
		>,
		"queryFn" | "queryKey"
	>,
) {
	return useQuery({
		queryKey: [ADS_QUERY_KEY, page, limit],
		queryFn: () => getAllAds(page, limit),
		...options,
	})
}
