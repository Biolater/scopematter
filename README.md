<h1 align="center">🧾 ScopeMatter</h1>
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
  <img src="https://img.shields.io/badge/Next.js-15-blue?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Upstash-Redis-00C7B7?style=flat-square&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-Auth-orange?style=flat-square&logo=clerk" />
  <img src="https://img.shields.io/badge/Status-MVP%20Complete-brightgreen?style=flat-square" />
</p>

---

## 💡 Why I Built This

Freelancers and small agencies lose thousands of dollars every year to scope creep. Clients add "just one more feature" or "quick change" without realizing it's outside the original agreement. Most freelancers either work for free (losing money) or have awkward money conversations (losing clients).

**ScopeMatter** provides a structured system to define project scope upfront, track every client request, and automatically convert out-of-scope work into paid change orders with professional documentation. No more unpaid work. No more awkward conversations.

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

## 🎥 Demo

**[Watch the full video demo](https://9nghnaawajmv9mqf.public.blob.vercel-storage.com/scopematter)** to see ScopeMatter in action.

**Key workflows shown:**
- Creating projects and defining scope items
- Logging client requests and marking them in-scope or out-of-scope
- Automatically generating change orders from rejected requests
- Sharing read-only project views with clients
- Exporting professional PDFs for documentation

---

## 🚀 Getting Started
```bash
# 1. Clone the repo
git clone https://github.com/Biolater/scopematter.git

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

Built by [Murad Yusubov](https://github.com/biolater), full-stack developer focused on building SaaS tools that empower freelancers and small agencies.

---

© 2025 ScopeMatter. All Rights Reserved.
