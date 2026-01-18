import { Student } from '../../../domain/entities/Student';
import { IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class UpdateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: number, name: string): Promise<Student> {
    const student = new Student(name, id);
    return await this.studentRepository.update(id, student);
  }
}
