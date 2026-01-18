import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { IPaginatedResponse } from '../../../../../core/models/pagination.model';
import { IStudent, Student, StudentPaginatedObservable } from '../../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class HttpStudentService {
  private http: HttpClient = inject(HttpClient);

  baseEndpoint = environment.apiUrl + '/students';

  getAll(page: number = 1, limit: number = 10): StudentPaginatedObservable {
    return this.http.get<IPaginatedResponse<IStudent>>(this.baseEndpoint, { params: { page, limit } }).pipe(
      map(response => ({
        data: response.data.map(student => new Student(student)),
        pagination: response.pagination
      }))
    );
  }
  
  getById(id: number): Observable<Student> {
    return this.http.get<IStudent>(`${this.baseEndpoint}/${id}`).pipe(
      map(student => new Student(student))
    );
  }

  create(student: Student): Observable<Student> {
    return this.http.post<IStudent>(this.baseEndpoint, student).pipe(
      map(student => new Student(student))
    );
  }

  update(student: Student, id: number): Observable<Student> {
    return this.http.put<IStudent>(`${this.baseEndpoint}/${id}`, student).pipe(
      map(student => new Student(student))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
