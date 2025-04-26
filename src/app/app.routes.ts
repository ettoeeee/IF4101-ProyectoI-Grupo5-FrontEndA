import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
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
