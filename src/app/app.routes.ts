import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
//import { LayoutComponent } from './layout/layout/layout.component';
//import { ClienteInsertReactiveComponent } from './clientes/cliente-insert-reactive/cliente-insert-reactive.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'clientes/insertar', pathMatch: 'full' }
      //{ path: 'clientes/insertar', component: ClienteInsertReactiveComponent }
    ]
  }
];
