import { Component, OnInit } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'app-ponies',
  templateUrl: 'ponies.component.html',
  styleUrls: ['ponies.component.css']
})
export class PoniesComponent implements OnInit {

  ponies: any[] = [{ name: 'Rainbow Dash' }, { name: 'Pinkie Pie' }, { name: 'Black Friday' }]
  asyncGreeting = new Promise(resolve => {
    window.setTimeout(() => resolve('hello'), 2000);
  });

  constructor() { }

  ngOnInit() {
  }

  refreshList() {
    this.ponies = [{ name: 'Fluttershy' }, { name: 'Rarity' }]
  }

}
