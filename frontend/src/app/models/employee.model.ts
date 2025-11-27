export interface Address {
  city?: string;
  state?: string;
  street?: string;
  postalCode?: string;
  country?: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  email?: string;
  phoneNumbers?: string[];
  position?: string;
  address?: Address;
}
