import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { FromNowPipe } from './from-now.pipe';

import { RaceService } from './race.service';
import { UserService } from './user.service';
import { WsService } from './ws.service';

import * as Webstomp from 'webstomp-client';

import { AppComponent } from './app.component';
import { PonyComponent } from './pony/pony.component';
import { RacesComponent } from './races/races.component';
import { MenuComponent } from './menu/menu.component';
import { RaceComponent } from './race/race.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';

@NgModule({
  declarations: [
    AppComponent,
    PonyComponent,
    RacesComponent,
    MenuComponent,
    RaceComponent,
    FromNowPipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BetComponent,
    LiveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [RaceService, UserService, WsService,
    { provide: 'WebSocket', useValue: WebSocket },
    { provide: 'Webstomp', useValue: Webstomp }],
  bootstrap: [AppComponent]
})
export class AppModule { }
