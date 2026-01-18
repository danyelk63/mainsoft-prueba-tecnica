import { Request, Response } from 'express';
import { TeacherRepository } from '../../infrastructure/repositories/TeacherRepository';
import { CreateTeacherUseCase } from '../../application/use-cases/teacher/CreateTeacherUseCase';
import { GetAllTeachersUseCase } from '../../application/use-cases/teacher/GetAllTeachersUseCase';
import { GetTeacherByIdUseCase } from '../../application/use-cases/teacher/GetTeacherByIdUseCase';
import { UpdateTeacherUseCase } from '../../application/use-cases/teacher/UpdateTeacherUseCase';
import { DeleteTeacherUseCase } from '../../application/use-cases/teacher/DeleteTeacherUseCase';

export class TeacherController {
  private createTeacherUseCase: CreateTeacherUseCase;
  private getAllTeachersUseCase: GetAllTeachersUseCase;
  private getTeacherByIdUseCase: GetTeacherByIdUseCase;
  private updateTeacherUseCase: UpdateTeacherUseCase;
  private deleteTeacherUseCase: DeleteTeacherUseCase;

  constructor() {
    const teacherRepository = new TeacherRepository();
    this.createTeacherUseCase = new CreateTeacherUseCase(teacherRepository);
    this.getAllTeachersUseCase = new GetAllTeachersUseCase(teacherRepository);
    this.getTeacherByIdUseCase = new GetTeacherByIdUseCase(teacherRepository);
    this.updateTeacherUseCase = new UpdateTeacherUseCase(teacherRepository);
    this.deleteTeacherUseCase = new DeleteTeacherUseCase(teacherRepository);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }
      const teacher = await this.createTeacherUseCase.execute(name);
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Error creating teacher' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (req.query.page || req.query.limit) {
        const result = await this.getAllTeachersUseCase.executePaginated(page, limit);
        res.json(result);
      } else {
        const teachers = await this.getAllTeachersUseCase.execute();
        res.json(teachers);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error getting teachers' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      const teacher = await this.getTeacherByIdUseCase.execute(id);
      if (!teacher) {
        res.status(404).json({ error: 'Teacher not found' });
        return;
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Error getting teacher' });
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
      const teacher = await this.updateTeacherUseCase.execute(id, name);
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Error updating teacher' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      await this.deleteTeacherUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting teacher' });
    }
  }
}
