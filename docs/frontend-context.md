# 🧭 PayLynk Frontend Context (AI Guide)

This single document gives AI models the essential context to work within the PayLynk frontend: structure, routes, libraries, architectural patterns, UI conventions (dialogs, dropdowns, tooltips), data fetching, mutations, error handling, and providers. Keep this updated as patterns evolve.

---

## Project Stack
- **Framework**: Next.js 15 (App Router, RSC)
- **UI**: HeroUI (NextUI v2) components + Tailwind CSS 4
- **State/Forms**: React Hook Form + Zod + `@tanstack/react-query`
- **Auth**: Clerk (`@clerk/nextjs`)
- **Theming**: `next-themes` + custom Clerk theme bridge
- **Animations**: Framer Motion
- **Icons**: Lucide, Heroicons
- **Analytics**: Vercel Analytics + Speed Insights
- **Internationalization-ready**: strings are plain text, format-ready

Key packages (see `package.json`): `@heroui/*`, `react-hook-form`, `@hookform/resolvers`, `zod`, `@clerk/nextjs`, `next-themes`, `framer-motion`, `@tanstack/react-query`, `@vercel/analytics`, `@vercel/speed-insights`.

---

## Repository Layout (high level)
- `app/`
  - `(auth)/{sign-in,sign-up,waitlist}`: Clerk routes
  - `(main)/dashboard`: dashboard page
  - `(main)/projects`: list + `[id]` detail, loading/error boundaries
  - `layout.tsx`, `providers.tsx`: global layout/providers
- `components/`
  - `dashboard/*`: dashboard UI
  - `projects/*`: project list, cards, dialogs, detail view (tabs, tables)
  - `projects/share-link/*`: share link management components
  - `sidebar-layout.tsx`, navbars, theme toggle, sections
  - `primitives.ts`: Tailwind Variants utilities (e.g., `title`, `subtitle`)
- `lib/`
  - `http/`: central API, action/query handlers, envelope, error mapping
  - `hooks/`: `use-server-action`, form helpers, local storage, etc.
  - `actions/`: server action wrappers (domain-specific)
  - `validation/`: Zod schemas
  - `types/`: shared types per domain
  - `data/`: server data functions + `queries/` for React Query factories
  - `animations.ts`, `utils/*`
- `config/`: env, fonts, site
- `styles/`: Tailwind, global CSS
- `docs/`: developer docs (this file; actions/queries guide)

---

## Routes (App Router)
- Public:
  - `/` landing
  - `/sign-in`, `/sign-up`, `/waitlist` (Clerk)
- Authenticated (wrapped in `(main)` layout):
  - `/dashboard`
  - `/projects`
  - `/projects/[id]` with `loading.tsx`, `not-found.tsx`, `error.tsx`

Route boundaries: use `error.tsx` for error boundaries and `loading.tsx` for Suspense loading states.

---

## Providers & Global Shell
- `app/providers.tsx` wires global context:
  - `HeroUIProvider` for UI behaviors
  - `NextThemesProvider` for theme switching
  - `ToastProvider` from `@heroui/toast`
  - `ClerkProviderWithTheme` to sync Clerk themes with app theme
  - `QueryClientProvider` for React Query with optimized defaults

Clerk appearance is themed via `components/clerk-provider-with-theme.tsx` and respects `next-themes`.

### Query Client Configuration
```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    },
  },
});
```

---

## Data Access Patterns
- Never call `fetch` directly—use `lib/http/api.ts`.
- Reads (GET): `handleQuery<T>(path, { revalidate?, tags? })` in `lib/http/query.ts`.
- Writes (mutations): `handleAction<TBody, TResponse>({...})` in `lib/http/action.ts`.
- Client forms/actions: `useServerAction(action, { onSuccess, onError, onSettled })` in `lib/hooks/use-server-action.ts` to get `runAction`, `isPending`, and unified result state.
- Error mapping to forms: `applyFieldErrors(details, setError)` in `lib/http/map-errors.ts`.
- React Query: Use `createQueryFactory` for client-side caching with `@tanstack/react-query`.

API contract and exception handling are centralized. Clerk JWT is attached in `api.ts`.

### React Query Factory Pattern
```ts
// Define query factory
const shareLinkQueries = createQueryFactory<ShareLinkParams, ShareLink[]>({
  resource: "share-link",
  getKey: ({ projectId }) => [projectId],
  queryFn: ({ projectId }) => getShareLinks({ projectId }),
  defaults: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 5, retry: 1 },
});

// Use in component
const { data, isLoading, error } = shareLinkQueries.use({ projectId });

// Invalidate after mutations
const { all, params } = shareLinkQueries.useInvalidate();
await params({ projectId }); // invalidate specific query
```

---

## Forms & Validation Pattern
- Build forms with React Hook Form + Zod resolvers.
- Validate both client-side (Zod) and server-side via `handleAction` defense-in-depth.
- On server errors, map `details` to fields using `applyFieldErrors`.
- Use `useFormChanges` hook for edit forms to track dirty fields and submit only changed data.

Minimal example (pattern):
```tsx
// RHF setup with Zod
const { control, handleSubmit, setError, formState: { errors, isSubmitting, isValid } } = useForm<FormType>({
  resolver: zodResolver(formSchema),
  defaultValues,
  mode: "onSubmit",
});

// For edit forms, use useFormChanges
const { getChangedFieldsForSubmission } = useFormChanges<FormType>(defaultValues, {
  resolver: zodResolver(formSchema),
});

// Bind server action with hooks
const { runAction, isPending } = useServerAction<FormType, ResponseType>(actionFn, {
  onSuccess: () => { addToast({ title: "Success", color: "success" }); /* reset/close */ },
  onError: (err) => { addToast({ title: err.message, color: "danger" }); applyFieldErrors<FormType>(err.details, setError); },
});

const onSubmit = (data: FormType) => runAction(data);
```

### Form Change Tracking
For edit dialogs, use `useFormChanges` to submit only modified fields:
```tsx
const onSubmit = async () => {
  const changedFields = getChangedFieldsForSubmission();
  if (Object.keys(changedFields).length === 0) {
    addToast({ title: "No changes detected", color: "warning" });
    return;
  }
  await runAction({ id: project.id, data: changedFields });
};
```

---

## Dialogs (Modals) Pattern
- Library: `@heroui/modal` (`Modal`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`).
- Control: either via `useDisclosure()` for self-contained dialogs or lifted `isOpen`/`onOpenChange` props.
- Inside `ModalContent`, the form is rendered as `<form className="contents">` to keep Modal structure while enabling submit.
- Buttons: `@heroui/button`, use `isLoading` + `isDisabled` with `isSubmitting || isPending` from RHF and server action hook.
- Inputs: `@heroui/input` and `Textarea`, controlled via `Controller` from RHF.
- Provide helper text/subtitles in `ModalHeader`.

Example traits drawn from `components/projects/*-dialog.tsx`:
- Validation with Zod; errors shown via `isInvalid` and `errorMessage`.
- Success → toast, reset form, close modal.
- Error → toast, apply field errors.
- Accessibility: Modal provides focus trapping; ensure labels and `aria-label` where needed.

---

## Dropdowns, Tooltips, Drawer
- Dropdowns: `@heroui/dropdown` with `Dropdown`, `DropdownTrigger`, `DropdownMenu`, `DropdownItem`. Use `onPress` handlers; place menu with `placement`.
- Tooltips: `@heroui/tooltip` wrapping action buttons; prefer short delays and clear `content` strings.
- Drawer: `@heroui/drawer` used for collapsible sidebar on small screens.

Example usage locations:
- `components/projects/project-settings-dropdown.tsx` (Dropdown actions)
- `components/projects/project-detail/tables/*` (Tooltip over action buttons)
- `components/sidebar-layout.tsx` (Drawer + Tooltip for navigation)

---

## Tables & Lists
- Use HeroUI `@heroui/table` where needed; many lists are composed with Cards + Flex.
- Motion patterns: `framer-motion` `variants` from `lib/animations.ts` (`listContainer`, `listItemRise`) for entrance and hover lifts.
- Status indicators: Use `Chip` components with color variants for status display.
- Action buttons: Icon-only buttons with `Tooltip` for better UX.

### Animation Variants
```ts
// From lib/animations.ts
export const listContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export const listItemRise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const hoverLiftProps = {
  whileHover: { y: -4, scale: 1.02 },
  transition: { type: "spring", stiffness: 200, damping: 15 },
};
```

---

## Component Conventions
- Naming: PascalCase for components, camelCase for props/vars, kebab-case file names for non-components.
- Co-locate domain components under `components/{domain}` with subfolders for `dialogs`, `tables`, etc.
- Keep components presentational; wire data via server components or hooks.
- Extract small style primitives into `components/primitives.ts` using `tailwind-variants`.
- Use `"use client"` directive only when necessary (forms, interactions, hooks).

### Styling Primitives
```ts
// From components/primitives.ts
export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: { violet: "from-[#FF1CF7] to-[#b249f8]", /* ... */ },
    size: { sm: "text-3xl lg:text-4xl", md: "text-[2.3rem] lg:text-5xl" },
  },
  compoundVariants: [
    {
      color: ["violet", "yellow", "blue", /* ... */],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});
```

---

## Error Handling
- All backend errors are normalized into an envelope; `api.ts` throws `ApiException` when `success: false` or non-2xx.
- `handleAction` converts exceptions to `{ ok: false, message, code?, details? }` for client consumption.
- `applyFieldErrors` pushes field-level errors into RHF.

---

## Performance & Caching
- GETs can opt into Next.js cache with `revalidate` seconds and `tags` for selective `revalidateTag` on mutations.
- Avoid N+1 renders in lists; use motion sparingly and memoize derived loading flags.
- React Query provides client-side caching with configurable `staleTime` and `gcTime`.
- Use `dynamic = "force-dynamic"` for pages that need fresh data on every request.

### Caching Strategy
- Server-side: Next.js cache with tags for selective invalidation
- Client-side: React Query with 5-minute stale time by default
- Mutations: Always revalidate relevant tags to keep data fresh

---

## Security
- No direct credential storage; Clerk token is injected server-side in `api.ts`.
- Never hard-code secrets in the frontend.

---

## Accessibility & i18n
- Use labeled inputs, `aria-label` for icon-only buttons, and HeroUI’s accessible components.
- Keep all visible strings simple and ready for translation.

---

## Example References (code excerpts)

Dialog with RHF + Zod + Action:
```tsx
// From components/projects/create-project-dialog.tsx
<ModalBody className="space-y-4">
  <Controller
    name="name"
    control={control}
    render={({ field }) => (
      <Input
        label="Project name"
        placeholder="Website redesign for Acme Inc."
        value={field.value ?? ""}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        isRequired
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
    )}
  />
</ModalBody>
```

Server action hook usage in list actions:
```tsx
// From components/projects/project-detail/tables/change-order-list.tsx
const { isPending: isApproving, runAction: runApproveAction } =
  useServerAction(approveChangeOrderAction, {
    onSuccess: () => {
      addToast({ title: "Change order approved", color: "success" });
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to approve change order",
        color: "danger",
      });
    },
  });
```

React Query factory usage:
```tsx
// From components/projects/share-link/share-link-dialog.tsx
const { data, isLoading, error } = shareLinkQueries.use([projectId], {
  enabled: isOpen,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
  retry: 1,
});
```

Central GET wrapper:
```ts
// From lib/http/query.ts
export async function handleQuery<T>(
    path: string,
    opts: QueryOptions = {}
): Promise<QueryResult<T>> {
    try {
        const data = await api<T>(path, {
            method: "GET",
            ...opts,
        } as any);
        return { ok: true, data };
    } catch (e: any) {
        return { ok: false, message: e.message ?? "Failed to fetch" };
    }
}
```

---

## Full Guide: Frontend Actions & Queries

The following section is included verbatim for completeness.

```1:289:docs/frontend-actions-and-queries.md
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
```
