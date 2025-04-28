import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionService } from '../sesion.service'; // 👈 Relativo a donde está ubicado el guard

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private sesionService: SesionService, private router: Router) {}

  canActivate(): boolean {
    if (this.sesionService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
