<h1 align="center">🧾 ScopeMatter (Orchestration Layer)</h1>

<p align="center">
  <b>Eliminating "Silent Revenue Decay" via Immutable Scope Governance and Automated Change Order Workflows.</b>
</p>

<p align="center">
    <a href="https://scopematter.xyz/" target="_blank">
        <img src="https://img.shields.io/badge/🔗_Live_Demo-Visit_App-success?style=for-the-badge" />
    </a>
    <a href="https://9nghnaawajmv9mqf.public.blob.vercel-storage.com/scopematter" target="_blank">
        <img src="https://img.shields.io/badge/🎥_Video_Demo-Watch_Now-red?style=for-the-badge" />
    </a>
    <a href="https://github.com/Biolater/scopematter-be" target="_blank">
        <img src="https://img.shields.io/badge/📂_Backend_Repo-View_Code-blue?style=for-the-badge" />
    </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.9-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-6.31.1-orange?style=flat-square&logo=clerk" />
  <img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=flat-square" />
</p>

---

## 💡 Why I Built This
In the B2B service economy, **Scope Creep** isn't just a nuisance—it's a multi-billion dollar revenue leak. Freelancers and agencies often absorb "minor" client requests to avoid social friction, resulting in 15-20% billable hour loss.

**ScopeMatter** was engineered to solve the **"Social Friction vs. Financial Integrity"** paradox. By providing a neutral, immutable system of record for deliverables, it transforms awkward negotiation into a structured, professional approval loop. It ensures that every extension of work is explicitly acknowledged, approved, and documented for billing.

---

## 🧠 Engineering Cognition
This repository serves as a **Trust Engine**. It demonstrates high-level ownership of complex distributed state, secure asynchronous workflows, and type-safe proxying.

> [!IMPORTANT]
> **[Read the ARCHITECTURE.md](./ARCHITECTURE.md)**  
> This project is built on **Sovereign Design Principles**. The Architecture Doc details our **BFF (Backend-for-Frontend)** strategy, the **Envelope Proxy Pattern** for API normalization, and the systematic use of **Server Actions** as a secure mutation gateway.

---

## 🏗️ The "Architect" Stack
A selection of technologies chosen not for popularity, but for their contribution to system sovereignty and transactional integrity.

| Layer | Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Orchestration** | **Next.js 15 (App Router)** | Used as a BFF to handle edge validation, RSC caching, and secure token injection before data hits the Domain API. |
| **Foundation** | **React 19** | Leveraging the latest "Actions" API for native form-state management and reduced client-side bundle size. |
| **Auth & Identity** | **Clerk 6.31** | Externalized identity management using ephemeral session tokens to ensure zero-trust communication with the backend. |
| **Validation** | **Zod 4.0** | Acts as the "System Firewall," ensuring strict type-safety at the network edge and within Server Actions. |
| **UI Experience** | **HeroUI + Framer Motion** | High-performance component library paired with declarative animations for a "Premium Grade" user experience. |

---

## 🚀 Feature Solutions (The Value)

- **Immutable Scope Governance**: Prevents retroactive timeline disputes by versioning project requirements.
- **The "High-Trust" Approval Loop**: A cryptographically secured 3-state workflow (Requested -> Scoping -> Approved) that eliminates verbal ambiguity.
- **Automated Document Ledger**: Instant generation of **Legal-Ready PDF Change Orders**, closing the documentation gap between work performed and work billed.
- **Zero-Friction Client Portals**: Token-secured, non-interactive public views that allow clients to approve requests without creating an account—maximizing conversion.
- **Latency-Neutral UI**: Built with **TanStack Query (v5)** and **Optimistic Updates**, ensuring the dashboard reflects the "Future State" of the system while the server syncs in the background.

---

## 🌐 System Landscape
ScopeMatter is a **Distributed System**. This repository contains the **Frontend Interface (Orchestrator)**.

- **Frontend (This Repo)**: Handles the Experience Layer, State Orchestration, and API Caching.
- **Backend Domain API**: [Biolater/scopematter-be](https://github.com/Biolater/scopematter-be) — Handles Persistence, PDF Generation Engines, and Core Business Rules.

> [!TIP]
> This separation allows us to scale the UI independently of the heavy-lifting PDF generation logic and maintain a clean separation of concerns.

---

## 🚀 Getting Started (Local Sovereignty)

### Prerequisites
- Node.js 20+
- A Clerk Account (Dev Keys)
- Access to the [ScopeMatter Backend](https://github.com/Biolater/scopematter-be)

### Instant Setup
```bash
# Clone the sovereignty
git clone https://github.com/Biolater/scopematter.git
cd scopematter

# Install dependencies
npm install

# Configure the environment
cp .env.example .env
# Set NEXT_PUBLIC_API_URL and CLERK_ keys

# Launch development environment (Turbopack enabled)
npm run dev
```

---

## 🤖 AI Disclosure & Governance
This codebase was developed using a **"Human-Managed Agentic Workflow"**. 
1. **Design**: Conceptualized and architected by a Human Principal Engineer.
2. **Implementation**: Code generated/refined by AI agents (Claude 3.5 Sonnet / Gemini 2.0 Pro) under strict architectural constraints.
3. **Verification**: 100% of logic paths, security patterns, and type definitions have been manually reviewed and verified for production safety.

---

© 2026 Yusif. W-8BEN Ready for B2B Contracting. Azerbaijan-Based (UTC+4).