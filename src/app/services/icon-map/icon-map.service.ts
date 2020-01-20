import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconMapService {
  sunny = 'assets/images/sunny.svg';
  cloudy = 'assets/images/cloudy.svg';
  lightRain = 'assets/images/light-rain.svg';
  shower = 'assets/images/shower.svg';
  sunnyThunderStorm = 'assets/images/partial-tstorm.svg';
  thunderStorm = 'assets/images/tstorm.svg';
  fog = 'assets/images/fog.svg';
  snow = 'assets/images/snow.svg';
  unknown = 'assets/images/dunno.png';
}
