import { Student } from '../../../domain/entities/Student';
import { IStudentRepository } from '../../../domain/repositories/IStudentRepository';
import { PaginationResult } from '../../../domain/common/PaginationResult';

export class GetAllStudentsUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }

  async executePaginated(page: number = 1, limit: number = 10): Promise<PaginationResult<Student>> {
    return await this.studentRepository.findAllPaginated(page, limit);
  }
}
