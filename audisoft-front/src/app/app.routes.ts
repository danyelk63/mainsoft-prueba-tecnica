import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/docentes',
    pathMatch: 'full'
  },
  {
    path: 'docentes',
    loadComponent: () => import('./features/teacher/pages/teacher/teacher').then(m => m.TeacherComponent)
  },
  {
    path: 'estudiantes',
    loadComponent: () => import('./features/student/pages/student/student').then(m => m.StudentComponent)
  },
  {
    path: 'notas',
    loadComponent: () => import('./features/grade/pages/grade/grade').then(m => m.GradeComponent)
  }
];
