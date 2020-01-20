import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeatherService } from '@app/services/weather/weather.service';
import { UVIndex } from '@app/models/uv-index';
import { LoadingController } from '@ionic/angular';
import { WeatherPageBase } from '@app/weather-page-base/weather-page-base';
import { UserPreferencesService } from '@app/services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-uv-index',
  templateUrl: 'uv-index.page.html',
  styleUrls: ['uv-index.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UvIndexPage extends WeatherPageBase<UVIndex> {

  advice: Array<string> = [
    'Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. ' +
      'Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Stay in the shade near midday when the sun is strongest. If outdoors, wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, ' +
      'even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such sand, water and snow, will increase UV exposure.',
    'Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after ' +
      'swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.'
  ];

  constructor(
    loadingController: LoadingController,
    weather: WeatherService,
    userPreferences: UserPreferencesService
  ) {
    super(loadingController, userPreferences, () => weather.uvIndex());
  }
}
