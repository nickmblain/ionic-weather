import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { UserPreferencesService } from './user-preferences.service';

describe('UserPreferencesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useFactory: createIonicStorageMock }]
    })
  );

  it('should be created', () => {
    const service: UserPreferencesService = TestBed.get(UserPreferencesService);
    expect(service).toBeTruthy();
  });

  describe('getUseCelcius', () => {
    // Test for each requirement will go here
    it('waits for storage to be ready', () => {
      const service: UserPreferencesService = TestBed.get(
        UserPreferencesService
      );
      const storage = TestBed.get(Storage);
      service.getUseCelcius();
      expect(storage.ready).toHaveBeenCalledTimes(1);
    });

    it('gets the useCelcius value', async () => {
      const service: UserPreferencesService = TestBed.get(
        UserPreferencesService
      );
      const storage = TestBed.get(Storage);
      await service.getUseCelcius();
      expect(storage.get).toHaveBeenCalledTimes(1);
      expect(storage.get).toHaveBeenCalledWith('useCelcius');
    });

    it('resolves the useCelcius value', async () => {
      const service: UserPreferencesService = TestBed.get(
        UserPreferencesService
      );
      const storage = TestBed.get(Storage);
      storage.get.withArgs('useCelcius').and.returnValue(Promise.resolve(true));
      expect(await service.getUseCelcius()).toEqual(true);
    });

    it('caches the resolved useCelcius value', async () => {
      const service: UserPreferencesService = TestBed.get(
        UserPreferencesService
      );
      const storage = TestBed.get(Storage);
      storage.get.withArgs('useCelcius').and.returnValue(Promise.resolve(true));
      expect(await service.getUseCelcius()).toEqual(true);
      expect(await service.getUseCelcius()).toEqual(true);
      expect(await service.getUseCelcius()).toEqual(true);
      expect(storage.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('setUseCelcius', () => {
    // Test for each requirement will go here
    it('waits for storage to be ready', () => {
      const service: UserPreferencesService = TestBed.get(
        UserPreferencesService
      );
      const storage = TestBed.get(Storage);
      service.setUseCelcius(false);
      expect(storage.ready).toHaveBeenCalledTimes(1);
    });

    it('sets the useCelcius value', async () => {
      const service: UserPreferencesService = TestBed.get(
        UserPreferencesService
      );
      const storage = TestBed.get(Storage);
      await service.setUseCelcius(false);
      expect(storage.set).toHaveBeenCalledTimes(1);
      expect(storage.set).toHaveBeenCalledWith('useCelcius', false);
    });

    it('updates the cache value for useCelcius', async () => {
      const service: UserPreferencesService = TestBed.get(
        UserPreferencesService
      );
      const storage = TestBed.get(Storage);
      await service.setUseCelcius(false);
      expect(await service.getUseCelcius()).toEqual(false);
      expect(storage.get).not.toHaveBeenCalled();
    });
  });
});

function createIonicStorageMock() {
  return jasmine.createSpyObj('Storage', {
    get: Promise.resolve(),
    set: Promise.resolve(),
    ready: Promise.resolve()
  });
}
