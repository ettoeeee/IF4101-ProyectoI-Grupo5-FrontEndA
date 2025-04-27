import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';
import { MedidasCorporalesComponent } from './features/medidas-corporales/medidas-corporales.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
<<<<<<< HEAD
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PanelPrincipalComponent },
      { path: 'clientes', component: ClienteListComponent },
=======
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      //{ path: 'clientes', component: ClienteListComponent },
>>>>>>> e0404d3310af1e7a6aef234013a572a0f8a1cf70
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
        path: 'medidas-corporales', 
        loadComponent: () => import('./features/medidas-corporales/medidas-corporales.component').then(m => m.MedidasCorporalesComponent) 
      },
      { 
        path: '', 
        redirectTo: 'medidas-corporales', 
        pathMatch: 'full' 
      }
    ]
  }

];
