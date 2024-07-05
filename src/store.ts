import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoPrice, Cryptocurrency, Pair } from "./types";
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    fetchCryptos: async () => {
        try {
            const cryptocurrencies = await getCryptos();
            set((state) => ({
                ...state,
                cryptocurrencies
            })) // Actualizar el estado con las criptomonedas obtenidas
        } catch (error) {
            console.error("Error fetching cryptocurrencies:", error);
        }
    },
    loading: false,
    fetchData: async (pair) => {
        try {
            set(() => ({
                loading: true
            }))
            const result = await fetchCurrentCryptoPrice(pair);
            set((state) => ({
                ...state,
                result,
                loading: false
            }))
        } catch (error) {
            console.error("Error fetching crypto price:", error);
        }
    }
})))
