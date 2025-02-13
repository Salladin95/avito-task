import { useForm } from "react-hook-form"
import { PropsWithChildren } from "react"

export function FormProvider({ children }: PropsWithChildren) {
	const methods = useForm()

	return <FormProvider {...methods}>{children}</FormProvider>
}
