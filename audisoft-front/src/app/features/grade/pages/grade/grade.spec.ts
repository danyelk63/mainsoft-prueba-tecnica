import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
import { GradeComponent } from './grade';

describe('GradeComponent', () => {
  let component: GradeComponent;
  let fixture: ComponentFixture<GradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeComponent, HttpClientTestingModule],
      providers: [MessageService, ConfirmationService, ChangeDetectorRef]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('id')?.value).toBe(0);
    expect(component.form.get('name')?.value).toBe('');
  });

  it('should have columns defined', () => {
    expect(component.columns.length).toBeGreaterThan(0);
  });

  it('should set visible to true when onAddNew is called', () => {
    component.onAddNew();
    expect(component.visible).toBe(true);
    expect(component.newGrade).toBe(true);
  });

  it('should set visible to false when closeDialog is called', () => {
    component.visible = true;
    component.closeDialog();
    expect(component.visible).toBe(false);
  });
});
