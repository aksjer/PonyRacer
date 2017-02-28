import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent {

  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Output() ponyClicked = new EventEmitter();

  constructor() { }

  getPonyImageUrl() {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${this.isRunning ? '-running' : ''}.gif`;
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }

}
