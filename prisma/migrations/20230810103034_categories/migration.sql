/*
  Warnings:

  - You are about to drop the column `productCategoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productCategoryId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productCategoryId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "product_categories";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
