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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../auth/entities/user-request.entity';

@ApiTags('products')
@Controller('organizations/:organizationId/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest,
    @Body() createProductDto: CreateProductDto
  ) {
    const { userId } = req.user;

    return this.productService.create(createProductDto, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Param('organizationId') organizationId: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.productService.findAll(organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Req() req: UserRequest
  ) {
    const { userId } = req.user;

    return this.productService.findOne(id, organizationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const { userId } = req.user;

    return this.productService.update(
      id,
      updateProductDto,
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

    return this.productService.remove(id, organizationId, userId);
  }
}
