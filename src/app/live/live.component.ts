import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  raceModel: RaceModel;
  poniesWithPosition: PonyWithPositionModel[] = [];
  positionSubscription: Subscription;

  constructor(private route: ActivatedRoute, private raceService: RaceService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['raceId'];
    this.raceService.get(id).subscribe(race => this.raceModel = race);
    this.positionSubscription = this.raceService.live(id).subscribe(p => this.poniesWithPosition = p);
  }
  click() {
    console.log(this.positionSubscription);
  }

  ngOnDestroy() {
    if (this.poniesWithPosition) {
      this.positionSubscription.unsubscribe();
    }
  }
}
