import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';//'./layout/layout.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';
import { MedidasCorporalesComponent } from './features/medidas-corporales/medidas-corporales.component';

export const routes: Routes = [
  
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component')
      .then(m => m.LoginComponent)
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PanelPrincipalComponent },
      { path: 'clientes', component: ClienteListComponent },

      // Instructores
      {
        path: 'instructores',
        loadComponent: () =>
          import('./features/instructores/instructor-list/instructor-list.component')
            .then(m => m.InstructorListComponent)
      },
      {
        path: 'instructores/nuevo',
        loadComponent: () =>
          import('./features/instructores/instructor-form/instructor-form.component')
            .then(m => m.InstructorFormComponent)
      },
 // Categorías de Ejercicio
      {
        path: 'categorias',
        loadComponent: () =>
          import('./features/categoriaejercicio/categoriaejercicio/categoriaejercicio.component')
            .then(ce => ce.CategoriaEjercicioComponent)
      },
      // Medidas Corporales
      {
        path: 'medidas-corporales',
        loadComponent: () =>
          import('./features/medidas-corporales/medidas-corporales.component')
            .then(m => m.MedidasCorporalesComponent)
      },

      // Empleados
      {
        path: 'empleados',
        loadComponent: () =>
          import('./features/empleados/empleado-list/empleado-list.component')
            .then(m => m.EmpleadoListComponent)
      },
      {
        path: 'empleados/nuevo',
        loadComponent: () =>
          import('./features/empleados/empleado-form/empleado-form.component')
            .then(m => m.EmpleadoFormComponent)
      },
      {
        path: 'empleados/edit/:id',
        loadComponent: () =>
          import('./features/empleados/empleado-form/empleado-form.component')
            .then(m => m.EmpleadoFormComponent)
      },

      // Ejercicios
      {
        path: 'ejercicios',
        loadComponent: () =>
          import('./features/ejercicios/ejercicios/ejercicios.component')
            .then(e => e.EjerciciosComponent)
      },

     
    ]
  }
];
