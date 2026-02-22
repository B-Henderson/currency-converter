import { CurrencyConverterClient } from "./components/CurrencyConverterClient/CurrencyConverterClient";
import { getCurrencies } from "@/lib/getCurrencies";

export default async function Home() {
  const currencies = await getCurrencies();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <CurrencyConverterClient currencies={currencies} />
      </main>
    </div>
  );
}
