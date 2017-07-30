import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './logged-in.guard';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'races',
    loadChildren: './races/races.module#RacesModule',
    canActivate: [LoggedInGuard]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  }
];
