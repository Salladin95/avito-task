import { Link } from "react-router-dom"
import { LuSearch } from "react-icons/lu"
import { ChangeEvent, useMemo, useState } from "react"
import { Box, Button, Text, Image, Container, Heading, HStack, Spinner, VStack, Input } from "@chakra-ui/react"

import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "~/components/ui/pagination"

import { AD } from "~/shared/types"
import { useDebounce } from "~/shared/hooks"
import { ADS_LIMIT, useGetAllAds } from "~/shared/api"
import { InputGroup } from "~/components/ui/input-group"

function filterAds(ads: undefined | AD[], filterByName: string) {
	if (!filterByName) return ads
	return ads?.filter((ad) => ad.name.toLowerCase().includes(filterByName.toLowerCase()))
}

export function HomePage() {
	const [page, setPage] = useState(1)
	const { data, isPending } = useGetAllAds(page)
	const [searchByName, setSearchByName] = useState("")
	const debouncedSearchByName = useDebounce(searchByName)

	const ads = useMemo(() => filterAds(data?.items, debouncedSearchByName), [data, debouncedSearchByName])

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		setSearchByName(e.target.value)
	}

	// const handleChangeDebounced = useCallback(debounce(handleSearchChange), [])

	if (isPending) {
		return (
			<Container minHeight="90vh" as="main" display="flex" justifyContent="center" alignItems="center">
				<Spinner size="lg" />
			</Container>
		)
	}

	return (
		<Container mx={"auto"} pb={"2rem"} minHeight="90vh" as={"main"}>
			<Heading as={"h1"} mb={"2rem"} size="2xl">
				Список объявлений
			</Heading>
			<Button mb={"2rem"} ml={"auto"} variant={"solid"}>
				<Link to={"/form"}>Разместить объявление</Link>
			</Button>
			<InputGroup w={"100%"} mb={"2rem"} startElement={<LuSearch />}>
				<Input value={searchByName} onChange={handleSearchChange} placeholder="Найти объявление по названию" />
			</InputGroup>
			<Box
				mb="2rem"
				display="grid"
				gap="1rem"
				gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "1fr", xl: "repeat(2, 1fr)" }}
			>
				{ads?.map((ad) => (
					<Box
						key={ad.id}
						mb="4"
						p="4"
						borderWidth="1px"
						borderRadius="lg"
						boxShadow="md"
						display={"flex"}
						alignItems={"center"}
						gap={"1.5rem"}
						flexDirection={{ base: "column", md: "row" }}
					>
						<Image
							src={ad.image || "https://loremflickr.com/g/320/240/paris"}
							alt={ad.name}
							width={"150px"}
							borderRadius="md"
							mb="4"
						/>
						<VStack align="start">
							<Heading as="h2" size="md">
								<Text as={"span"} fontWeight="medium">
									Название:
								</Text>{" "}
								{ad.name}
							</Heading>
							<Text>
								<Text as={"span"} fontWeight="medium">
									Локация:
								</Text>{" "}
								{ad.location}
							</Text>
							<Text gap={"4px"} display={"flex"} mb="4">
								<Text as={"span"} fontWeight="medium">
									Категория:
								</Text>
								<span>{ad.type}</span>
							</Text>
						</VStack>
						<Button ml={{ base: "0", md: "auto" }} variant={"solid"}>
							<Link to={`/item/${ad.id}`}>Открыть</Link>
						</Button>
					</Box>
				))}
			</Box>
			<PaginationRoot
				variant={"subtle"}
				count={data?.totalItems ?? 0}
				pageSize={ADS_LIMIT}
				page={page}
				onPageChange={(e) => setPage(e.page)}
			>
				<HStack overflowX={"auto"} justify={{ base: "start", sm: "center" }}>
					<PaginationPrevTrigger />
					<PaginationItems />
					<PaginationNextTrigger />
				</HStack>
			</PaginationRoot>
		</Container>
	)
}
