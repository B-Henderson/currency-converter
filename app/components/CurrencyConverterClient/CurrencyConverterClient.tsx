'use client';

import { useState, useEffect } from "react";

import { CurrencySelect } from "@/app/components/CurrencySelect/CurrencySelect";

import { Props } from './CurrencyConverterClient.interface'
import { CurrencyAmountInput } from "../CurrencyAmountInput/CurrencyAmountInput";


export function CurrencyConverterClient({currencies }: Props) {
    const [amount, setAmount] = useState<string>("")
    const [convertFrom, setConvertFrom] = useState<string>("")
    const [convertTo, setConvertTo] = useState<string>("")
    const [result, setResult] = useState<string | null>(null)
    

    const onAmountChange = (val: string) => setAmount(val)
    const onFromChange = (val: string) => setConvertFrom(val)
    const onToChange = (val: string) => setConvertTo(val)


    useEffect(() => {
        setResult(null);
        if (amount && convertFrom && convertTo) {
            const fetchData = async () => {
                const res = await fetch(`/api/convert-currencies?from=${convertFrom}&to=${convertTo}&amount=${amount}`);
                const data = await res.json();
                return data;
            };
            fetchData().then((data) => setResult(data?.value != null ? String(data.value) : JSON.stringify(data)));
        }
    }, [amount, convertFrom, convertTo]);

    return (
        <div>         
            <CurrencyAmountInput onValueChange={onAmountChange} value={amount} />
            <CurrencySelect currencies={currencies} placeholder="Convert From" onValueChange={onFromChange} value={convertFrom} />
            <CurrencySelect currencies={currencies} placeholder="Convert To" onValueChange={onToChange} value={convertTo} />            
            {amount} - {convertFrom} - {convertTo} - {result}
        </div>
    )
}