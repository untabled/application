-- DropIndex
DROP INDEX "categories_on_menu_menuId_categoryId_key";

-- DropIndex
DROP INDEX "procuts_on_menu_menuId_productId_key";

-- AlterTable
ALTER TABLE "categories_on_menu" ADD CONSTRAINT "categories_on_menu_pkey" PRIMARY KEY ("menuId", "categoryId");

-- AlterTable
ALTER TABLE "procuts_on_menu" ADD CONSTRAINT "procuts_on_menu_pkey" PRIMARY KEY ("menuId", "productId");
