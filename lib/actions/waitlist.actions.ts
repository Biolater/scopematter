"use server";

import env from "../env";


export async function addToWaitlist(name: string, email: string, country: string) {
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = env;

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fields: {
                Name: name,
                Email: email,
                Country: country,
            },
        }),
        cache: "no-store",
    }
    );

    if (!res.ok) {
        console.error(await res.text());
        throw new Error("Failed to add to waitlist");
    }

    return res.json();
}
