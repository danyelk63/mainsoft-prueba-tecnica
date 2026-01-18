import { Student } from '../../../domain/entities/Student';
import { IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class CreateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(name: string): Promise<Student> {
    const student = new Student(name);
    return await this.studentRepository.create(student);
  }
}
