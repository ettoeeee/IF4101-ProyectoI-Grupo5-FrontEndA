import { Component, OnInit } from '@angular/core';
import { InstructorService } from '@app/services/instructor.service';
import { Instructor } from '@app/domain/instructor';

@Component({
  selector: 'app-instructor-list',
  standalone: true,
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
  imports: []
})
export class InstructorListComponent implements OnInit {

  instructores: Instructor[] = [];

  constructor(private instructorService: InstructorService) { }

  ngOnInit(): void {
    this.cargarInstructores();
  }

  cargarInstructores(): void {
    this.instructorService.getAll().subscribe({
      next: (data: Instructor[]) => this.instructores = data,
      error: (err: any) => console.error('Error cargando instructores:', err)
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
