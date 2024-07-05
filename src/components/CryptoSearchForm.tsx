import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { useState } from "react"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function CryptoSearchForm() {
    const { cryptocurrencies, fetchData } = useCryptoStore()

    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair, // tomamos una copia del pair para no perder el state previo
            [e.target.name]: e.target.value // de esta manera se sobre escribirá en el state correcto, ya que comparten nombres iguales
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(pair).includes('')) { //Si existe un valor vacío
            setError('Todos los campos son obligatorios...')
            return
        }
        setError('')

        fetchData(pair)
    }

    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select
                    name="currency"
                    id="currency"
                    value={pair.currency}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="cryptocurrency">Criptomoneda:</label>
                <select
                    name="cryptocurrency"
                    id="cryptocurrency"
                    value={pair.cryptocurrency}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {cryptocurrencies.map(crypto => (
                        <option
                            key={crypto.CoinInfo.FullName}
                            value={crypto.CoinInfo.Name}
                        >{crypto.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>

            <input type="submit" value='Cotizar' />
        </form>
    )
}
