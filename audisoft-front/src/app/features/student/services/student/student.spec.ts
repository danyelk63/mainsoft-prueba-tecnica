import { TestBed } from '@angular/core/testing';
import { StudentService } from './student';
import { take } from 'rxjs';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose dataChange$ observable', () => {
    expect(service.dataChange$).toBeDefined();
  });

  it('should emit event when updateDataChange is called', () => {
    let emitted = false;
    service.dataChange$.pipe(take(1)).subscribe(() => {
      emitted = true;
    });
    service.updateDataChange();
    expect(emitted).toBe(true);
  });

  it('should handle multiple update calls', () => {
    let emissions = 0;
    const subscription = service.dataChange$.subscribe(() => {
      emissions++;
    });
    service.updateDataChange();
    service.updateDataChange();
    service.updateDataChange();
    expect(emissions).toBe(3);
    subscription.unsubscribe();
  });
});
