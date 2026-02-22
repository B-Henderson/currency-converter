import { CurrencyConverterClient } from "./components/CurrencyConverterClient/CurrencyConverterClient";
import { getCurrencies } from "@/lib/getCurrencies";

export default async function Home() {
  // serverside fetch to get the currencies, no token leaking since it's only on the server
  const currencies = await getCurrencies();

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex min-h-screen w-full flex-col items-center max-w-xl justify-center px-6 py-12 rounded overflow-hidden ">
        <div className="w-full rounded-2xl border p-6 shadow-lg">
          <h1 className="mb-6 text-2xl font-semibold">
            Currency Converter
          </h1>
          <CurrencyConverterClient currencies={currencies} />
        </div>
      </main>
    </div>
  );
}
