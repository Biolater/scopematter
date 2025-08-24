# ⚡ PayLynk Frontend Action + Query System

This document explains how **API calls, server actions (mutations), queries (GET), errors, and forms** are centralized in the frontend.  
Read this whenever you need to remember how things work.

---

## 📂 Directory Structure

```
lib/
  http/
    api.ts               // raw fetch wrapper (server-only)
    api-exception.ts     // ApiException class
    action.ts            // generic handleAction for mutations
    query.ts             // generic handleQuery for GET requests
    envelope.ts          // backend response contract types
    errors.ts            // error normalization + detailsToRHF helper
    map-errors.ts        // applyFieldErrors helper for RHF
  hooks/
    use-server-action.ts // client hook wrapper around server actions
  actions/
    wallet.actions.ts    // thin wrappers (createWalletAction, etc.)
  data/
    wallets.ts           // thin wrappers for GET (getWallets, etc.)
  types/
    wallet.types.ts      // TS models for responses
    error.types.ts       // shared ErrorDetail type
  validation/
    wallet.schema.ts     // Zod validation schemas
```

---

## 1. 🔌 Backend Contract (`envelope.ts`)

Backend always returns one of two envelopes:

```ts
// Success
{
  success: true,
  data: {...},           // payload
  error: null,
  meta: {}
}

// Error
{
  success: false,
  data: null,
  error: {
    message: string;
    code: string;
    details?: { field?: string; message: string }[];
  },
  meta: {}
}
```

We mirror that on the frontend:

```ts
export type ErrorDetail = { field?: string; message: string };

export interface ApiSuccess<T> {
  success: true;
  data: T;
  error: null;
  meta: Record<string, unknown>;
}
export interface ApiError {
  success: false;
  data: null;
  error: { message: string; code: string; details?: ErrorDetail[] };
  meta: Record<string, unknown>;
}
export type ApiEnvelope<T> = ApiSuccess<T> | ApiError;
```

---

## 2. 🌐 `api.ts` (Central Fetch)

This is the **only place** that calls `fetch`.

- Adds Clerk token.
- Parses backend envelope.
- Returns `data` or throws `ApiException`.

```ts
const data = await api<User>("/users/123");
```

If backend responds with `success: false`, this throws `ApiException`.

---

## 3. 🎯 `handleAction` (Mutations)

Generic handler for POST/PUT/PATCH/DELETE.

- Runs **Zod validation** again (defense in depth).
- Calls backend through `api<T>`.
- Returns **ActionResult<T>** shape.

```ts
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; code?: string; details?: ErrorDetail[] };
```

Usage:

```ts
return handleAction<CreateDto, User>({
  schema: createUserSchema,
  path: "/users",
  method: "POST",
  body: payload,
  revalidateTags: ["users"],
});
```

---

## 4. 🔎 `handleQuery` (GET)

Generic handler for GET requests.

- Calls backend through `api<T>`.
- Returns **QueryResult<T>** shape.
- Supports cache control (revalidate, tags).

```ts
export type QueryResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };
```

Usage:

```ts
return handleQuery<User[]>("/users", { revalidate: 60, tags: ["users"] });
```

---

## 5. 🎣 `useServerAction` (Client Hook)

Wraps a server action in `useActionState` so you get pending state + results automatically.

```tsx
const { state, runAction, isPending } = useServerAction<CreateDto, User>(
  createUserAction,
  {
    onSuccess: (user) => toast.success("User created!"),
    onError: (err) => applyFieldErrors<CreateDto>(err.details, setError),
  }
);

// run it:
await runAction(formData);
```

### `state` has type `ActionResult<T>`

- `state.ok === true` → access `state.data`
- `state.ok === false` → access `state.message` + `state.details`

---

## 6. 🛠 Error Utilities

### `normalizeError(e)`

Converts `ApiException` or JS `Error` into `{ message, code?, details? }`.

### `detailsToRHF(details)`

Turns backend validation errors into an object shaped for RHF `setError`.

### `applyFieldErrors(details, setError)`

Directly calls `setError` for each backend error.

```ts
applyFieldErrors<UserDto>(err.details, setError);
```

---

## 7. 🧱 Example: Wallet Flow

### Action

```ts
export async function createWalletAction(payload: WalletSchemaType) {
  return handleAction<WalletSchemaType, Wallet>({
    schema: createWalletSchema,
    path: "/wallets",
    method: "POST",
    body: payload,
    revalidateTags: ["wallets"],
  });
}
```

### Query

```ts
export async function getWallets() {
  return handleQuery<Wallet[]>("/wallets", {
    revalidate: 60,
    tags: ["wallets"],
  });
}
```

### Component

```tsx
const { state, runAction, isPending } = useServerAction<
  WalletSchemaType,
  Wallet
>(createWalletAction, {
  onSuccess: () => {
    reset();
    setIsOpen(false);
  },
  onError: (err) => {
    if (!err.ok) applyFieldErrors<WalletSchemaType>(err.details, setError);
  },
});

const onSubmit = async (data: WalletSchemaType) => {
  await runAction(data);
};

// For queries (RSC or server component)
const res = await getWallets();
if (!res.ok) return <div>Error: {res.message}</div>;
```

---

## 8. ✅ Best Practices

- **Never call `fetch` directly** → always use `api()`.
- **All writes go through `handleAction`**.
- **All reads go through `handleQuery`**.
- **All client forms use `useServerAction`** for state handling.
- **Always apply backend errors with `applyFieldErrors`**.
- **Discriminated unions** in `ActionResult<T>` and `QueryResult<T>` ensure TS catches mistakes.

---

## 9. 📝 Quick Cheatsheet

```ts
// GET
const res = await handleQuery<User[]>("/users");
if (!res.ok) throw new Error(res.message);

// POST
return handleAction<CreateDto, User>({ schema, path, method: "POST", body });

// Client hook for POST
const { state, runAction, isPending } = useServerAction<CreateDto, User>(
  action
);

// Run inside form
await runAction(formData);

// Apply field errors
applyFieldErrors<CreateDto>(err.details, setError);
```

---

⚡ With this system:

- Backend and frontend stay in sync.
- Error handling is centralized.
- Forms show backend validation errors automatically.
- Both reads and writes are unified.
- You never rewrite boilerplate.
