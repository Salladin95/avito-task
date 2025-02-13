import { RouterView } from "~/app/RouterView"
import { AppProviders } from "~/app/providers/AppProviders"

export function App() {
	return (
		<AppProviders>
			{" "}
			<RouterView />
		</AppProviders>
	)
}
