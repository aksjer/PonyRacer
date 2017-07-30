import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RaceService } from './race.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RacesResolverService implements Resolve<Array<RaceModel>> {

  constructor(private raceService: RaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<RaceModel>> {
    const status = route.routeConfig.path.toUpperCase();
    return this.raceService.list(status);
  }
}
