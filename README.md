<h1 align="center">🧾 ScopeMatter</h1>
<p align="center">
  <i>Prevent scope creep. Get paid for every hour you work.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-blue?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Upstash-Redis-00C7B7?style=flat-square&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-Auth-orange?style=flat-square&logo=clerk" />
  <img src="https://img.shields.io/badge/Status-MVP%20Complete-brightgreen?style=flat-square" />
</p>

---

## ✅ Features

- **Scope Tracking:** Define and manage project deliverables clearly.
- **Client Requests:** Log and track new client requests with approval flow.
- **Change Orders:** Automatically generate and approve paid out-of-scope changes.
- **Shareable Links:** Public, token-secured project views for clients.
- **PDF Exports:** Generate professional project and change order PDFs.
- **Dashboard:** View quick stats and activity summaries.
- **Secure Auth:** Clerk-based authentication.
- **Caching:** Fast Upstash Redis caching for dashboard and project data.

---

## 🛠 Tech Stack

| Frontend                 | Backend             | ORM     | Database   | Cache   | Auth    | Deployment |
|--------------------------|---------------------|---------|------------|---------|---------|-------------|
| Next.js 15 (App Router)  | Node.js (Express)   | Prisma  | PostgreSQL | Redis (Upstash) | Clerk   | Vercel (FE) / Render (BE) |

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

# 5. Push Prisma schema
npx prisma db push

# 6. Run development servers
cd backend && npm run dev
cd frontend && npm run dev
```

---

## 👨‍💻 Author

Built by [Murad Yusubov](https://github.com/biolater) — full-stack developer focused on building SaaS tools that empower freelancers and small agencies.

---

© 2025 ScopeMatter — All Rights Reserved.
