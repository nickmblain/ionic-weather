import { LoadingController } from '@ionic/angular';
import { from, Observable, Subject } from 'rxjs';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { flatMap, tap } from 'rxjs/operators';

export class WeatherPageBase<T> {
  private refresh: Subject<void>;
  data$: Observable<T>;
  scale: string;

  constructor(
    private loadingController: LoadingController,
    protected userPreferences: UserPreferencesService,
    private fetch: () => Observable<T>,
  ) {
    this.refresh = new Subject();
    this.data$ = this.refresh.pipe(flatMap(() => this.getData()));
  }

  async ionViewDidEnter() {
    this.scale = (await this.userPreferences.getUseCelcius()) ? 'C' : 'F';
    this.refresh.next();
  }

  private getData(): Observable<T> {
    let loading;
    return from(this.showLoading())
      .pipe(
        flatMap(l => {
          loading = l;
          return this.fetch();
        })
      )
      .pipe(tap(() => loading.dismiss()));
  }

  private async showLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create();
    await loading.present();
    return loading;
  }
}
