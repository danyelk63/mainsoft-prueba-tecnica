import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table } from '../../../../shared/table/table';
import { HttpGradeService } from '../../services/http/grade/grade';
import { ITableColumn } from '../../../../shared/models/table.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { Grade } from '../../models/grade.model';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GradeService } from '../../services/grade/grade';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpStudentService } from '../../../student/services/http/student/student';
import { HttpTeacherService } from '../../../teacher/services/http/teacher/teacher';
import { Student } from '../../../student/models/student.model';
import { Teacher } from '../../../teacher/models/teacher.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-grade',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Table, ButtonModule, DialogModule, InputTextModule, InputNumberModule, SelectModule, ToastModule, ConfirmDialogModule],
  templateUrl: './grade.html',
  styleUrl: './grade.scss',
})
export class GradeComponent implements OnInit {

  httpGradeService = inject(HttpGradeService);
  httpStudentService = inject(HttpStudentService);
  httpTeacherService = inject(HttpTeacherService);
  gradeService = inject(GradeService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private cdr = inject(ChangeDetectorRef);

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    studentId: [0, [Validators.required]],
    teacherId: [0, [Validators.required]],
    value: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  visible: boolean = false;
  newGrade: boolean = false;
  loading: boolean = false;

  students: Student[] = [];
  teachers: Teacher[] = [];

  columns: ITableColumn[] = [
    { name: 'ID', key: 'id' },
    { name: 'Nombre', key: 'name' },
    { name: 'Estudiante', key: 'studentName' },
    { name: 'Docente', key: 'teacherName' },
    { name: 'Valor', key: 'value' },
  ];

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData() {
    forkJoin({
      students: this.httpStudentService.getAll(1, 1000),
      teachers: this.httpTeacherService.getAll(1, 1000)
    }).subscribe({
      next: (response) => {
        this.students = response.students.data;
        this.teachers = response.teachers.data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar estudiantes y docentes' });
      }
    });
  }

  onAddNew() {
    this.visible = true;
    this.newGrade = true;
    this.form.reset({ id: 0, name: '', studentId: 0, teacherId: 0, value: 0 });
  }

  closeDialog() {
    this.visible = false;
  }

  onSave() {
    this.loading = true;

    const formValue = this.form.getRawValue();
    const grade = new Grade({
      id: this.newGrade ? 0 : (formValue.id ?? 0),
      name: formValue.name ?? '',
      studentId: formValue.studentId ?? 0,
      teacherId: formValue.teacherId ?? 0,
      value: formValue.value ?? 0
    });
    
    if (this.newGrade) {
      this.httpGradeService.create(grade).subscribe({
        next: () => {
          this.closeDialog();
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Nota creada correctamente' });
          this.gradeService.updateDataChange();
          this.form.reset();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la nota' });
        },
      });
    } else {
      this.httpGradeService.update(grade, grade.id ?? 0).subscribe({
        next: () => {
          this.closeDialog();
          this.loading = false;
          this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Nota actualizada correctamente' });
          this.gradeService.updateDataChange();
          this.form.reset();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la nota' });
        },
      });
    }
  }

  onEdit(id: number) {
    this.visible = true;
    this.newGrade = false;
    this.httpGradeService.getById(id).subscribe({
      next: (grade: Grade) => {
        this.form.patchValue(grade);
        this.messageService.add({ severity: 'success', summary: 'Cargado', detail: 'Nota Cargada Correctamente' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar la nota' });
      },
    });
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      header: 'Eliminar nota',
      message: 'Esta seguro que desea eliminar esta nota?',
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
        this.httpGradeService.delete(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: 'Nota eliminada correctamente' });
            this.gradeService.updateDataChange();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la nota' });
          },
        });
      },
    });
  }

}
