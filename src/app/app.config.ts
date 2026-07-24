import { ApplicationConfig } from '@angular/core';
import {
  ExtraOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InterceptorService } from '@private/shared/core/interceptors/interceptor.service';
import { RevenueMockInterceptor } from '@core/interceptors/revenue-mock.interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';

const routerOptions: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
  scrollPositionRestoration: 'top',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling(routerOptions)),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    // El mock va primero para poder cortocircuitar las llamadas del Modelo de Revenue en local.
    { provide: HTTP_INTERCEPTORS, useClass: RevenueMockInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
};
