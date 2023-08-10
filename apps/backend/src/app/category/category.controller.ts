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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../auth/entities/user-request.entity';

@ApiTags('categories')
@Controller('organizations/:organizationId/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    const { userId } = req.user;

    return this.categoryService.create(
      createCategoryDto,
      organizationId,
      userId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.categoryService.findAll(organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.categoryService.findOne(id, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const { userId } = req.user;

    return this.categoryService.update(
      id,
      updateCategoryDto,
      organizationId,
      userId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.categoryService.remove(id, organizationId, userId);
  }
}
