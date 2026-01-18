import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table } from '../../../../shared/table/table';
import { HttpTeacherService } from '../../services/http/teacher/teacher';
import { ITableColumn } from '../../../../shared/models/table.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Teacher } from '../../models/teacher.model';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TeacherService } from '../../services/teacher/teacher';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Drawer } from '../../../../core/services/drawer/drawer';
import { HttpGradeService } from '../../../grade/services/http/grade/grade';
import { Grade } from '../../../grade/models/grade.model';
import { HttpStudentService } from '../../../student/services/http/student/student';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Table, ButtonModule, DialogModule, InputTextModule, ToastModule, ConfirmDialogModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.scss',
})
export class TeacherComponent {

  httpTeacherService = inject(HttpTeacherService);
  teacherService = inject(TeacherService);
  httpGradeService = inject(HttpGradeService);
  httpStudentService = inject(HttpStudentService);
  drawerService = inject(Drawer);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
  });

  visible: boolean = false;
  newTeacher: boolean = false;
  loading: boolean = false;

  columns: ITableColumn[] = [
    { name: 'ID', key: 'id' },
    { name: 'Nombre', key: 'name' },
  ];

  onAddNew() {
    this.visible = true;
    this.newTeacher = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onSave() {
    this.loading = true;

    const formValue = this.form.getRawValue();
    const teacher = new Teacher({
      id: this.newTeacher ? 0 : (formValue.id ?? 0),
      name: formValue.name ?? ''
    });
    if (this.newTeacher) {
      this.httpTeacherService.create(teacher).subscribe({
        next: () => {
          this.closeDialog();
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Docente creado correctamente' });
          this.teacherService.updateDataChange();
          this.form.reset();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el docente' });
        },
      });
    } else {
      this.httpTeacherService.update(teacher, teacher.id ?? 0).subscribe({
        next: () => {
          this.closeDialog();
          this.loading = false;
          this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Docente actualizado correctamente' });
          this.teacherService.updateDataChange();
          this.form.reset();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el docente' });
        },
      });
    }
  }

  onEdit(id: number) {
    this.visible = true;
    this.newTeacher = false;
    this.httpTeacherService.getById(id).subscribe({
      next: (teacher: Teacher) => {
        this.form.patchValue(teacher);
        this.messageService.add({ severity: 'success', summary: 'Cargado', detail: 'Docente Cargado Correctamente' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar el docente' });
      },
    });
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      header: 'Eliminar docente',
      message: 'Esta seguro que desea eliminar este docente?',
      rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
        outlined: true,
      },
      accept: () => {
        console.log(id);
        this.httpTeacherService.delete(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: 'Docente eliminado correctamente' });
            this.teacherService.updateDataChange();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el docente' });
          },
        });
      },
    });
  }

  onRow(id: number) {
    this.httpTeacherService.getById(id).subscribe({
      next: (teacher: Teacher) => {

        forkJoin({
          grades: this.httpGradeService.getByFilters({ teacherId: teacher.id ?? 0 }),
          students: this.httpStudentService.getAll(1, 1000)
        }).subscribe({
          next: ({ grades, students }) => {
            const studentMap = new Map(students.data.map(s => [s.id, s.name]));

            let html = `
              <p><b>Docente:</b> ${teacher.name}</p>
              <p><b>Notas:</b> ${grades.length}</p>
              <ul>
                ${grades.map(grade => {
                  const studentName = studentMap.get(grade.studentId) || 'N/A';
                  return `<li><b>Nota:</b> ${grade.name} <br> <b>Valor:</b> ${grade.value} <br> <b>Estudiante:</b> ${studentName}</li> <br>`;
                }).join('')}
              </ul>
            `;

            this.drawerService.updateShowDrawer({ show: true, title: 'Docente', text: html });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las calificaciones' });
          },
        });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar el docente' });
      },
    });
  }

}
