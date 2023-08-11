import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../auth/entities/user-request.entity';

@ApiTags('menus')
@Controller('organizations/:organizationId/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest,
    @Body() createMenuDto: CreateMenuDto
  ) {
    const { userId } = req.user;

    return this.menuService.create(createMenuDto, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.findAll(organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.findOne(id, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest,
    @Body() updateMenuDto: UpdateMenuDto
  ) {
    const { userId } = req.user;

    return this.menuService.update(id, updateMenuDto, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.remove(id, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/products/:productId')
  addProduct(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.addProduct(id, productId, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/products/:productId')
  removeProduct(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.removeProduct(
      id,
      productId,
      organizationId,
      userId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/products')
  listProducts(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.listProducts(id, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/categories/:categoryId')
  addCategory(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.addCategory(id, categoryId, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/categories/:categoryId')
  removeCategory(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.removeCategory(
      id,
      categoryId,
      organizationId,
      userId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/categories')
  listCategories(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.listCategories(id, organizationId, userId);
  }
}
