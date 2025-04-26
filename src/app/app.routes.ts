import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes', component: ClienteListComponent }
      // NO agregues la ruta 'clientes/insertar'
    ]
  }
];
