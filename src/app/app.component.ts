import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
  POSITION,
  SPINNER
} from "ngx-ui-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  fgsType: SPINNER.chasingDots,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderModule,
    HttpClientModule,
    NgxUiLoaderHttpModule,
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers:[HttpClient, JwtInterceptor]
})
export class AppComponent {
  title = 'fortuneForge';
  faHome = faHomeLg;
}
