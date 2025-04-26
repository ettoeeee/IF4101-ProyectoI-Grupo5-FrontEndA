import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Instructor } from '../../domain/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = `${environment.apiBaseUrl}/instructores`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }

  create(instructor: Instructor): Observable<void> {
    return this.http.post<void>(this.apiUrl, instructor);
  }

  update(instructor: Instructor): Observable<void> {
    return this.http.put<void>(this.apiUrl, instructor);
  }

  delete(idInstructor: number, idPersona: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idInstructor}/${idPersona}`);
  }
}
