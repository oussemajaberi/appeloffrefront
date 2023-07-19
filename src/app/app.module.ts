import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule,KeycloakService } from 'keycloak-angular';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddoffreComponent } from './offre/addoffre/addoffre.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Import the MatIconModule
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
export function Kcfactory(kcService: KeycloakService) { // Fix the type here
  return () => kcService.init({
    config: {
      url: 'http://localhost:28080/auth',
      realm: 'appelOffre',
      clientId: 'appelOffre',
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    },
  });
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddoffreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule

  ],
  providers: [
    { provide: APP_INITIALIZER, deps: [KeycloakService], useFactory: Kcfactory, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
