import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import {Props} from './CurrencyAmountInput.interface'

export function CurrencyAmountInput({ onValueChange, value }: Props) {    
    return (
        <Field >
            <FieldLabel htmlFor="input-field-amount">Amount:</FieldLabel>
            <Input
                id="input-field-amount"
                type="number"
                inputMode="decimal"
                placeholder="Enter the amount to convert"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
            />
            <FieldDescription>
                Input an amount you wish to convert, along with a "from" currency and "to" currency
            </FieldDescription>
        </Field>
    )
}