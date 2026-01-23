# 📒 Architectural Decision Log (ADR)

## ADR-001: The "Ghost Database" Exorcism
**Date**: 2026-01-23
**Status**: ACCEPTED

### Context
The project contained `prisma` dependencies and `DATABASE_PASSWORD` environment variables, yet had no `prisma/schema.prisma` file or actual database connection logic. This created a "Ghost Database" ambiguity—was this a monorepo or a client?

### Decision
**We have explicitly defined this repository as a "Frontend / BFF Consumer" only.**
*   **Action**: Removed `prisma` dependency.
*   **Action**: Removed `DATABASE_PASSWORD` from build args and env config.
*   **Implication**: All data persistence MUST happen via the External API (`API_URL`).

### Consequences
*   ✅ **Positive**: Reduced build size, clearer mental model, zero security risk from unused DB credentials.
*   ⚠️ **Negative**: Cannot do direct DB reads for optimization; must rely entirely on API performance.

---

## ADR-002: Enforcement of "Envelope Pattern"
**Date**: 2026-01-23
**Status**: ACCEPTED

### Context
API responses were potential sources of `undefined` runtime errors.

### Decision
**All API communication must be wrapped in a standardized `ApiEnvelope<T>`.**
*   **Contract**: `{ success: boolean, data: T | null, error: { message: string } | null }`.

### Consequences
*   ✅ **Positive**: Type-safe error handling on the client.
*   ⚠️ **Negative**: Slight overhead in parsing/wrapping responses.

---

## ADR-003: Adoption of "Query Factory"
**Date**: 2026-01-23
**Status**: ACCEPTED

### Context
Hardcoded query keys (e.g., `['users', id]`) are fragile and lead to stale cache bugs.

### Decision
**Use a Factory Pattern to generate all React Query hooks/keys.**
*   **Implication**: Developers cannot manually write query keys. They must use the factory.

### Consequences
*   ✅ **Positive**: Centralized cache invalidation logic; impossible to typo a key.
*   ⚠️ **Negative**: Higher initial learning curve for new devs.
