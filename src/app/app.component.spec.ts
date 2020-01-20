import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { createPlatformMock } from '../../test/mocks';

describe('AppComponent', () => {
  let statusBar, splashScreen;

  beforeEach(async(() => {
    statusBar = jasmine.createSpyObj('StatusBar', ['styleLightContent', 'backgroundColorByHexString']);
    splashScreen = jasmine.createSpyObj('SplashScreen', ['hide']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBar },
        { provide: SplashScreen, useValue: splashScreen },
        { provide: Platform, useFactory: createPlatformMock }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('initialization', () => {
    let platform;

    beforeEach(() => {
      platform = TestBed.get(Platform);
      TestBed.createComponent(AppComponent);
    });

    it('waits for the platform to be ready', () => {
      expect(platform.ready).toHaveBeenCalledTimes(1);
    });

    it('sets the light content status bar style when ready', async () => {
      expect(statusBar.styleLightContent).not.toHaveBeenCalled();
      await platform.ready();
      expect(statusBar.styleLightContent).toHaveBeenCalledTimes(1);
    });

    it('hides the splash screen when ready', async () => {
      expect(splashScreen.hide).not.toHaveBeenCalled();
      await platform.ready();
      expect(splashScreen.hide).toHaveBeenCalledTimes(1);
    });

    it('does not set the background color by default', async () => {
      await platform.ready();
      expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
    });

    it('sets the background color if the current platform is android', async () => {
      platform.is.withArgs('android').and.returnValue(true);
      expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
      await platform.ready();
      expect(statusBar.backgroundColorByHexString).toHaveBeenCalledTimes(1);
      expect(statusBar.backgroundColorByHexString).toHaveBeenCalledWith('#754ec0');
    });

  });
});
