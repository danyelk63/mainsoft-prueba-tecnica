import { Teacher } from '../../../domain/entities/Teacher';
import { ITeacherRepository } from '../../../domain/repositories/ITeacherRepository';
import { PaginationResult } from '../../../domain/common/PaginationResult';

export class GetAllTeachersUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(): Promise<Teacher[]> {
    return await this.teacherRepository.findAll();
  }

  async executePaginated(page: number = 1, limit: number = 10): Promise<PaginationResult<Teacher>> {
    return await this.teacherRepository.findAllPaginated(page, limit);
  }
}
