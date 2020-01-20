import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IconMapService } from '@app/services/icon-map/icon-map.service';
import { Weather } from '@app/models/weather';
import { WeatherService } from '@app/services/weather/weather.service';
import { WeatherPageBase } from '@app/weather-page-base/weather-page-base';
import { UserPreferencesService } from '@app/services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  constructor(
    public iconMap: IconMapService,
    loadingController: LoadingController,
    weather: WeatherService,
    userPreferences: UserPreferencesService
  ) {
    super(loadingController, userPreferences, () => weather.current());
  }

  toggleScale() {
    this.scale = this.scale === 'C' ? 'F' : 'C';
    this.userPreferences.setUseCelcius(this.scale === 'C');
  }
}
