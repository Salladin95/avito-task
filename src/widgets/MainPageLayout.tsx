import { Outlet } from "react-router-dom"

export function MainPageLayout() {
	return (
		<>
			<header>HEADER</header>
			<Outlet />
		</>
	)
}
