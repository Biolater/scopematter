import worldCountries from "world-countries";

import type { Country } from "@/types";

// Sanctioned / restricted list (payment restrictions vary by provider).
// Focus on OFAC high-risk and commonly restricted jurisdictions for payments/crypto.
const RESTRICTED_ISO2 = new Set<string>([
  "af", // Afghanistan
  "by", // Belarus
  "bi", // Burundi
  "cf", // Central African Republic
  "cu", // Cuba
  "cd", // DR Congo
  "ir", // Iran
  "iq", // Iraq (often partially)
  "kp", // North Korea
  "lb", // Lebanon (often restricted for some providers)
  "ly", // Libya
  "ml", // Mali
  "mm", // Myanmar (Burma)
  "ni", // Nicaragua
  "ru", // Russia
  "so", // Somalia
  "ss", // South Sudan
  "sd", // Sudan
  "sy", // Syria
  "ve", // Venezuela
  "ye", // Yemen
]);

function toCountryEmoji(iso2: string): string | undefined {
  // Country flag emoji from ISO2
  if (!iso2 || iso2.length !== 2) return undefined;
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const countries: Country[] = worldCountries
  .map((c) => {
    const code = String(c.cca2 || "").toLowerCase();
    const name = c.name?.common || c.name?.official || code.toUpperCase();
    return {
      code,
      name,
      emoji: toCountryEmoji(code),
      isRestricted: RESTRICTED_ISO2.has(code),
    } as Country;
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export function getCountryByCode(code?: string): Country | undefined {
  if (!code) return undefined;
  const lower = code.toLowerCase();
  return countries.find((c) => c.code === lower);
}


