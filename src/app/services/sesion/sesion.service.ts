import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestDTO } from '../../domain/dto/login-request.dto';
import { LoginResponseDTO } from '../../domain/dto/login-response.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private apiUrl = 'http://localhost:8080/bulk-gym/api'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(datos: LoginRequestDTO) {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, datos);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  guardarSesion(usuario: string, rol: string) {
    sessionStorage.setItem('usuario', usuario);
    sessionStorage.setItem('rol', rol);
  }

  obtenerRol(): string | null {
    return sessionStorage.getItem('rol');
  }

  estaLogueado(): boolean {
    return sessionStorage.getItem('usuario') !== null;
  }
}
