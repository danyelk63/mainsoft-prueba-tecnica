import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  private _dataChange = new Subject<void>();
  public dataChange$ = this._dataChange.asObservable();

  updateDataChange(): void {
    this._dataChange.next(); 
  }
}
