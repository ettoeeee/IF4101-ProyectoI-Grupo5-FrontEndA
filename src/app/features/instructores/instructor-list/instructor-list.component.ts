import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor/instructor.service';
import { Instructor } from '../../../domain/instructor.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-instructor-list',
  standalone: true,
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
  imports: [CommonModule,
    HttpClientModule]
})

export class InstructorListComponent implements OnInit {

  instructores: Instructor[] = [];

  constructor(private instructorService: InstructorService) { }

  ngOnInit(): void {
    console.log('✅ ngOnInit() ejecutado');
    this.cargarInstructores();
  }

  cargarInstructores(): void {
    console.log('✅ cargarInstructores() ejecutado');

    console.log('🌐 URL solicitada:', this.instructorService['apiUrl']);

    this.instructorService.getAll().subscribe({
      next: (data: Instructor[]) => {
        console.log('✅ Instructores recibidos:', data);
        this.instructores = data;
      },
      error: (err: any) => console.error('❌ Error cargando instructores:', err)
    });
  }


  eliminarInstructor(instructor: Instructor): void {
    if (confirm(`¿Seguro que deseas eliminar a ${instructor.nombre} ${instructor.apellidos}?`)) {
      this.instructorService.delete(instructor.idInstructor, instructor.idPersona).subscribe({
        next: () => this.cargarInstructores(),
        error: (err: any) => console.error('Error al eliminar instructor:', err)
      });
    }
  }
}
