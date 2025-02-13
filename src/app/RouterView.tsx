import { BrowserRouter, Route, Routes } from "react-router-dom"

import { MainPageLayout } from "~/widgets"
import { E404, HomePage, PublishAdPage } from "~/pages"
import { PublishAdFormProvider } from "~/pages/publish-ad-page/publishAdFormContext.tsx"

export function RouterView() {
	return (
		<BrowserRouter basename={"/avito-task/"}>
			<Routes>
				<Route path="/" element={<MainPageLayout />}>
					<Route index element={<HomePage />} />
					<Route
						path={"/form"}
						element={
							<PublishAdFormProvider>
								<PublishAdPage />
							</PublishAdFormProvider>
						}
					/>
				</Route>
				<Route path={"*"} element={<E404 />} />
			</Routes>
		</BrowserRouter>
	)
}
