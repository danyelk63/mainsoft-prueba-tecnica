import { Grade } from '../../../domain/entities/Grade';
import { IGradeRepository } from '../../../domain/repositories/IGradeRepository';

export class GetGradeByIdUseCase {
  constructor(private gradeRepository: IGradeRepository) {}

  async execute(id: number): Promise<Grade | null> {
    return await this.gradeRepository.findById(id);
  }
}
