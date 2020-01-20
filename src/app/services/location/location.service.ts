import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Coordinate } from '@app/models/coordinate';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private geolocation: Geolocation) {}

  async current(): Promise<Coordinate> {
    const { coords } = await this.geolocation.getCurrentPosition();
    return { latitude: coords.latitude, longitude: coords.longitude };
  }
}
