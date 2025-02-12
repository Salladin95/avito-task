import { BrowserRouter, Route, Routes } from "react-router-dom"

import { E404, HomePage } from "~/pages"
import { MainPageLayout } from "~/widgets"

export function RouterView() {
	return (
		<BrowserRouter basename={"/avito-task/"}>
			<Routes>
				<Route path="/" element={<MainPageLayout />}>
					<Route index element={<HomePage />} />
				</Route>
				<Route path={"*"} element={<E404 />} />
			</Routes>
		</BrowserRouter>
	)
}
