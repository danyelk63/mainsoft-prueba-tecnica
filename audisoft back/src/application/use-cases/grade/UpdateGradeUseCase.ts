import { Grade } from '../../../domain/entities/Grade';
import { IGradeRepository } from '../../../domain/repositories/IGradeRepository';
import { ITeacherRepository } from '../../../domain/repositories/ITeacherRepository';
import { IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class UpdateGradeUseCase {
  constructor(
    private gradeRepository: IGradeRepository,
    private teacherRepository: ITeacherRepository,
    private studentRepository: IStudentRepository
  ) {}

  async execute(
    id: number,
    name: string,
    teacherId: number,
    studentId: number,
    value: number
  ): Promise<Grade> {
    const teacher = await this.teacherRepository.findById(teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const grade = new Grade(name, teacherId, studentId, value, id);
    return await this.gradeRepository.update(id, grade);
  }
}
