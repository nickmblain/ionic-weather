export function createUserPreferencesServiceMock() {
    return jasmine.createSpyObj('UserPreferencesService', {
      getUseCelcius: Promise.resolve(),
      setUseCelcius: Promise.resolve()
    });
  }
  