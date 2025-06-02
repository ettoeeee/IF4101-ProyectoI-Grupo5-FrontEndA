import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestDTO } from '../../domain/dto/login-request.dto';
import { LoginResponseDTO } from '../../domain/dto/login-response.dto';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(datos: LoginRequestDTO) {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, datos);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  guardarSesion(usuario: string, rol: string, token: string) {
    sessionStorage.setItem('usuario', usuario);
    sessionStorage.setItem('rol', rol);
    sessionStorage.setItem('token', token);
  }

  obtenerRol(): string | null {
    return sessionStorage.getItem('rol');
  }

  estaLogueado(): boolean {
    return sessionStorage.getItem('token') !== null;
  }
}
