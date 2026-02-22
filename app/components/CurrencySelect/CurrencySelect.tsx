import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
  } from "@/components/ui/combobox"

import { CurrencySelectInterface } from "./CurrencySelect.interface";
  
export function CurrencySelect({ currencies, placeholder, onValueChange, value }:CurrencySelectInterface) {
  return (
      <Combobox items={currencies} onValueChange={(val) => onValueChange(val ?? "")} value={value}>
          <ComboboxInput placeholder={placeholder} />
          <ComboboxContent>
              <ComboboxEmpty>No Currency found.</ComboboxEmpty>
        <ComboboxList>
            {({ name, short_code, symbol }) => (
                <ComboboxItem key={short_code} value={short_code}>
                    {name} - {symbol}
                </ComboboxItem>
            )}
        </ComboboxList>
          </ComboboxContent>
      </Combobox>
    );
}