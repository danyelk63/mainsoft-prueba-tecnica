import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { StudentComponent } from './student';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentComponent, HttpClientTestingModule],
      providers: [MessageService, ConfirmationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('id')?.value).toBe(0);
    expect(component.form.get('name')?.value).toBe('');
  });

  it('should have columns configured', () => {
    expect(component.columns).toBeDefined();
    expect(component.columns.length).toBe(2);
  });

  it('should open dialog when onAddNew is called', () => {
    component.onAddNew();
    expect(component.visible).toBe(true);
    expect(component.newStudent).toBe(true);
  });

  it('should close dialog when closeDialog is called', () => {
    component.visible = true;
    component.closeDialog();
    expect(component.visible).toBe(false);
  });
});
