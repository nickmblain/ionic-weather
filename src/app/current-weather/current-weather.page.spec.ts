import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CurrentWeatherPage } from './current-weather.page';
import { WeatherService } from '@app/services/weather/weather.service';
import { createWeatherServiceMock } from '@app/services/weather/weather.service.mock';
import { LoadingController } from '@ionic/angular';
import {
  createOverlayControllerMock,
  createOverlayElementMock
} from '@test/mocks';

import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { createUserPreferencesServiceMock } from '../services/user-preferences/user-preferences.service.mock';

describe('CurrentWeatherPage', () => {
  let component: CurrentWeatherPage,
    fixture: ComponentFixture<CurrentWeatherPage>,
    loading;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: LoadingController,
          useFactory: () =>
            createOverlayControllerMock('LoadingController', loading)
        },
        { provide: WeatherService, useFactory: createWeatherServiceMock },
        { provide: UserPreferencesService, useFactory: createUserPreferencesServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    [{ use: true, scale: 'C' }, { use: false, scale: 'F' }].forEach(test => {
      it(`determines the scale ${test.scale}`, fakeAsync (() => {
        const userPreferences = TestBed.get(UserPreferencesService);
        userPreferences.getUseCelcius.and.returnValue(Promise.resolve(test.use));
        component.ionViewDidEnter();
        tick();
        expect(component.scale).toEqual(test.scale);
      }));
    });

    it('displays a loading indicator', fakeAsync (() => {
      const loadingController = TestBed.get(LoadingController);
      component.ionViewDidEnter();
      tick();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    }));

    it('gets the current weather', fakeAsync (() => {
      const weather = TestBed.get(WeatherService);
      component.ionViewDidEnter();
      tick();
      expect(weather.current).toHaveBeenCalledTimes(1);
    }));

    it('displays the current weather', fakeAsync (() => {
      const weather = TestBed.get(WeatherService);
      weather.current.and.returnValue(
        of({
          temperature: 280.32,
          condition: 300,
          date: new Date(1485789600 * 1000)
        })
      );
      component.ionViewDidEnter();
      tick();
      fixture.detectChanges();
      const t = fixture.debugElement.query(By.css('kws-temperature'));
      expect(t).toBeTruthy();
    }));

    it('dismisses the loading indicator', fakeAsync (() => {
      const weather = TestBed.get(WeatherService);
      weather.current.and.returnValue(
        of({
          temperature: 280.32,
          condition: 300,
          date: new Date(1485789600 * 1000)
        })
      );
      component.ionViewDidEnter();
      tick();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    }));
  });

  describe('toggling the scale', () => {
    it('toggles from "C" to "F"', () => {
      component.scale = 'C';
      component.toggleScale();
      expect(component.scale).toEqual('F');
    });

    it('sets the preference false when toggling from "C" to "F"', () => {
      const userPreferences = TestBed.get(UserPreferencesService);
      component.scale = 'C';
      component.toggleScale();
      expect(userPreferences.setUseCelcius).toHaveBeenCalledTimes(1);
      expect(userPreferences.setUseCelcius).toHaveBeenCalledWith(false);
    });

    it('toggles from "F" to "C"', () => {
      component.scale = 'F';
      component.toggleScale();
      expect(component.scale).toEqual('C');
    });

    it('sets the preference true when toggling from "F" to "C"', () => {
      const userPreferences = TestBed.get(UserPreferencesService);
      component.scale = 'F';
      component.toggleScale();
      expect(userPreferences.setUseCelcius).toHaveBeenCalledTimes(1);
      expect(userPreferences.setUseCelcius).toHaveBeenCalledWith(true);
    });
  });
});
