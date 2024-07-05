import { z } from 'zod'

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
})

// De esta manera creamos la estructura del esquema para la respuesta del backend de la API en singular
export const CryptoCurrencyResponseSchema = z.object({
    // Formateamos la respuesta de acuerdo a los datos que
    CoinInfo: z.object({
        FullName: z.string(),
        Name: z.string()
    })
})

// respuesta en plural, (incluye todo el arreglo)
export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema)

export const PairSchema = z.object({
    currency: z.string(),
    cryptocurrency: z.string()
})

export const CryptoPriceSchema = z.object({
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string()
})