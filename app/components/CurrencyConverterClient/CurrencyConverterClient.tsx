'use client';

import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner"
import { CurrencySelect } from "@/app/components/CurrencyConverterClient/CurrencySelect/CurrencySelect";
import { CurrencyAmountInput } from "@/app/components/CurrencyConverterClient/CurrencyAmountInput/CurrencyAmountInput";

import { Props } from './CurrencyConverterClient.interface'


export function CurrencyConverterClient({currencies }: Props) {
    const [amount, setAmount] = useState<string>("")
    const [convertFrom, setConvertFrom] = useState<string>("")
    const [convertTo, setConvertTo] = useState<string>("")
    const [result, setResult] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const debounceAmount = useDebounce(amount, 400);
    
    // handlers for the fields to upate state
    const onAmountChange = (val: string) => setAmount(val)
    const onFromChange = (val: string) => setConvertFrom(val)
    const onToChange = (val: string) => setConvertTo(val)


    useEffect(() => {
        setResult(null);
        if (debounceAmount && convertFrom && convertTo) {
            setLoading(true);
            const fetchData = async () => {
                // fetch data from our api route, this is a server side route so no token leaking
                const res = await fetch(`/api/convert-currencies?from=${convertFrom}&to=${convertTo}&amount=${debounceAmount}`);
                const data = await res.json();
                return data;
            };
            // set the result and parse it to 2 decimal places, if there's no value set just show a hyphen
            fetchData()
                .then((data) => setResult(data?.value != null ? parseFloat(data.value).toFixed(2) : "-"))
                .finally(() => setLoading(false));
        }
    }, [amount, convertFrom, convertTo, debounceAmount]);

    return (
        <div className="w-full space-y-6">
            <CurrencyAmountInput onValueChange={onAmountChange} value={amount} />
            <div className="flex gap-4 flex-row items-end">
                <Field className="flex-1">
                    <FieldLabel>From</FieldLabel>
                    <CurrencySelect currencies={currencies} placeholder="Select currency" onValueChange={onFromChange} value={convertFrom} />
                </Field>
                <div className="self-center pt-6 text-2xl">→</div>
                <Field className="flex-1">
                    <FieldLabel>To</FieldLabel>
                    <CurrencySelect currencies={currencies} placeholder="Select currency" onValueChange={onToChange} value={convertTo} />
                </Field>
            </div>
            {(result || loading) && (
                <div className="rounded-lg border px-4 py-3">
                    {loading ? (
                        <p className="text-muted-foreground text-sm flex items-center gap-2">Converting… <Spinner /></p>
                    ) : (
                        <p className="text-lg font-semibold">
                            {amount && convertFrom && (
                                <span className="text-muted-foreground font-normal">{amount} {convertFrom} = </span>
                            )}
                            <span className="text-foreground">{result}</span>
                            {convertTo && <span className="text-muted-foreground font-normal"> {convertTo}</span>}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}