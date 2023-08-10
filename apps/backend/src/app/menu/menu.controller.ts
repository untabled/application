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

  @Get()
  findAll(
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.findAll(organizationId, userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.findOne(id, organizationId, userId);
  }

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

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.menuService.remove(id, organizationId, userId);
  }
}
