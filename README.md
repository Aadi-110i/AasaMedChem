# AasaMedChem Inventory and Order Management System

A robust, high-precision inventory and order management system designed for the chemical and medical industry. Built with Next.js, Neon PostgreSQL, and Prisma.

## 🚀 Live Demo
[Link to your Vercel deployment would go here]

## ✨ Features
- **Role-Based Access Control:** Separate dashboards for **Admin** (inventory management, order oversight) and **Seller** (quotation creation, order tracking).
- **Dynamic Unit Conversion:** Seamlessly handle orders in `g`, `kg`, `mL`, `L`, or `item` units regardless of how items are stored.
- **High-Precision Pricing:** Financial calculations handled with `Decimal.js` to ensure 8-decimal precision for chemical weights and INR amounts.
- **Inventory Tracking:** Real-time stock updates with automated deductions upon order placement.
- **Medical UI Theme:** A clean, professional interface built with custom Vanilla CSS.

## 🛠️ Tech Stack
- **Frontend:** Next.js 15 (App Router), Vanilla CSS, TypeScript.
- **Backend:** Next.js Server Actions, Custom JWT Authentication.
- **Database:** Neon PostgreSQL.
- **ORM:** Prisma.
- **Utilities:** `decimal.js` for math, `jose` for middleware auth.

## 📐 System Architecture
The application uses a **Server-First** approach. Most logic resides in Server Actions to ensure security and direct database interaction. Middleware handles route protection by verifying JWT tokens stored in HTTP-only cookies.

### Unit Storage & Conversion Strategy
To ensure maximum data integrity and prevent rounding errors, we use a **Base Unit Storage** strategy:

1. **Internal Storage:**
   - All weights are stored in **Grams (g)**.
   - All volumes are stored in **Milliliters (mL)**.
   - Individual counts are stored as **Items**.
2. **Pricing:**
   - Prices (`basePrice`) are stored as the rate **per base unit** (e.g., price per 1 gram).
3. **Conversion Logic:**
   - Conversion factors (e.g., 1000 for kg/g) are applied in the `src/lib/units.ts` utility.
   - **Order Placement:** When a user orders `2 kg`, the system converts this to `2000 g`, verifies stock against the gram-based inventory, and calculates `2000 * basePrice`.
   - **Consistency:** All calculations are performed using the `Decimal` type both in the database (PostgreSQL `Decimal(20, 8)`) and the application layer.

## 🗄️ Database Schema
Key tables and types:

- **`User`**: `id`, `email`, `passwordHash`, `role` (ADMIN, SELLER).
- **`Product`**: `id`, `name`, `baseUnit` (GRAM, MILLILITER, COUNT), `basePrice` (Decimal), `stock` (Decimal).
- **`Order`**: `id`, `userId`, `status`, `totalAmount` (Decimal).
- **`OrderItem`**: `id`, `orderId`, `productId`, `displayQuantity` (e.g., 2), `displayUnit` (e.g., 'kg'), `baseQuantity` (e.g., 2000).

## ⚙️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd med
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="your-neon-pooled-postgresql-url"
   DIRECT_URL="your-neon-direct-postgresql-url"
   JWT_SECRET="your-secure-secret"
   ```

   Use the pooled Neon connection string for `DATABASE_URL` in the app, and the direct Neon connection string for `DIRECT_URL` when running Prisma migrations.

4. **Setup Database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the app:**
   ```bash
   npm run dev
   ```

## 🚢 Deployment to Vercel
1. Push your code to GitHub.
2. Connect the repository to Vercel.
3. Add `DATABASE_URL` and `JWT_SECRET` to the project's Environment Variables in the Vercel dashboard.
4. Vercel will automatically build and deploy the app.

## 🔑 Test Credentials
1. Navigate to `/register`.
2. Create an **Admin** user.
3. Create a **Seller** user.
4. Log in as Admin to add products, then log in as Seller to place orders.
