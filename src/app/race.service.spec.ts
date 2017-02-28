import { async, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

import { environment } from '../environments/environment';
import { RaceService } from './race.service';
import { WsService } from './ws.service';
import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';

describe('RaceService', () => {

  let raceService: RaceService;
  let mockBackend: MockBackend;
  const wsService = jasmine.createSpyObj('WsService', ['connect']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
        deps: [MockBackend, BaseRequestOptions]
      },
      { provide: WsService, useValue: wsService },
      RaceService
    ]
  }));

  beforeEach(() => {
    raceService = TestBed.get(RaceService);
    mockBackend = TestBed.get(MockBackend);
  });

  it('should return an Observable of 3 races', async(() => {
    // fake response
    const hardcodedRaces = [{ name: 'Paris' }, { name: 'Tokyo' }, { name: 'Lyon' }];
    const response = new Response(new ResponseOptions({ body: hardcodedRaces }));
    // return the response if we have a connection to the MockBackend
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url)
        .toBe(`${environment.baseUrl}/api/races?status=PENDING`, 'The URL requested is not correct');
      expect(connection.request.method).toBe(RequestMethod.Get);
      connection.mockRespond(response);
    });

    raceService.list().subscribe((races: Array<RaceModel>) => {
      expect(races.length).toBe(3, 'The `list` method should return an array of RaceModel wrapped in an Observable');
    });
  }));

  it('should get a race', async(() => {
    // fake response
    const race = { name: 'Paris' };
    const response = new Response(new ResponseOptions({ body: race }));
    // return the response if we have a connection to the MockBackend
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url)
        .toBe(`${environment.baseUrl}/api/races/1`, 'The URL requested is not correct');
      expect(connection.request.method).toBe(RequestMethod.Get);
      connection.mockRespond(response);
    });

    const raceId = 1;

    raceService.get(raceId).subscribe(fetchedRace => expect(fetchedRace).toBe(race));
  }));

  it('should bet on a race', async(() => {
    // fake response
    const race = { name: 'Paris' };
    const response = new Response(new ResponseOptions({ body: race }));
    // return the response if we have a connection to the MockBackend
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url)
        .toBe(`${environment.baseUrl}/api/races/1/bets`, 'The URL requested is not correct');
      expect(connection.request.method).toBe(RequestMethod.Post);
      connection.mockRespond(response);
    });

    const raceId = 1;
    const ponyId = 2;

    raceService.bet(raceId, ponyId).subscribe(fetchedRace => expect(fetchedRace).toBe(race));
  }));

  it('should cancel a bet on a race', async(() => {
    // fake response
    const response = new Response(new ResponseOptions({ body: null }));
    // return the response if we have a connection to the MockBackend
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url)
        .toBe(`${environment.baseUrl}/api/races/1/bets`, 'The URL requested is not correct');
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(response);
    });

    const raceId = 1;

    raceService.cancelBet(raceId).subscribe(() => {});
  }));

  it('should return live positions from websockets', async(() => {
    const raceId = 1;
    const messages = new Subject<{status: string; ponies: Array<PonyWithPositionModel>}>();
    let positions: Array<PonyWithPositionModel> = [];

    wsService.connect.and.returnValue(messages);

    raceService.live(raceId).subscribe(pos => {
      positions = pos;
    });

    expect(wsService.connect).toHaveBeenCalledWith(`/race/${raceId}`);

    messages.next({
      status: 'RUNNING',
      ponies: [{
        id: 1,
        name: 'Superb Runner',
        color: 'BLUE',
        position: 1
      }]
    });

    messages.next({
      status: 'RUNNING',
      ponies: [{
        id: 1,
        name: 'Superb Runner',
        color: 'BLUE',
        position: 100
      }]
    });

    expect(positions.length).toBe(1);
    expect(positions[0].position).toBe(100);
  }));

});
