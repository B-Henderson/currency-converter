import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    /**
     * get the url params to construct the endpoint url
     * @param from 3 letter code for the currency we are converting from
     * @param to 3 letter code for the currency we are converting to
     * @param amount the amount to convert from
     */
    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");
    const amount = request.nextUrl.searchParams.get("amount");
    try {
        const response = await fetch(`${process.env.CURRENCY_BEACON_BASE_URL}/convert?api_key=${process.env.CURRENCY_BEACON_API_KEY}&from=${from}&to=${to}&amount=${amount}`);
    
        if (!response.ok) {
            return NextResponse.json(
                { message: "Error retrieving currencies" },
                { status: 500 }
            )
        }
        const data = await response.json();
    
        return NextResponse.json(data);
    } catch (err) {
        console.error("Error retrieving currencies", err);
        return NextResponse.json(
            { message: "Error retrieving currencies" },
            { status: 500 }
        )
    }

}
