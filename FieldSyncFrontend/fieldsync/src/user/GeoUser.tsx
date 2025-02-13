import { Address } from "./Address";
import { Company } from "./Company";

export class GeoUser {
  id: string = '';
  name: string = '';
  company: Company = new Company;
  email: string = '';
  phone: string = '';
  address: Address = new Address;
  

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.company) this.company = initializer.company;
    if (initializer.email) this.email = initializer.email;
    if (initializer.phone) this.phone = initializer.phone;
    if (initializer.address) this.address = initializer.address;

  }
}