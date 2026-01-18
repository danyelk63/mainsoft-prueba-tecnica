import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { IPaginatedResponse } from '../../../../../core/models/pagination.model';
import { IGrade, Grade, GradePaginatedObservable } from '../../../models/grade.model';
import { HttpStudentService } from '../../../../student/services/http/student/student';
import { HttpTeacherService } from '../../../../teacher/services/http/teacher/teacher';

@Injectable({
  providedIn: 'root',
})
export class HttpGradeService {
  private http: HttpClient = inject(HttpClient);
  private httpStudentService = inject(HttpStudentService);
  private httpTeacherService = inject(HttpTeacherService);

  baseEndpoint = environment.apiUrl + '/grades';

  getAll(page: number = 1, limit: number = 10): GradePaginatedObservable {
    return this.http.get<IPaginatedResponse<IGrade>>(this.baseEndpoint, { params: { page, limit } }).pipe(
      switchMap(response => {
        return forkJoin({
          students: this.httpStudentService.getAll(1, 1000),
          teachers: this.httpTeacherService.getAll(1, 1000)
        }).pipe(
          map(({ students, teachers }) => {
            const studentMap = new Map(students.data.map(s => [s.id, s.name]));
            const teacherMap = new Map(teachers.data.map(t => [t.id, t.name]));
            
            return {
              data: response.data.map(grade => {
                const gradeObj = new Grade(grade);
                (gradeObj as any).studentName = studentMap.get(grade.studentId) || 'N/A';
                (gradeObj as any).teacherName = teacherMap.get(grade.teacherId) || 'N/A';
                return gradeObj;
              }),
              pagination: response.pagination
            };
          })
        );
      })
    );
  }
  
  getById(id: number): Observable<Grade> {
    return this.http.get<IGrade>(`${this.baseEndpoint}/${id}`).pipe(
      map(grade => new Grade(grade))
    );
  }

  getByFilters(filters: { studentId?: number, teacherId?: number }): Observable<Grade[]> {
    return this.http.get<IGrade[]>(`${this.baseEndpoint}/filter`, { params: filters }).pipe(
      map(grades => grades.map(grade => new Grade(grade)))
    );
  }

  create(grade: Grade): Observable<Grade> {
    return this.http.post<IGrade>(this.baseEndpoint, grade).pipe(
      map(grade => new Grade(grade))
    );
  }

  update(grade: Grade, id: number): Observable<Grade> {
    return this.http.put<IGrade>(`${this.baseEndpoint}/${id}`, grade).pipe(
      map(grade => new Grade(grade))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
