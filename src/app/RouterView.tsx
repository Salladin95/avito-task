import { BrowserRouter, Route, Routes } from "react-router-dom"

import { MainPageLayout } from "~/widgets"
import { E404, SignInPage, HomePage, PublishAdPage, EditAdPage, AdPage } from "~/pages"

export function RouterView() {
	return (
		<BrowserRouter basename={"/avito-task/"}>
			<Routes>
				<Route path="/" element={<MainPageLayout />}>
					<Route index element={<HomePage />} />
					<Route path={"/sign-in"} element={<SignInPage />} />
					<Route path={"/sign-up"} element={<SignInPage />} />
					<Route path={"/item/:id"} element={<AdPage />} />
					<Route path={"/form"} element={<PublishAdPage />} />
					<Route path={"/form/:id"} element={<EditAdPage />} />
				</Route>
				<Route path={"*"} element={<E404 />} />
			</Routes>
		</BrowserRouter>
	)
}
