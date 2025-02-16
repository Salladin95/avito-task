import { PropsWithChildren } from "react"
import { createClient } from "@supabase/supabase-js"

import { APP_CONFIG } from "~/app/appConfig"
import { Provider } from "~/components/ui/provider"
import { QueryProvider } from "~/app/providers/ReactQueryProvider"
import { SupabaseProvider } from "~/app/providers/SupabaseProvider"

const supabase = createClient(APP_CONFIG.supabaseUrl, APP_CONFIG.supabaseKey)

export function AppProviders({ children }: PropsWithChildren) {
	return (
		<SupabaseProvider supabase={supabase}>
			<QueryProvider>
				<Provider>{children}</Provider>
			</QueryProvider>
		</SupabaseProvider>
	)
}
