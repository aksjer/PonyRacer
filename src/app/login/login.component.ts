import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: { login: string, password: string };
  authenticationFailed: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.credentials = { login: '', password: '' };
  }

  authenticate() {
    this.userService.authenticate(this.credentials).subscribe(res => {
      this.authenticationFailed = false;
      this.router.navigate(['/']);
    }, err => this.authenticationFailed = true);
  }

}
