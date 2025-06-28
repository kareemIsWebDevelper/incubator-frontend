import { OrgType } from "./OrgTypes";

export type ServiceCategoryType = {
  name: string;
  id: string;
};

export type VendorType = {
  name: string;
  email: string;
  phone: string;
};

export type ServiceType = {
  id?: string;
  name: string;
  description: string;
  assignedOrganizations: OrgType[];
  price: number;
  vendor: VendorType;
  serviceCategory?: ServiceCategoryType;
  createdAt: string;
};