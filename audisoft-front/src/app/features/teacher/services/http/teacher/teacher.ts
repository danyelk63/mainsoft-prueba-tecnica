import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { IPaginatedResponse } from '../../../../../core/models/pagination.model';
import { ITeacher, Teacher, TeacherPaginatedObservable } from '../../../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class HttpTeacherService {
  private http: HttpClient = inject(HttpClient);

  baseEndpoint = environment.apiUrl + '/teachers';

  getAll(page: number = 1, limit: number = 10): TeacherPaginatedObservable {
    return this.http.get<IPaginatedResponse<ITeacher>>(this.baseEndpoint, { params: { page, limit } }).pipe(
      map(response => ({
        data: response.data.map(teacher => new Teacher(teacher)),
        pagination: response.pagination
      }))
    );
  }
  
  getById(id: number): Observable<Teacher> {
    return this.http.get<ITeacher>(`${this.baseEndpoint}/${id}`).pipe(
      map(teacher => new Teacher(teacher))
    );
  }

  create(teacher: Teacher): Observable<Teacher> {
    return this.http.post<ITeacher>(this.baseEndpoint, teacher).pipe(
      map(teacher => new Teacher(teacher))
    );
  }

  update(teacher: Teacher, id: number): Observable<Teacher> {
    return this.http.put<ITeacher>(`${this.baseEndpoint}/${id}`, teacher).pipe(
      map(teacher => new Teacher(teacher))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
