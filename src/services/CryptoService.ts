import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log("getCryptos response data:", data.Data);

        const result = CryptoCurrenciesResponseSchema.safeParse(data.Data); // Use data.Data to access the actual array

        if (result.success) {
            return result.data;
        } else {
            console.error("Error parsing data:", result.error);
            throw new Error("Invalid data structure");
        }
    } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
        throw error;
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`
    const { data: { DISPLAY } } = await axios(url)

    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency])
    if (result.success) {
        console.log(result)
        return result.data
    }
}
