import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table } from '../../../../shared/table/table';
import { HttpStudentService } from '../../services/http/student/student';
import { ITableColumn } from '../../../../shared/models/table.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Student } from '../../models/student.model';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StudentService } from '../../services/student/student';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Drawer } from '../../../../core/services/drawer/drawer';
import { HttpGradeService } from '../../../grade/services/http/grade/grade';
import { Grade } from '../../../grade/models/grade.model';
import { HttpTeacherService } from '../../../teacher/services/http/teacher/teacher';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Table, ButtonModule, DialogModule, InputTextModule, ToastModule, ConfirmDialogModule],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class StudentComponent {

  httpStudentService = inject(HttpStudentService);
  studentService = inject(StudentService);
  httpGradeService = inject(HttpGradeService);
  httpTeacherService = inject(HttpTeacherService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private drawerService = inject(Drawer);

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
  });

  visible: boolean = false;
  newStudent: boolean = false;
  loading: boolean = false;

  columns: ITableColumn[] = [
    { name: 'ID', key: 'id' },
    { name: 'Nombre', key: 'name' },
  ];

  onAddNew() {
    this.visible = true;
    this.newStudent = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onSave() {
    this.loading = true;

    const formValue = this.form.getRawValue();
    const student = new Student({
      id: this.newStudent ? 0 : (formValue.id ?? 0),
      name: formValue.name ?? ''
    });
    if (this.newStudent) {
      this.httpStudentService.create(student).subscribe({
        next: () => {
          this.closeDialog();
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Estudiante creado correctamente' });
          this.studentService.updateDataChange();
          this.form.reset();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el estudiante' });
        },
      });
    } else {
      this.httpStudentService.update(student, student.id ?? 0).subscribe({
        next: () => {
          this.closeDialog();
          this.loading = false;
          this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Estudiante actualizado correctamente' });
          this.studentService.updateDataChange();
          this.form.reset();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el estudiante' });
        },
      });
    }
  }

  onEdit(id: number) {
    this.visible = true;
    this.newStudent = false;
    this.httpStudentService.getById(id).subscribe({
      next: (student: Student) => {
        this.form.patchValue(student);
        this.messageService.add({ severity: 'success', summary: 'Cargado', detail: 'Estudiante Cargado Correctamente' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar el estudiante' });
      },
    });
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      header: 'Eliminar estudiante',
      message: 'Esta seguro que desea eliminar este estudiante?',
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
        this.httpStudentService.delete(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: 'Estudiante eliminado correctamente' });
            this.studentService.updateDataChange();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el estudiante' });
          },
        });
      },
    });
  }

  onRow(id: number) {
    this.httpStudentService.getById(id).subscribe({
      next: (student: Student) => {

        forkJoin({
          grades: this.httpGradeService.getByFilters({ studentId: student.id ?? 0 }),
          teachers: this.httpTeacherService.getAll(1, 1000)
        }).subscribe({
          next: ({ grades, teachers }) => {
            const teacherMap = new Map(teachers.data.map(t => [t.id, t.name]));

            let html = `
              <p><b>Estudiante:</b> ${student.name}</p>
              <p><b>Notas:</b> ${grades.length}</p>
              <ul>
                ${grades.map(grade => {
                  const teacherName = teacherMap.get(grade.teacherId) || 'N/A';
                  return `<li><b>Nota:</b> ${grade.name} <br> <b>Valor:</b> ${grade.value} <br> <b>Docente:</b> ${teacherName}</li> <br>`;
                }).join('')}
              </ul>
            `;

            this.drawerService.updateShowDrawer({ show: true, title: 'Estudiante', text: html });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las calificaciones' });
          },
        });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar el estudiante' });
      },
    });
  }

}
