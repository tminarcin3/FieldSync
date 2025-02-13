export class Geo {
  lat: string = '';
  lng: string = '';

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.lat = initializer.lat;
    if (initializer.id) this.lng = initializer.lng;

  }
}