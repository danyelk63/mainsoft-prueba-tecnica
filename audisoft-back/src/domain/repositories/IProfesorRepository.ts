import { Teacher } from '../entities/Teacher';
import { PaginationResult } from '../common/PaginationResult';

export interface ITeacherRepository {
  findAll(): Promise<Teacher[]>;
  findAllPaginated(page: number, limit: number): Promise<PaginationResult<Teacher>>;
  findById(id: number): Promise<Teacher | null>;
  create(teacher: Teacher): Promise<Teacher>;
  update(id: number, teacher: Teacher): Promise<Teacher>;
  delete(id: number): Promise<void>;
}
