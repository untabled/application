-- DropForeignKey
ALTER TABLE "categories_on_menu" DROP CONSTRAINT "categories_on_menu_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "categories_on_menu" DROP CONSTRAINT "categories_on_menu_menuId_fkey";

-- DropForeignKey
ALTER TABLE "procuts_on_menu" DROP CONSTRAINT "procuts_on_menu_menuId_fkey";

-- DropForeignKey
ALTER TABLE "procuts_on_menu" DROP CONSTRAINT "procuts_on_menu_productId_fkey";

-- AddForeignKey
ALTER TABLE "categories_on_menu" ADD CONSTRAINT "categories_on_menu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_menu" ADD CONSTRAINT "categories_on_menu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procuts_on_menu" ADD CONSTRAINT "procuts_on_menu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procuts_on_menu" ADD CONSTRAINT "procuts_on_menu_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
