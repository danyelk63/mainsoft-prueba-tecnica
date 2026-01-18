import { Teacher } from '../../../domain/entities/Teacher';
import { ITeacherRepository } from '../../../domain/repositories/ITeacherRepository';

export class CreateTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(name: string): Promise<Teacher> {
    const teacher = new Teacher(name);
    return await this.teacherRepository.create(teacher);
  }
}
