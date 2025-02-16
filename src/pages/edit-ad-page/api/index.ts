import { AxiosError } from "axios"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import axios from "~/app/axios"
import { AD } from "~/shared/types"

type EditAdPayload = AD

export async function editAd(payload: EditAdPayload): Promise<AD> {
	const res = await axios.put<AD>(`items/${payload.id}`, payload)
	return res.data
}

export function useEditAdMutation(options?: Omit<UseMutationOptions<AD, AxiosError, EditAdPayload>, "mutationFn">) {
	return useMutation({
		mutationFn: editAd,
		...options,
	})
}
