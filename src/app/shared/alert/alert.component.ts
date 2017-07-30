import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() dismissible = true;
  @Input() type = 'warning';
  @Output() close = new EventEmitter<void>();

  closeHandler() {
    this.close.emit();
  }

  get alertClasses() {
    return `alert alert-${this.type}`;
  }

}
