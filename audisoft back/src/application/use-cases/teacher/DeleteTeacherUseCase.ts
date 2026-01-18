import { ITeacherRepository } from '../../../domain/repositories/ITeacherRepository';

export class DeleteTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
