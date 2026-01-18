import { Request, Response } from 'express';
import { StudentRepository } from '../../infrastructure/repositories/StudentRepository';
import { CreateStudentUseCase } from '../../application/use-cases/student/CreateStudentUseCase';
import { GetAllStudentsUseCase } from '../../application/use-cases/student/GetAllStudentsUseCase';
import { GetStudentByIdUseCase } from '../../application/use-cases/student/GetStudentByIdUseCase';
import { UpdateStudentUseCase } from '../../application/use-cases/student/UpdateStudentUseCase';
import { DeleteStudentUseCase } from '../../application/use-cases/student/DeleteStudentUseCase';

export class StudentController {
  private createStudentUseCase: CreateStudentUseCase;
  private getAllStudentsUseCase: GetAllStudentsUseCase;
  private getStudentByIdUseCase: GetStudentByIdUseCase;
  private updateStudentUseCase: UpdateStudentUseCase;
  private deleteStudentUseCase: DeleteStudentUseCase;

  constructor() {
    const studentRepository = new StudentRepository();
    this.createStudentUseCase = new CreateStudentUseCase(studentRepository);
    this.getAllStudentsUseCase = new GetAllStudentsUseCase(studentRepository);
    this.getStudentByIdUseCase = new GetStudentByIdUseCase(studentRepository);
    this.updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
    this.deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }
      const student = await this.createStudentUseCase.execute(name);
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: 'Error creating student' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (req.query.page || req.query.limit) {
        const result = await this.getAllStudentsUseCase.executePaginated(page, limit);
        res.json(result);
      } else {
        const students = await this.getAllStudentsUseCase.execute();
        res.json(students);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error getting students' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      const student = await this.getStudentByIdUseCase.execute(id);
      if (!student) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Error getting student' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }
      const student = await this.updateStudentUseCase.execute(id, name);
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Error updating student' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      await this.deleteStudentUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting student' });
    }
  }
}
