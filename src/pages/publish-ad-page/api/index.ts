import { AxiosError } from "axios"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import axios from "~/app/axios"
import { AD } from "~/shared/types"

type CreateAdPayload = Omit<AD, "id">

export async function createAd(payload: CreateAdPayload): Promise<AD> {
	const res = await axios.post<AD>("items", payload)
	return res.data
}

export function useCreateAdMutation(options?: Omit<UseMutationOptions<AD, AxiosError, CreateAdPayload>, "mutationFn">) {
	return useMutation({
		mutationFn: createAd,
		...options,
	})
}
