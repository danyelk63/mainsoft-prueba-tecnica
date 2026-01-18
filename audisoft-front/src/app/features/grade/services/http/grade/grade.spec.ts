import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpGradeService } from './grade';
import { HttpStudentService } from '../../../../student/services/http/student/student';
import { HttpTeacherService } from '../../../../teacher/services/http/teacher/teacher';

describe('HttpGradeService', () => {
  let service: HttpGradeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpGradeService, HttpStudentService, HttpTeacherService]
    });
    service = TestBed.inject(HttpGradeService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have baseEndpoint defined', () => {
    expect(service.baseEndpoint).toBeDefined();
  });

  it('should call getAll and return grades', () => {
    const mockResponse = {
      data: [{ id: 1, name: 'Test', studentId: 1, teacherId: 1, value: 85 }],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 }
    };

    service.getAll(1, 10).subscribe(response => {
      expect(response.data).toBeDefined();
    });

    const gradeReq = httpMock.expectOne(`${service.baseEndpoint}?page=1&limit=10`);
    expect(gradeReq.request.method).toBe('GET');
    gradeReq.flush(mockResponse);

    const studentReq = httpMock.expectOne('http://localhost:3000/api/students?page=1&limit=1000');
    studentReq.flush({ data: [{ id: 1, name: 'Student' }], pagination: { page: 1, limit: 1000, total: 1, totalPages: 1 } });

    const teacherReq = httpMock.expectOne('http://localhost:3000/api/teachers?page=1&limit=1000');
    teacherReq.flush({ data: [{ id: 1, name: 'Teacher' }], pagination: { page: 1, limit: 1000, total: 1, totalPages: 1 } });
  });

  it('should get grade by id', () => {
    const mockGrade = { id: 1, name: 'Test', studentId: 1, teacherId: 1, value: 85 };

    service.getById(1).subscribe(grade => {
      expect(grade).toBeDefined();
    });

    const req = httpMock.expectOne(`${service.baseEndpoint}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGrade);
  });

  it('should create a new grade', () => {
    const newGrade = { id: 0, name: 'New Grade', studentId: 1, teacherId: 1, value: 90 };

    service.create(newGrade as any).subscribe(result => {
      expect(result).toBeDefined();
    });

    const req = httpMock.expectOne(service.baseEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(newGrade);
  });

  it('should update existing grade', () => {
    const updatedGrade = { id: 1, name: 'Updated', studentId: 1, teacherId: 1, value: 95 };

    service.update(updatedGrade as any, 1).subscribe(result => {
      expect(result).toBeDefined();
    });

    const req = httpMock.expectOne(`${service.baseEndpoint}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedGrade);
  });

  it('should delete grade by id', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${service.baseEndpoint}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should filter grades by studentId', () => {
    const mockGrades = [
      { id: 1, name: 'Test', studentId: 1, teacherId: 1, value: 85 }
    ];

    service.getByFilters({ studentId: 1 }).subscribe(grades => {
      expect(grades).toBeDefined();
    });

    const req = httpMock.expectOne(`${service.baseEndpoint}/filter?studentId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGrades);
  });
});
