import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FormControlValidationDirective } from './form-control-validation.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertComponent,
    FormControlValidationDirective
  ],
  exports: [
    AlertComponent,
    FormControlValidationDirective
  ]
})
export class SharedModule {
}
