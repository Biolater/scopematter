# ScopeMatter (Client)

> **Role**: Trust Engine / Frontend Consumer
> **Architecture**: Next.js 15 (App Router) + TypeScript + Tailwind v4

## 🏛️ Compliance & Value

*   **Entity Classification**: Independent Contractor / Technology Consultant
*   **Tax Compliance**: **W-8BEN Compliant** (International Contractor).
*   **Tax Status**: **Tax-Exempt Entity** (Operating from Turkey/Azerbaijan Tax Zones).
*   **Cost Efficiency**: Hiring this entity provides estimated **20-30% cost savings** vs. domestic US/EU equivalents due to zero payroll tax liability for the client.

---

## 🤖 AI Disclosure Statement

**"Proof of Autonomy"**

This codebase was orchestrated by an **AI-Augmented Principal Architect**.
*   **Human Role**: Strategic Direction, Business Logic Definition, "Code Reviewer in Chief".
*   **AI Role**: Implementation Details, Boilerplate Generation, Architectural Consistency Enforcement.
*   **Transparency**: While AI tools (Claude, Copilot) assisted in synthesis, every architectural pattern (BFF, Envelopes) was explicitly chosen to solve specific engineering constraints. **This is not "vibe coding"; this is engineered software.**

---

## 🚀 Getting Started (Sovereign Mode)

We prioritize **Local Sovereignty**. You can run this entire stack with one command, assuming you have the sovereign credentials (`.env`).

### Prerequisites
*   Node.js 20+
*   Docker (Optional, for "Clean Room" execution)

### 1. Installation
```bash
npm install
```

### 2. Environment (The Key)
You need the `env.ts` keys.
```bash
cp .env.example .env
# Populate: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, API_URL
```

### 3. Ignition
```bash
npm run dev
```

---

## 🧩 Key Patterns

### The "Golden Path" for Data
1.  **Define Schema**: `lib/validation/my-entity.schema.ts`
2.  **Define Action**: `lib/actions/my-entity.actions.ts` (Validates Schema)
3.  **Define Query**: `lib/hooks/use-my-entity.ts` (Using Query Factory)
4.  **Component**: Consumes Hook or Action.

This ensures that **no unvalidated data** ever enters the UI state.
