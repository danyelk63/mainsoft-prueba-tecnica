import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Drawer {

  private _showDrawer = new Subject<{ show: boolean, title: string, text: string }>();
  public showDrawer$ = this._showDrawer.asObservable();

  updateShowDrawer(options: { show: boolean, title: string, text: string }): void {
    this._showDrawer.next(options); 
  }
  
}
