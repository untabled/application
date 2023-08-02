import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { UpdateOrganization } from '@untabled/types';

export class UpdateOrganizationDto implements UpdateOrganization {
  @IsNotEmpty()
  @IsString()
  name: string;
}
