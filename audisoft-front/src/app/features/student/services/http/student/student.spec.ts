import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpStudentService } from './student';

describe('HttpStudentService', () => {
  let service: HttpStudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpStudentService]
    });
    service = TestBed.inject(HttpStudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have baseEndpoint set correctly', () => {
    expect(service.baseEndpoint).toContain('/students');
  });

  it('should fetch all students with pagination', () => {
    const mockResponse = {
      data: [{ id: 1, name: 'John Doe' }],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 }
    };

    service.getAll(1, 10).subscribe(response => {
      expect(response.data.length).toBe(1);
      expect(response.pagination.page).toBe(1);
    });

    const req = httpMock.expectOne(`${service.baseEndpoint}?page=1&limit=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get student by id', () => {
    const mockStudent = { id: 1, name: 'John Doe' };

    service.getById(1).subscribe(student => {
      expect(student.id).toBe(1);
      expect(student.name).toBe('John Doe');
    });

    const req = httpMock.expectOne(`${service.baseEndpoint}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudent);
  });

  it('should create new student', () => {
    const newStudent = { id: 0, name: 'Jane Doe' };

    service.create(newStudent as any).subscribe(result => {
      expect(result).toBeDefined();
    });

    const req = httpMock.expectOne(service.baseEndpoint);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newStudent);
    req.flush(newStudent);
  });

  it('should update existing student', () => {
    const updatedStudent = { id: 1, name: 'Updated Name' };

    service.update(updatedStudent as any, 1).subscribe(result => {
      expect(result).toBeDefined();
    });

    const req = httpMock.expectOne(`${service.baseEndpoint}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedStudent);
  });

  it('should delete student by id', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${service.baseEndpoint}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should use default pagination values when not provided', () => {
    const mockResponse = {
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };

    service.getAll().subscribe();

    const req = httpMock.expectOne(`${service.baseEndpoint}?page=1&limit=10`);
    req.flush(mockResponse);
  });
});
