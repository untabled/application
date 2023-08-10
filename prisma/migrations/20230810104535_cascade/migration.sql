-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
