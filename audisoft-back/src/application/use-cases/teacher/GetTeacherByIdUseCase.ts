import { Teacher } from '../../../domain/entities/Teacher';
import { ITeacherRepository } from '../../../domain/repositories/ITeacherRepository';

export class GetTeacherByIdUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(id: number): Promise<Teacher | null> {
    return await this.teacherRepository.findById(id);
  }
}
