import { CurrencyConverterClient } from "./components/CurrencyConverterClient/CurrencyConverterClient";

import { CleanedCurrency } from "./types/types";

export default async function Home() {
  // fetch the currencies data from the api
  const response = await fetch(`${process.env.CURRENCY_BEACON_BASE_URL}/currencies?api_key=${process.env.CURRENCY_BEACON_API_KEY}`);
  const data = await response.json();
  
  // make the data into an array of objects with what we need, a little easier to work with and remove the empty objects
  const currencies = Object.entries(data as Record<string, CleanedCurrency>).map(([_, value]) => ({
      name: value.name,
      symbol: value.symbol,
      short_code: value.short_code,
  })).filter(({name, symbol, short_code}) => name && symbol && short_code);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <CurrencyConverterClient currencies={currencies} />
      </main>
    </div>
  );
}
