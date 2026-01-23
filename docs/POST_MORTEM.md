# 💀 Post-Mortem: The Ghost Database Incident

**Date**: 2026-01-23
**Artifact**: Trust Engine Portfolio

## 1. The Anomaly
During the Phase 1 Reconnaissance scan, a critical cognitive dissonance was detected:
*   **Symptom**: `package.json` included `prisma` (ORM) and `env.ts` enforced `DATABASE_PASSWORD`.
*   **Reality**: The repository contained **ZERO** database schema files (`schema.prisma` was missing) and no backend logic structure.

## 2. The Dig
We identified this as "Boilerplate Residue"—a common artifact when developers clone "Full Stack T3" templates but then pivot to a "Backend-for-Frontend" (BFF) architecture without cleaning up.

**Why this matters**:
*   A "Ghost Database" implies a stateful dependency that doesn't exist.
*   It breaks "Proof of Autonomy" because a developer trying to run this locally would be blocked by missing credentials for a non-existent service.

## 3. The Pivot (Engineering Sovereignty)
We executed a decisive architecture pivot:
1.  **Excision**: Removed Prisma and DB environment variables (ADR-001).
2.  **Designation**: Formally designated the app as a **"Sovereign Client"**—a transient presentation layer that consumes an external Authority (API).
3.  **Enforcement**: Implemented the **Envelope Pattern** (ADR-002) to handle the external API responses safely, replacing the "Direct DB Access" mental model with a "Gateway" mental model.

## 4. Lessons Learned
*   **Trust > Code**: A repo that asks for a password it doesn't use is untrustworthy. Cleaning `env.example` is arguably more important than cleaning code.
*   **BFF Clarity**: When using Next.js as a BFF, explicitly ban direct DB access in the linter rules (or remove the libraries) to prevent "Architecture Drift".
