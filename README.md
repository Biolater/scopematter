<h1 align="center">🧾 ScopeMatter</h1>
<p align="center">
  <i>Prevent scope creep. Get paid for every hour you work.</i>
</p>

<p align="center">
  <video src="https://9nghnaawajmv9mqf.public.blob.vercel-storage.com/scopematter" width="720" controls>
    Your browser does not support the video tag.
  </video>
</p>

<p align="center">
  <img src="./public/scopematter-banner.png" alt="ScopeMatter Banner" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-blue?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-Auth-orange?style=flat-square&logo=clerk" />
  <img src="https://img.shields.io/badge/Status-MVP%20Complete-brightgreen?style=flat-square" />
</p>

---

## ✅ Features

- **Project Scope Management:** Define project deliverables clearly with explicit scope items.
- **Client Requests Tracking:** Log and review every client request; mark them as in-scope or out-of-scope.
- **Change Orders:** Automatically generate formal change orders for out-of-scope work, including pricing and delivery terms.
- **Shareable Client Links:** Generate public, token-secured project views to share progress and approvals transparently.
- **PDF Exports:** Export scope and change orders as branded PDFs for documentation or invoicing.
- **Dashboard Overview:** View quick metrics for ongoing projects, pending requests, and approved change orders.
- **Secure Authentication:** Clerk-powered user management and protection for all private routes.
- **Cache-Optimized Performance:** Upstash Redis layer for 24h TTL caching on dashboards and projects.

---

## 🛠 Tech Stack

| Frontend                 | Backend             | ORM     | Database   | Auth    | Deployment |
|--------------------------|---------------------|---------|------------|---------|-------------|
| Next.js 15 (App Router)  | Node.js (Express)   | Prisma  | PostgreSQL | Clerk   | Vercel (FE) / Render (BE) |

---

## 📈 Demo

> 🎬 Watch the demo video above — showcasing how ScopeMatter helps freelancers formalize project scope, handle change requests, and prevent unpaid work.

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/muradyusubov/scopematter.git

# 2. Move into the folder
cd scopematter

# 3. Install dependencies
npm install

# 4. Setup environment variables
cp .env.example .env

# 5. Push the Prisma schema to your database
npx prisma db push

# 6. Run the backend (Express)
cd backend && npm run dev

# 7. Run the frontend (Next.js)
cd frontend && npm run dev
