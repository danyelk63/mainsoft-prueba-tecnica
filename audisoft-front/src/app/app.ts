import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Drawer } from './core/services/drawer/drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, DrawerModule, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected readonly title = signal('audisoft-front');

  private drawerService = inject(Drawer);
  private cdr = inject(ChangeDetectorRef);

  visible: boolean = false;
  titleDrawer: string = '';
  text: string = '';

  ngOnInit(): void {
    this.drawerService.showDrawer$.subscribe((options) => {
      this.visible = options.show;
      this.titleDrawer = options.title;
      this.text = options.text;
      this.cdr.detectChanges();
    });
  }
}
