import { CleanedCurrency } from "@/app/types/types";

export interface CurrencySelectInterface {
    currencies: CleanedCurrency[];
    placeholder: string;
    onValueChange: (value: string) => void;
    value: string;
}