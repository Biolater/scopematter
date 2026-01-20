<h1 align="center">🧾 ScopeMatter (Frontend Interface)</h1>
<p align="center">
  <i>Prevent scope creep. Get paid for every hour you work.</i>
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
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-Auth-orange?style=flat-square&logo=clerk" />
  <img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=flat-square" />
</p>

---

## 🧠 Engineering Cognition (Trust Engine)
**This repository is a demonstration of architectural integrity and system-wide ownership.**

> [!IMPORTANT]
> **[Read the ARCHITECTURE.md](./ARCHITECTURE.md)** > This document details the **Mental Models**, **Technical Trade-offs** (e.g., Server Actions vs. API Fetching), and **System Boundaries** used to build a secure, type-safe SaaS orchestrator for 2026 remote standards.

---

## 💡 Why I Built This
Freelancers lose significant monthly revenue to unmanaged scope creep—minor client requests that accumulate into unpaid work. Most freelancers avoid these conversations to prevent "client friction."

**ScopeMatter** solves this by providing a structured, neutral system for logging and approving changes. It transforms "awkward money talks" into professional **Change Orders**, ensuring developers get paid for every hour while maintaining client trust.

---

## 🚀 Key Workflows & Features
- **Project Scope Definition:** Immutable records of project deliverables.
- **The Approval Loop:** A three-state workflow (Requested -> In/Out Scope -> Approved/Rejected).
- **Automated Change Orders:** Instant generation of professional PDF documentation for out-of-scope work.
- **Client Transparency:** Public, token-secured views allowing clients to approve requests asynchronously.
- **Optimistic UI:** Custom hooks ensuring dashboard updates feel instantaneous (<100ms) despite external API round-trips.

---

## 🏗️ The "Architect" Stack
ScopeMatter is built as a decoupled **Distributed System** to ensure high availability and independent scaling of the Experience and Domain layers.

| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
| **Experience** | Next.js 15 (App Router) | UI Orchestration, Server Action Guards, & RSC Caching |
| **Logic/API** | Node.js (Express) | Domain Logic, PDF Generation, & Persistence Management |
| **Data Integrity** | Prisma + PostgreSQL | Relational Consistency & Transaction Safety |
| **Performance** | Upstash (Redis) | Distributed Caching for real-time Dashboard Metrics |
| **Security** | Clerk | Ephemeral Session Management & JWT injection at the edge |

---

## 🌐 Distributed System Notice
This repository contains the **Frontend Interface**.  
- **Backend Domain API:** Located at [Biolater/scopematter-be](https://github.com/Biolater/scopematter-be).

*Architecture Choice: By separating the Experience Layer (Next.js) from the Domain Layer (Express), we ensure the core business logic remains agnostic, enabling future native mobile integrations without redeploying the web orchestration layer.*

---

## 🚀 Getting Started (Local Sovereignty)

### Prerequisites
- Node.js 18+
- A valid Clerk account (for Auth)
- A running instance of the [ScopeMatter Backend](https://github.com/Biolater/scopematter-be)

### Setup
```bash
# 1. Clone & Enter
git clone [https://github.com/Biolater/scopematter.git](https://github.com/Biolater/scopematter.git)
cd scopematter

# 2. Install
npm install

# 3. Environment Config
cp .env.example .env
# Ensure NEXT_PUBLIC_API_URL points to your local or remote backend instance.

# 4. Launch
npm run dev