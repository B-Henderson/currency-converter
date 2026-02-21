import Image from "next/image";

export default async function Home() {
  const data = await fetch(`${process.env.CURRENCY_BEACON_BASE_URL}/currencies?api_key=${process.env.CURRENCY_BEACON_API_KEY}`);
  const currencies = await data.json();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       
      </main>
    </div>
  );
}
