import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private keys = {
    useCelcius: 'useCelcius'
  };
  private cache: Map<string, any>;

  constructor(private storage: Storage) {
    this.cache = new Map();
  }

  async getUseCelcius(): Promise<boolean> {
    await this.storage.ready();
    if (!this.cache.has(this.keys.useCelcius)) {
      this.cache.set(this.keys.useCelcius, await this.storage.get(this.keys.useCelcius));
    }
    return this.cache.get(this.keys.useCelcius);
  }

  async setUseCelcius(value: boolean): Promise<void> {
    await this.storage.ready();
    await this.storage.set(this.keys.useCelcius, value);
    await this.cache.set(this.keys.useCelcius, value);
  }
}