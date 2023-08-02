import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { CreateOrganization } from '@untabled/types';

export class CreateOrganizationDto implements CreateOrganization {
  @IsNotEmpty()
  @IsString()
  name: string;
}
