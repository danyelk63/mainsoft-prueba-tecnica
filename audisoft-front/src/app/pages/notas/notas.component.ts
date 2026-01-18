import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="page-container"><h1>Notas</h1><p>Página de gestión de notas</p></div>',
  styles: ['.page-container { padding: 2rem; }']
})
export class NotasComponent {}
