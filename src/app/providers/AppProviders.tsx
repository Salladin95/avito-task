import { PropsWithChildren } from "react"

import { Provider } from "~/components/ui/provider"
import { QueryProvider } from "~/app/providers/ReactQueryProvider"
import { AuthProvider } from "~/shared/context/auth.tsx"

export function AppProviders({ children }: PropsWithChildren) {
	return (
		<AuthProvider>
			<QueryProvider>
				<Provider>{children}</Provider>
			</QueryProvider>
		</AuthProvider>
	)
}
