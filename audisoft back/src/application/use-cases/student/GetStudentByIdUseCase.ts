import { Student } from '../../../domain/entities/Student';
import { IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class GetStudentByIdUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: number): Promise<Student | null> {
    return await this.studentRepository.findById(id);
  }
}
