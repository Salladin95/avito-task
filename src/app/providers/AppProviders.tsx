import { PropsWithChildren } from "react"
import { Provider } from "~/components/ui/provider"
import { QueryProvider } from "~/app/providers/ReactQueryProvider"

export function AppProviders({ children }: PropsWithChildren) {
	return (
		<QueryProvider>
			<Provider>{children}</Provider>
		</QueryProvider>
	)
}
