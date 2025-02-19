export class User {
  id: string = '';
  name: string = '';
  company: string = '';
  email: string = '';
  phone: string = '';
  
  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.company) this.company = initializer.company;
    if (initializer.email) this.email = initializer.email;
    if (initializer.phone) this.phone = initializer.phone;
  }
}