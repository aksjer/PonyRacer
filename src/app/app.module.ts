import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';
import * as Webstomp from 'webstomp-client';

import { ROUTES } from './app.routes';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { UserService } from './user.service';
import { WsService } from './ws.service';
import { LoggedInGuard } from './logged-in.guard';

export function webSocketFactory() {
  return WebSocket;
}

export function webstompFactory() {
  return Webstomp;
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    UserService,
    JwtInterceptorService,
    { provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptorService, multi: true },
    WsService,
    { provide: WEBSOCKET, useFactory: webSocketFactory },
    { provide: WEBSTOMP, useFactory: webstompFactory },
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
