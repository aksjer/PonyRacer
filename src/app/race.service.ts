import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';

@Injectable()
export class RaceService {

  constructor(private http: Http, private wsService: WsService) { }

  list(): Observable<RaceModel[]> {
    return this.http
      .get(`${environment.baseUrl}/api/races?status=PENDING`)
      .map(e => e.json() as RaceModel[]);
  }

  bet(raceId, ponyId): Observable<RaceModel> {
    return this.http
      .post(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId })
      .map(res => res.json());
  }

  get(raceId): Observable<RaceModel> {
    return this.http
      .get(`${environment.baseUrl}/api/races/${raceId}`)
      .map(res => res.json() as RaceModel);
  }

  cancelBet(raceId: number): Observable<Response> {
    return this.http
      .delete(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect(`/race/${raceId}`)
      .map(liveRace => liveRace.ponies);
  }

}
