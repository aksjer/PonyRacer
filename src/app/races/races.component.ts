import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  races: RaceModel[] = [];

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.raceService.list().subscribe(races => this.races = races);
  }

}
