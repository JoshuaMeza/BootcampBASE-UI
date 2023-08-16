import { IconCoin } from "@tabler/icons-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../hooks";
import { Currency as ICurrency } from "../interfaces";
import { Currency, DropdownOrderBy, Header, SearchInput } from "../components";
import { useGetCurrencies } from "../api";

export const Currencies = () => {
	const [currencies, setCurrencies] = useState<ICurrency[]>([]);
	const [currentOrderOption, setCurrentOrderOption] = useState("");
	const [search, setSearch] = useState("");
	const debouncedValue = useDebounce<string>(search, 500);

	const orderOptions = [
		{ label: "Nombre", value: "name" },
		{ label: "Simbolo", value: "symbol" },
		{ label: "Valor de cambio", value: "value" },
	];

	const { mutate } = useGetCurrencies();

	useEffect(() => {
		handleSearch(search);
	}, [debouncedValue]);

	const orderCurrencies = (
		currencies: ICurrency[],
		currentOrderOption: string,
	): ICurrency[] => {
		const key = currentOrderOption as keyof ICurrency;
		const copyCurrencies = [...currencies];

		const orderedCurrencies = copyCurrencies.sort((a, b) => {
			if (a[key] > b[key]) return 1;
			if (a[key] < b[key]) return -1;
			return 0;
		});

		return orderedCurrencies;
	};

	const handleDropdown = (e: ChangeEvent<HTMLSelectElement>) => {
		setCurrentOrderOption(e.target.value);
		setCurrencies(orderCurrencies(currencies, e.target.value));
	};

	const handleSearch = (query: string) => {
		mutate(undefined, {
			onSuccess: (data) => {
				if (query === "") {
					setCurrencies(data);
				} else {
					const filteredCurrencies = data.filter((currency) => {
					if (currency.name.toLowerCase().includes(query.toLowerCase()))
						return currency;
					});
		
					setCurrencies(filteredCurrencies);
				}
			}
		});
	};

	return (
		<>
			<Header>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Divisas
				</h1>
				<div className="flex w-full gap-2 sm:w-96">
					<DropdownOrderBy
						onChange={handleDropdown}
						options={orderOptions}
						value={currentOrderOption}
					/>
					<SearchInput
						Icon={IconCoin}
						onSearch={(e) => setSearch(e.target.value)}
						propertie="divisa"
					/>
				</div>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{currencies.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full">
						<p className="text-3xl font-bold text-center">
							¡Oh no! :(
						</p>

						<p className="mt-5 text-lg text-center">
							Algo no ha salido como esperabamos. Por favor,
							intentalo más tarde.
						</p>
					</div>
				) : (
					<ul
						role="list"
						className="grid w-full gap-3 overflow-auto divide-y divide-gray-100 sm:grid-cols-2 xl:grid-cols-4 my-7"
					>
						{currencies.map((currency) => (
							<Currency
								currency={currency}
								key={currency.symbol}
							/>
						))}
					</ul>
				)}
			</section>
		</>
	);
};
