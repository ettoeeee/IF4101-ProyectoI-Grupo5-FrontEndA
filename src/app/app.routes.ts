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
      },
      { 
        path: 'medidas-corporales', 
        loadComponent: () => import('./features/medidas-corporales/medidas-corporales.component')
          .then(m => m.MedidasCorporalesComponent) 
      },
      {
        path: 'ejercicios',
        loadComponent: () => import('./features/ejercicios/ejercicios/ejercicios.component')
        .then(e => e.EjerciciosComponent)
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./features/categoriaejercicio/categoriaejercicio/categoriaejercicio.component')
            .then(ce => ce.CategoriaEjercicioComponent)
      },      
    ]
  }
];