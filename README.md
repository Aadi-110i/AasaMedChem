# 🔬 AasaMedChem – Precision Chemical Trading Platform

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql)

**AasaMedChem** is a full-stack, enterprise-grade B2B platform designed for precision chemical trading. Built with a monolithic architecture on Next.js, it solves the complex problem of dynamic, high-precision unit conversions and rigorous role-based access control (RBAC) required in the pharmaceutical and chemical supply chain.

---

## ✨ Key Features

### 🧮 High-Precision Scientific Conversions
- **Dynamic Unit Switching:** Buyers can order chemicals in any preferred unit (e.g., `grams`, `kilograms`, `milliliters`, `liters`, `items`).
- **Zero Rounding Errors:** Implemented `decimal.js` alongside PostgreSQL `NUMERIC(20,6)` to guarantee exact precision up to 6 decimal places across all financial and inventory calculations.
- **Base Unit Architecture:** The database exclusively stores stock and pricing in predefined "Base Units", while the presentation layer handles fluid, on-the-fly conversions.

### 🛡️ Edge-Protected RBAC (Role-Based Access Control)
- **Three-Tier Architecture:** Complete separation of concerns between `ADMIN` (inventory/order management), `SELLER` (chemical listings/requests), and `BUYER` (purchasing and ledger tracking).
- **Custom JWT Authentication:** Stateless, HTTP-only JWT cookies verified at the Next.js Edge Middleware layer (`jose` library) to prevent unauthorized access before the page even renders.

### 🎨 Premium UI/UX Design System
- **Modern Aesthetics:** Built with Tailwind CSS v4 featuring glassmorphism, smooth gradients, and a bespoke color palette tailored for a clinical, professional feel.
- **Micro-interactions:** Custom CSS keyframes (`fadeInUp`, `scaleIn`) and seamless `useTransition` hooks provide a fluid, app-like experience without full-page reloads.
- **Global Toast Notifications:** Custom-built sliding notification system with progress bars for real-time feedback on async server actions.

---

## 🏗️ System Architecture

- **Frontend Framework:** Next.js 16 (App Router), React 19
- **Backend Logic:** Next.js Server Actions (No external API routes needed)
- **Database:** PostgreSQL (Hosted on Neon)
- **ORM:** Prisma
- **Authentication:** Custom JWT (`bcryptjs`, `jose`, `jsonwebtoken`)
- **Styling:** Vanilla Tailwind CSS (v4) + Lucide React Icons

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Neon Serverless Postgres](https://neon.tech/) database (or any PostgreSQL instance)

### 1. Clone the repository
```bash
git clone https://github.com/Aadi-110i/AasaMedChem.git
cd AasaMedChem
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
# Neon PostgreSQL Connection String
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require"

# JWT Secret for Authentication
JWT_SECRET="your-super-secure-secret-key-2026"
```

### 4. Sync Database Schema & Seed Data
```bash
npx prisma db push --accept-data-loss
npx prisma db seed
```
*Note: The seed script will automatically generate an `admin` and `seller` account.*

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Add the `DATABASE_URL` and `JWT_SECRET` in the Vercel Environment Variables settings.
4. The custom `package.json` build script automatically runs `prisma generate` before `next build` to ensure the Prisma Client is bundled correctly.

---

*Designed and developed for seamless, secure, and precise chemical distribution.*
