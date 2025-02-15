import { Link } from "react-router-dom"
import { LuSearch } from "react-icons/lu"
import { ChangeEvent, useMemo, useState } from "react"
import { Box, Button, Text, Image, Container, Heading, HStack, Spinner, VStack, Input } from "@chakra-ui/react"

import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "~/components/ui/pagination.tsx"
import { InputGroup } from "~/components/ui/input-group"

import { Select } from "~/shared/ui"
import { useDebounce } from "~/shared/hooks"
import { useGetAllAds } from "~/shared/api"
import { processAds } from "~/pages/home-page/lib"
import {
	AD_CATEGORY_OPTIONS,
	AD_TYPE,
	CAR_BRAND_OPTIONS,
	REAL_ESTATE_TYPE_OPTIONS,
	SERVICE_TYPE_OPTIONS,
} from "~/shared/constants"

export function HomePage() {
	const [page, setPage] = useState(1)
	const { data, isPending } = useGetAllAds()
	const [searchByName, setSearchByName] = useState("")
	const debouncedSearchByName = useDebounce(searchByName)

	const [adTypeFilter, setAdTypeFilter] = useState<string>("")
	const [realEstateTypeFilter, setRealEstateTypeFilter] = useState<string>("")
	const [carBrandFilter, setCarBrandFilter] = useState<string>("")
	const [serviceTypeFilter, setServiceTypeFilter] = useState<string>("")

	const processedAds = useMemo(
		() =>
			processAds({
				ads: data,
				filterByName: debouncedSearchByName,
				page,
				type: adTypeFilter,
				carBrand: carBrandFilter,
				serviceType: serviceTypeFilter,
				propertyType: realEstateTypeFilter,
			}),
		[
			data,
			debouncedSearchByName,
			page,
			adTypeFilter,
			adTypeFilter,
			carBrandFilter,
			serviceTypeFilter,
			realEstateTypeFilter,
		],
	)

	if (isPending) {
		return (
			<Container minHeight="90vh" as="main" display="flex" justifyContent="center" alignItems="center">
				<Spinner size="lg" />
			</Container>
		)
	}

	if (!processedAds) return null

	const { ads, totalAds, adsPerPage } = processedAds

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		setSearchByName(e.target.value)
	}

	function handleAdTypeFilterChange(value: string) {
		setAdTypeFilter(value)
		setRealEstateTypeFilter("")
		setCarBrandFilter("")
		setServiceTypeFilter("")
	}

	return (
		<Container mx={"auto"} pb={"2rem"} minHeight="90vh" as={"main"}>
			<Heading as={"h1"} mb={"2rem"} size="2xl">
				Список объявлений
			</Heading>
			<Button mb={"2rem"} ml={"auto"} variant={"solid"}>
				<Link to={"/form"}>Разместить объявление</Link>
			</Button>
			<Box mb={"2rem"} display={"flex"} gap={"1.5rem"}>
				<Select
					value={[adTypeFilter]}
					onValueChange={(e) => handleAdTypeFilterChange(e.value[0])}
					options={[{ value: "", label: "Выберите категорию" }, ...AD_CATEGORY_OPTIONS]}
					placeholder={"Выберите категорию"}
					label={"Фильтровать по категориям"}
				/>
				{(() => {
					switch (adTypeFilter) {
						case AD_TYPE.REAL_ESTATE:
							return (
								<Select
									value={[realEstateTypeFilter]}
									onValueChange={(e) => setRealEstateTypeFilter(e.value[0])}
									options={[
										{
											value: "",
											label: "Выберите тип недвижимости",
										},
										...REAL_ESTATE_TYPE_OPTIONS,
									]}
									placeholder={"Выберите тип недвижимости"}
									label={"Фильтровать по типу недвижимости:"}
								/>
							)
						case AD_TYPE.AUTO:
							return (
								<Select
									value={[carBrandFilter]}
									onValueChange={(e) => setCarBrandFilter(e.value[0])}
									options={[
										{
											value: "",
											label: "Выберите марку автомобиля",
										},
										...CAR_BRAND_OPTIONS,
									]}
									placeholder={"Выберите марку автомобиля"}
									label={"Фильтровать по марке автомобиля:"}
								/>
							)
						case AD_TYPE.SERVICES:
							return (
								<Select
									value={[serviceTypeFilter]}
									onValueChange={(e) => setServiceTypeFilter(e.value[0])}
									options={[
										{
											value: "",
											label: "Выберите тип услуг",
										},
										...SERVICE_TYPE_OPTIONS,
									]}
									placeholder={"Выберите тип услуг"}
									label={"Фильтровать по типу услуг:"}
								/>
							)
						default:
							return null
					}
				})()}
			</Box>
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
				count={totalAds}
				pageSize={adsPerPage}
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
