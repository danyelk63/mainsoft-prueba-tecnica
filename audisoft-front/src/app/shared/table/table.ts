import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ITableColumn } from '../models/table.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  imports: [CommonModule, TableModule, ToastModule, PaginatorModule, ButtonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements OnInit {

  @Input() columns: ITableColumn[] = [];
  @Input() httpService: any;
  @Input() service: any;

  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() onRow: EventEmitter<number> = new EventEmitter<number>();

  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  values: any[] = [];

  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  total: number = 0;

  first: number = 0;

  ngOnInit(): void {
    if (this.httpService) {
      this.getAllData();
    }
    
    if (this.service && this.service.dataChange$) {
      this.service.dataChange$.subscribe(() => {
        this.getAllData();
      });
    }
  }

  getAllData() {
    this.httpService.getAll(this.page, this.limit).subscribe({
      next: (values: any) => {
        this.totalPages = values.pagination.totalPages;
        this.total = values.pagination.total;
        this.page = values.pagination.page;
        this.limit = values.pagination.limit;

        if (values.data.length === 0 && this.page > 1 && this.totalPages > 0) {
          this.page = this.totalPages;
          this.first = (this.page - 1) * this.limit;
          this.getAllData();
          return;
        }

        this.values = values.data;
        this.first = (this.page - 1) * this.limit;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar la información' });
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first ?? 0;
    this.limit = event.rows ?? 10;
    this.page = (event.page ?? 0) + 1;
    this.getAllData();
  }

  onClickEdit(id: number, event: any) {
    event.stopPropagation();
    this.onEdit.emit(id);
  }

  onClickDelete(id: number, event: any) {
    event.stopPropagation();
    this.onDelete.emit(id);
  }

  onClickRow(id: number) {
    this.onRow.emit(id);
  }

}
