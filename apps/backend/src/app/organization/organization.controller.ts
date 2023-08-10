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
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../auth/entities/user-request.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: UserRequest,
    @Body() createOrganizationDto: CreateOrganizationDto
  ) {
    const { userId } = req.user;

    return this.organizationService.create(createOrganizationDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: UserRequest) {
    const { userId } = req.user;

    return this.organizationService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: UserRequest) {
    const { userId } = req.user;

    return this.organizationService.findOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    const { userId } = req.user;

    return this.organizationService.update(id, userId, updateOrganizationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: UserRequest) {
    const { userId } = req.user;

    return this.organizationService.remove(id, userId);
  }
}
