"use server";

import { auth } from "@clerk/nextjs/server";
import { ApiEnvelope, ApiError, ApiSuccess } from "./envelope";
import { env } from "@/config/env";
import { ApiException } from "./exceptions";

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

export async function api<T>(path: string, options: Options = {}): Promise<T> {
  const { getToken } = await auth();
  const token = await getToken();

  console.log("api", `${env.API_URL}${path}`);

  const res = await fetch(`${env.API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let json: ApiEnvelope<T>;
  try {
    json = await res.json();
  } catch {
    throw new ApiException({ message: `Invalid JSON (HTTP ${res.status})` }, res.status);
  }

  if (!res.ok || json.success === false) {
    const err = (json as ApiError).error ?? { message: `HTTP ${res.status}` };
    throw new ApiException(err, res.status);
  }

  return (json as ApiSuccess<T>).data;
}
