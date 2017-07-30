import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from '../../models/race.model';

@Component({
  selector: 'pr-pending-races',
  templateUrl: './pending-races.component.html',
  styleUrls: ['./pending-races.component.css']
})
export class PendingRacesComponent {
  races: Array<RaceModel>;

  constructor(route: ActivatedRoute) {
    this.races = route.snapshot.data['races'];
  }
}
