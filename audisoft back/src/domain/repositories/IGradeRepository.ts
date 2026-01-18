import { Grade } from '../entities/Grade';
import { PaginationResult } from '../common/PaginationResult';

export interface IGradeRepository {
  findAll(): Promise<Grade[]>;
  findAllPaginated(page: number, limit: number): Promise<PaginationResult<Grade>>;
  findById(id: number): Promise<Grade | null>;
  findByStudentId(studentId: number): Promise<Grade[]>;
  findByTeacherId(teacherId: number): Promise<Grade[]>;
  findByStudentAndTeacherId(studentId: number, teacherId: number): Promise<Grade[]>;
  create(grade: Grade): Promise<Grade>;
  update(id: number, grade: Grade): Promise<Grade>;
  delete(id: number): Promise<void>;
}
