import { Grade } from '../../../domain/entities/Grade';
import { IGradeRepository } from '../../../domain/repositories/IGradeRepository';

export class GetGradesByStudentOrTeacherUseCase {
  constructor(private gradeRepository: IGradeRepository) {}

  async execute(studentId?: number, teacherId?: number): Promise<Grade[]> {
    if (studentId && teacherId) {
      return await this.gradeRepository.findByStudentAndTeacherId(studentId, teacherId);
    }
    
    if (studentId) {
      return await this.gradeRepository.findByStudentId(studentId);
    }
    
    if (teacherId) {
      return await this.gradeRepository.findByTeacherId(teacherId);
    }
    
    throw new Error('Either studentId or teacherId must be provided');
  }
}
