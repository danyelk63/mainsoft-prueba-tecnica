import { Teacher } from '../../../domain/entities/Teacher';
import { ITeacherRepository } from '../../../domain/repositories/ITeacherRepository';

export class UpdateTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(id: number, name: string): Promise<Teacher> {
    const teacher = new Teacher(name, id);
    return await this.teacherRepository.update(id, teacher);
  }
}
