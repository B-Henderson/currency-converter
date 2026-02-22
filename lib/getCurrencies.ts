import { CleanedCurrency } from "../app/types/types";

export async function getCurrencies(): Promise<CleanedCurrency[]> {
  const response = await fetch(`${process.env.CURRENCY_BEACON_BASE_URL}/currencies?api_key=${process.env.CURRENCY_BEACON_API_KEY}`);

  if (!response.ok) {
    throw new Error("Error retrieving currencies");
  }

  const data = await response.json();
  
  // make the data into an array of objects with what we need, a little easier to work with and remove the empty objects
  const currencies = Object.entries(data as Record<string, CleanedCurrency>).map(([_, value]) => ({
      name: value.name,
      symbol: value.symbol,
      short_code: value.short_code,
  })).filter(({ name, symbol, short_code }) => name && symbol && short_code);
  
  return currencies;
}