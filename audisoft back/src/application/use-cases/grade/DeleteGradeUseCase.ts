import { IGradeRepository } from '../../../domain/repositories/IGradeRepository';

export class DeleteGradeUseCase {
  constructor(private gradeRepository: IGradeRepository) {}

  async execute(id: number): Promise<void> {
    await this.gradeRepository.delete(id);
  }
}
