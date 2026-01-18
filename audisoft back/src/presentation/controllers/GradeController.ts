import { Request, Response } from 'express';
import { GradeRepository } from '../../infrastructure/repositories/GradeRepository';
import { TeacherRepository } from '../../infrastructure/repositories/TeacherRepository';
import { StudentRepository } from '../../infrastructure/repositories/StudentRepository';
import { CreateGradeUseCase } from '../../application/use-cases/grade/CreateGradeUseCase';
import { GetAllGradesUseCase } from '../../application/use-cases/grade/GetAllGradesUseCase';
import { GetGradeByIdUseCase } from '../../application/use-cases/grade/GetGradeByIdUseCase';
import { UpdateGradeUseCase } from '../../application/use-cases/grade/UpdateGradeUseCase';
import { DeleteGradeUseCase } from '../../application/use-cases/grade/DeleteGradeUseCase';
import { GetGradesByStudentOrTeacherUseCase } from '../../application/use-cases/grade/GetGradesByStudentOrTeacherUseCase';

export class GradeController {
  private createGradeUseCase: CreateGradeUseCase;
  private getAllGradesUseCase: GetAllGradesUseCase;
  private getGradeByIdUseCase: GetGradeByIdUseCase;
  private updateGradeUseCase: UpdateGradeUseCase;
  private deleteGradeUseCase: DeleteGradeUseCase;
  private getGradesByStudentOrTeacherUseCase: GetGradesByStudentOrTeacherUseCase;

  constructor() {
    const gradeRepository = new GradeRepository();
    const teacherRepository = new TeacherRepository();
    const studentRepository = new StudentRepository();
    this.createGradeUseCase = new CreateGradeUseCase(
      gradeRepository,
      teacherRepository,
      studentRepository
    );
    this.getAllGradesUseCase = new GetAllGradesUseCase(gradeRepository);
    this.getGradeByIdUseCase = new GetGradeByIdUseCase(gradeRepository);
    this.updateGradeUseCase = new UpdateGradeUseCase(
      gradeRepository,
      teacherRepository,
      studentRepository
    );
    this.deleteGradeUseCase = new DeleteGradeUseCase(gradeRepository);
    this.getGradesByStudentOrTeacherUseCase = new GetGradesByStudentOrTeacherUseCase(gradeRepository);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, teacherId, studentId, value } = req.body;
      if (!name || !teacherId || !studentId || value === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }
      const grade = await this.createGradeUseCase.execute(
        name,
        teacherId,
        studentId,
        value
      );
      res.status(201).json(grade);
    } catch (error: any) {
      if (error.message === 'Teacher not found' || error.message === 'Student not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Error creating grade' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (req.query.page || req.query.limit) {
        const result = await this.getAllGradesUseCase.executePaginated(page, limit);
        res.json(result);
      } else {
        const grades = await this.getAllGradesUseCase.execute();
        res.json(grades);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error getting grades' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      const grade = await this.getGradeByIdUseCase.execute(id);
      if (!grade) {
        res.status(404).json({ error: 'Grade not found' });
        return;
      }
      res.json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Error getting grade' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { name, teacherId, studentId, value } = req.body;
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      if (!name || !teacherId || !studentId || value === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }
      const grade = await this.updateGradeUseCase.execute(
        id,
        name,
        teacherId,
        studentId,
        value
      );
      res.json(grade);
    } catch (error: any) {
      if (error.message === 'Teacher not found' || error.message === 'Student not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Error updating grade' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      await this.deleteGradeUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting grade' });
    }
  }

  async getByStudentOrTeacher(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.query.studentId ? parseInt(req.query.studentId as string) : undefined;
      const teacherId = req.query.teacherId ? parseInt(req.query.teacherId as string) : undefined;

      if (!studentId && !teacherId) {
        res.status(400).json({ error: 'Either studentId or teacherId must be provided' });
        return;
      }

      if (studentId && isNaN(studentId)) {
        res.status(400).json({ error: 'Invalid studentId' });
        return;
      }

      if (teacherId && isNaN(teacherId)) {
        res.status(400).json({ error: 'Invalid teacherId' });
        return;
      }

      const grades = await this.getGradesByStudentOrTeacherUseCase.execute(studentId, teacherId);
      res.json(grades);
    } catch (error: any) {
      if (error.message === 'Either studentId or teacherId must be provided') {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Error getting grades' });
    }
  }
}
