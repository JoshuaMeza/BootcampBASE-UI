import { IconCoin } from "@tabler/icons-react";
import { 
	Currency,
	DropdownOrderBy,
	Header,
	SearchInput
} from "../components";
import { Currency as ICurrency } from "../interfaces";
import { useEffect, useState } from "react";
import { currenciesMock } from "../mocks";

//TODO Renderizar arreglo de currencies ✅
//TODO Crear condicion en caso de que no haya datos ✅
//TODO Hacer el ordenado ✅
//TODO Crear handleDropdown para ordenar ✅
//TODO Crear handleSearch filtrar el arreglo ✅

export const Currencies = () => {
	const [currencies, setCurrencies] = useState<ICurrency[]>([]);
	const [currentOrderOption, setCurrentOrderOption] = useState("name");

	const orderOptions: { label: string; value: string }[] = [
		{ label: "Nombre", value: "name" },
		{ label: "Cambio", value: "value" },
	];

	useEffect(() => {
		setCurrencies(currenciesMock);
		setCurrencies((prevState) => orderCurrencies(prevState, currentOrderOption));
	}, []);

	const orderCurrencies = (
		currencies: ICurrency[],
		currentOrderOption: string,
	): ICurrency[] => {
		const key = currentOrderOption as keyof (typeof currencies)[0];

		const newCurrencies: ICurrency[] = currencies.sort((a: ICurrency, b: ICurrency) => {
			if (a[key] > b[key]) return 1;
			if (a[key] < b[key]) return -1;
			return 0;
		});
		return newCurrencies;
	};

	const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentOrderOption(e.target.value);
		setCurrencies(orderCurrencies(currencies, e.target.value));
	};

	const handleSearch = (searchWord: string) => {
		if (searchWord === "") {
			setCurrencies(currenciesMock);
		} else {
			const newCurrencies = currenciesMock.filter((currency) => {
				if (searchWord === currency.name.toString() ||
					searchWord === currency.symbol.toString() ||
					searchWord === currency.value.toString()) {
					return currency;
				}
			});
			setCurrencies(newCurrencies);
		}
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
						onSearch={(e) => handleSearch(e.target.value)}
						propertie="divisa"
					/>
				</div>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<ul
					role="list"
					className="grid w-full gap-3 overflow-auto divide-y divide-gray-100 sm:grid-cols-2 xl:grid-cols-4 my-7"
				>
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
						currencies.map((currency) => (
							<Currency currency={currency} key={currency.symbol} />
						))
					)}
				</ul>
			</section>
		</>
	);
};
