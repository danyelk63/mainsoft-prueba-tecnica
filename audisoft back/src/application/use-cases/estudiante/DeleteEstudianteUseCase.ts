import { IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class DeleteStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
