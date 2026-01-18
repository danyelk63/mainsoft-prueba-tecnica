import { Grade } from '../../../domain/entities/Grade';
import { IGradeRepository } from '../../../domain/repositories/IGradeRepository';
import { PaginationResult } from '../../../domain/common/PaginationResult';

export class GetAllGradesUseCase {
  constructor(private gradeRepository: IGradeRepository) {}

  async execute(): Promise<Grade[]> {
    return await this.gradeRepository.findAll();
  }

  async executePaginated(page: number = 1, limit: number = 10): Promise<PaginationResult<Grade>> {
    return await this.gradeRepository.findAllPaginated(page, limit);
  }
}
