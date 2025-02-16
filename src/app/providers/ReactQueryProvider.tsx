import { PropsWithChildren } from "react"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function QueryProvider(props: PropsWithChildren) {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			{/*<ReactQueryDevtools initialIsOpen={false} />*/}
		</QueryClientProvider>
	)
}
