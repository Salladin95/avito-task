import { useGetAllAds } from "~/shared/api"

export function HomePage() {
	const { data, isPending } = useGetAllAds()

	if (isPending) return "Loading..."
	return (
		<main>
			<h1>Home Page</h1>
			<div>{JSON.stringify(data)}</div>
		</main>
	)
}
