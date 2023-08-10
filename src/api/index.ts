import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../http";
import { Client } from "../interfaces";

export const useGetCustomers = () => {
    return useMutation({
        mutationKey: ["Customers"],
        mutationFn: async (name: string) => {
            const { data } = await httpClient.get<Client[]>("/customers", {
                params: {
                    name
                }
            });

            return data;
        }
    });
}