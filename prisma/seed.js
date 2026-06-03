const { PrismaClient, Prisma } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function ensureSchema() {
  const statements = [
    `DO $$ BEGIN CREATE TYPE "Role" AS ENUM ('ADMIN', 'SELLER'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    `DO $$ BEGIN CREATE TYPE "BaseUnit" AS ENUM ('GRAM', 'MILLILITER', 'COUNT'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    `DO $$ BEGIN CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'APPROVED', 'FULFILLED'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    `CREATE TABLE IF NOT EXISTS "app_users" (
      "id" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "role" "Role" NOT NULL DEFAULT 'SELLER',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
    );`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "app_users_email_key" ON "app_users"("email");`,
    `CREATE TABLE IF NOT EXISTS "app_products" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "description" TEXT,
      "baseUnit" "BaseUnit" NOT NULL,
      "basePrice" DECIMAL(20,8) NOT NULL,
      "stock" DECIMAL(20,8) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "app_products_pkey" PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "app_orders" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
      "totalAmount" DECIMAL(20,8) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "app_orders_pkey" PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "app_order_items" (
      "id" TEXT NOT NULL,
      "orderId" TEXT NOT NULL,
      "productId" TEXT NOT NULL,
      "displayQuantity" DECIMAL(20,8) NOT NULL,
      "displayUnit" TEXT NOT NULL,
      "baseQuantity" DECIMAL(20,8) NOT NULL,
      "unitPrice" DECIMAL(20,8) NOT NULL,
      "subtotal" DECIMAL(20,8) NOT NULL,
      CONSTRAINT "app_order_items_pkey" PRIMARY KEY ("id")
    );`,
    `DO $$ BEGIN ALTER TABLE "app_orders" ADD CONSTRAINT "app_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    `DO $$ BEGIN ALTER TABLE "app_order_items" ADD CONSTRAINT "app_order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "app_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    `DO $$ BEGIN ALTER TABLE "app_order_items" ADD CONSTRAINT "app_order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "app_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  ];

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
  }
}

async function main() {
  await ensureSchema();

  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const sellerPasswordHash = await bcrypt.hash('seller123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@aasamedchem.local' },
    update: {},
    create: {
      email: 'admin@aasamedchem.local',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: 'seller@aasamedchem.local' },
    update: {},
    create: {
      email: 'seller@aasamedchem.local',
      passwordHash: sellerPasswordHash,
      role: 'SELLER',
    },
  });

  const sodiumChloride =
    (await prisma.product.findFirst({ where: { name: 'Sodium Chloride, Lab Grade' } })) ||
    (await prisma.product.create({
      data: {
        name: 'Sodium Chloride, Lab Grade',
        description: 'High-purity reagent for general lab and production use.',
        baseUnit: 'GRAM',
        basePrice: new Prisma.Decimal('0.18'),
        stock: new Prisma.Decimal('5000'),
      },
    }));

  await prisma.product.findFirst({ where: { name: 'Ethanol 95%' } }) ||
    (await prisma.product.create({
      data: {
        name: 'Ethanol 95%',
        description: 'Industrial and laboratory ethanol supply.',
        baseUnit: 'MILLILITER',
        basePrice: new Prisma.Decimal('0.07'),
        stock: new Prisma.Decimal('25000'),
      },
    }));

  await prisma.product.findFirst({ where: { name: 'Nitrile Gloves, Box of 100' } }) ||
    (await prisma.product.create({
      data: {
        name: 'Nitrile Gloves, Box of 100',
        description: 'Disposable protective gloves for controlled environments.',
        baseUnit: 'COUNT',
        basePrice: new Prisma.Decimal('650.00'),
        stock: new Prisma.Decimal('80'),
      },
    }));

  const orderCount = await prisma.order.count();

  if (orderCount === 0) {
    const quantity = new Prisma.Decimal('250');
    const totalAmount = sodiumChloride.basePrice.mul(quantity);

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: sodiumChloride.id },
        data: { stock: { decrement: quantity } },
      });

      await tx.order.create({
        data: {
          userId: seller.id,
          status: 'APPROVED',
          totalAmount,
          items: {
            create: {
              productId: sodiumChloride.id,
              displayQuantity: quantity,
              displayUnit: 'g',
              baseQuantity: quantity,
              unitPrice: sodiumChloride.basePrice,
              subtotal: totalAmount,
            },
          },
        },
      });
    });
  }

  console.log('Seed complete:', {
    admin: admin.email,
    seller: seller.email,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });