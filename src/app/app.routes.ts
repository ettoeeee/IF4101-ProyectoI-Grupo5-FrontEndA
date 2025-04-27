import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PanelPrincipalComponent },
      { path: 'clientes', component: ClienteListComponent },
      {
        path: 'instructores',
        loadComponent: () => import('./features/instructores/instructor-list/instructor-list.component')
          .then(m => m.InstructorListComponent)
      },
      {
        path: 'instructores/nuevo',
        loadComponent: () => import('./features/instructores/instructor-form/instructor-form.component')
          .then(m => m.InstructorFormComponent)
      }
    ]
  }
];
