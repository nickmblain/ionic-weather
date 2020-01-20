export function createLocationServiceMock() {
    return jasmine.createSpyObj('LocationService', {
      current: Promise.resolve()
    });
  }