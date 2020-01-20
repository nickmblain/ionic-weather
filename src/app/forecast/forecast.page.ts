import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Forecast } from '@app/models/forecast';
import { IconMapService } from '@app/services/icon-map/icon-map.service';
import { WeatherService } from '@app/services/weather/weather.service';
import { WeatherPageBase } from '@app/weather-page-base/weather-page-base';
import { UserPreferencesService } from '@app/services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ForecastPage extends WeatherPageBase<Forecast> {
  constructor(
    public iconMap: IconMapService,
    loadingController: LoadingController,
    weather: WeatherService,
    userPreferences: UserPreferencesService
  ) {
    super(loadingController, userPreferences, () => weather.forecast());
  }
}
