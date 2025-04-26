import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
//import { LayoutComponent } from './layout/layout/layout.component';
//import { ClienteInsertReactiveComponent } from './clientes/cliente-insert-reactive/cliente-insert-reactive.component';
import { InstructorListComponent } from './features/instructores/instructor-list/instructor-list.component';
import { InstructorFormComponent } from './features/instructores/instructor-form/instructor-form.component';

export const routes: Routes = [
  {
    path: 'instructores',
    loadComponent: () => import('./features/instructores/instructor-list/instructor-list.component')
      .then(m => m.InstructorListComponent)
  },
  {
    path: 'instructores/nuevo',
    loadComponent: () => import('./features/instructores/instructor-form/instructor-form.component')
      .then(m => m.InstructorFormComponent)
  },
  {
    path: '',
    redirectTo: 'instructores',
    pathMatch: 'full'
  }
];
