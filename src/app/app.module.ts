import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, provideRouter } from '@angular/router';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { routes } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
