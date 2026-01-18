import { Student } from '../entities/Student';
import { PaginationResult } from '../common/PaginationResult';

export interface IStudentRepository {
  findAll(): Promise<Student[]>;
  findAllPaginated(page: number, limit: number): Promise<PaginationResult<Student>>;
  findById(id: number): Promise<Student | null>;
  create(student: Student): Promise<Student>;
  update(id: number, student: Student): Promise<Student>;
  delete(id: number): Promise<void>;
}
