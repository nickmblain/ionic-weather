import { EMPTY } from 'rxjs';

export function createWeatherServiceMock() {
  return jasmine.createSpyObj('WeatherService', {
    current: EMPTY,
    forecast: EMPTY,
    uvIndex: EMPTY
  });
}