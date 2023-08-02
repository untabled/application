import { Organization as OrganizationModel } from '@prisma/client';

export type Organization = Omit<OrganizationModel, 'createdAt' | 'updatedAt'>;

export interface CreateOrganization {
  name: string;
}

export interface UpdateOrganization {
  name: string;
}
