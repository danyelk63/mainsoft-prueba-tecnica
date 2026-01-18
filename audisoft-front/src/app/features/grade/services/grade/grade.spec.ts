import { TestBed } from '@angular/core/testing';
import { GradeService } from './grade';
import { take } from 'rxjs';

describe('GradeService', () => {
  let service: GradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have dataChange$ observable', () => {
    expect(service.dataChange$).toBeDefined();
  });

  it('should emit when updateDataChange is called', () => {
    let emitted = false;
    service.dataChange$.pipe(take(1)).subscribe(() => {
      emitted = true;
    });
    service.updateDataChange();
    expect(emitted).toBe(true);
  });

  it('should update data change multiple times', () => {
    let count = 0;
    service.dataChange$.subscribe(() => {
      count++;
    });
    service.updateDataChange();
    service.updateDataChange();
    expect(count).toBe(2);
  });
});
