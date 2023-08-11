import { useMutation } from "@tanstack/react-query";
import { Client, ClientDTO, Account, Currency } from "../interfaces";

import { httpClient } from "../http";

export const useGetCustomers = () => {
	return useMutation({
		mutationKey: ["Customers"],
		mutationFn: async (name: string) => {
			const { data } = await httpClient.get<Client[]>("/customers", {
				params: {
					name,
				},
			});

			return data;
		},
	});
};

export const useGetCustomer = () => {
	return useMutation({
		mutationKey: ["Customers"],
		mutationFn: async (id: string) => {
			const { data } = await httpClient.get<Client>("/customer/" + id, {});

			return data;
		},
	});
};

export const useCreateCustomer = () => {
	return useMutation({
		mutationKey: ["Customers"],
		mutationFn: async (customer: Omit<Client, "customerId">) => {
			const { data } = await httpClient.post<ClientDTO>("/customers", {
				...customer,
			});

			return data;
		},
	});
};

export const useGetAccountsByCustomerId = () => {
	return useMutation({
		mutationKey: ["Customers"],
		mutationFn: async (id: string) => {
			const { data } = await httpClient.get<Account[]>("/accounts/customer/" + id, {});

			return data;
		},
	});
};

export const useGetCurrencies = () => {
	return useMutation({
		mutationKey: ["Customers"],
		mutationFn: async () => {
			const { data } = await httpClient.get<Currency[]>("/currencies", {});

			return data;
		},
	});
};
