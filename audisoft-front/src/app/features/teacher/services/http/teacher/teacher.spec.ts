import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTeacherService } from './teacher';

describe('HttpTeacherService', () => {
  let service: HttpTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpTeacherService]
    });
    service = TestBed.inject(HttpTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
