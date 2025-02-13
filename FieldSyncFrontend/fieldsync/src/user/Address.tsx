import { Geo } from "./Geo";

export class Address {
  street: string = '';
  geo: Geo = new Geo;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.street) this.street = initializer.street;
    if (initializer.geo) this.geo = initializer.geo;
  }
}