import { PropsWithChildren } from "react"

import { Provider } from "~/components/ui/provider"

export function AppProviders({ children }: PropsWithChildren) {
	return <Provider>{children}</Provider>
}
