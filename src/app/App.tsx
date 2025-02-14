import { RouterView } from "~/app/RouterView.tsx"
import { AppProviders } from "~/app/providers/AppProviders.tsx"

export function App() {
	return (
		<AppProviders>
			{" "}
			<RouterView />
		</AppProviders>
	)
}
