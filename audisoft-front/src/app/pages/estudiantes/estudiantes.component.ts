import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="page-container"><h1>Estudiantes</h1><p>Página de gestión de estudiantes</p></div>',
  styles: ['.page-container { padding: 2rem; }']
})
export class EstudiantesComponent {}
