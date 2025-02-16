import { AxiosError } from "axios"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import axios from "~/app/axios.ts"
import { AD } from "~/shared/types"
import { FullPublishAdFormType } from "~/features/ad-forms/schemas.ts"

export async function createAd(payload: FullPublishAdFormType): Promise<AD> {
	const res = await axios.post<AD>("items", payload)
	return res.data
}

export function useCreateAdMutation(
	options?: Omit<UseMutationOptions<AD, AxiosError, FullPublishAdFormType>, "mutationFn">,
) {
	return useMutation({
		mutationFn: createAd,
		...options,
	})
}
