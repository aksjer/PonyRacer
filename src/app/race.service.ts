import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';

import { environment } from '../environments/environment';
import { WsService } from './ws.service';
import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';

@Injectable()
export class RaceService {

  constructor(private http: HttpClient, private wsService: WsService) {}

  list(status: string): Observable<Array<RaceModel>> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }

  get(raceId): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  bet(raceId, ponyId): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  cancelBet(raceId): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect(`/race/${raceId}`)
      .takeWhile(liveRace => liveRace.status !== 'FINISHED')
      .map(liveRace => liveRace.ponies);
  }

  boost(raceId, ponyId) {
    return this.http.post(`${environment.baseUrl}/api/races/${raceId}/boosts`, { ponyId });
  }

}
