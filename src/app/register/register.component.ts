import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationFailed: boolean = false;

  userForm: FormGroup;
  passwordForm: FormGroup;

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;

  static passwordMatch(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value ? null : { matchingError: true };
  }

  static validYear(control: FormControl) {
    return control.value > 1900 && control.value < new Date().getFullYear() ? null : { invalidYear: true };
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.loginCtrl = this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(3)]));
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.birthYearCtrl = this.formBuilder.control('', Validators.compose([Validators.required, RegisterComponent.validYear]));

    this.passwordForm = this.formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    },
      {
        validator: RegisterComponent.passwordMatch
      });

    this.userForm = this.formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  register() {
    this.userService.register(this.userForm.get('login').value,
      this.passwordForm.get('password').value,
      this.userForm.get('birthYear').value)
      .subscribe(() => {
        this.registrationFailed = false;
        this.router.navigate(['/']);
      }, err => this.registrationFailed = true);
  }

}
