"use server";

import { auth } from "@clerk/nextjs/server";
import { ApiEnvelope, ApiError, ApiSuccess } from "./envelope";
import { env } from "@/config/env";
import { ApiException } from "./exceptions";

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  isPublicApi?: boolean;
};

export async function api<T>(path: string, options: Options = {}): Promise<T> {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(`${options.isPublicApi ? env.PUBLIC_API_URL : env.API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache,
    next: options.revalidate || options.tags ? { revalidate: options.revalidate, tags: options.tags } : undefined,
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
