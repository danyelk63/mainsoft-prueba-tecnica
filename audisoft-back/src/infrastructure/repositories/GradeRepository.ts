import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Grade } from '../../domain/entities/Grade';
import { IGradeRepository } from '../../domain/repositories/IGradeRepository';
import { PaginationResult } from '../../domain/common/PaginationResult';
import { GradeEntity } from '../database/entities/GradeEntity';

export class GradeRepository implements IGradeRepository {
  private repository: Repository<GradeEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(GradeEntity);
  }

  async findAll(): Promise<Grade[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginationResult<Grade>> {
    const skip = (page - 1) * limit;
    const [entities, total] = await this.repository.findAndCount({
      skip,
      take: limit,
    });
    
    const data = entities.map((entity) => entity.toDomain());
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: number): Promise<Grade | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async findByStudentId(studentId: number): Promise<Grade[]> {
    const entities = await this.repository.find({ where: { studentId } });
    return entities.map((entity) => entity.toDomain());
  }

  async findByTeacherId(teacherId: number): Promise<Grade[]> {
    const entities = await this.repository.find({ where: { teacherId } });
    return entities.map((entity) => entity.toDomain());
  }

  async findByStudentAndTeacherId(studentId: number, teacherId: number): Promise<Grade[]> {
    const entities = await this.repository.find({ 
      where: { 
        studentId,
        teacherId
      } 
    });
    return entities.map((entity) => entity.toDomain());
  }

  async create(grade: Grade): Promise<Grade> {
    const result = await this.repository.insert({
      name: grade.name,
      teacherId: grade.teacherId,
      studentId: grade.studentId,
      value: grade.value
    });
    const id = result.identifiers[0].id;
    const savedEntity = await this.repository.findOne({ where: { id } });
    return savedEntity!.toDomain();
  }

  async update(id: number, grade: Grade): Promise<Grade> {
    const entity = GradeEntity.fromDomain(grade);
    entity.id = id;
    const updatedEntity = await this.repository.save(entity);
    return updatedEntity.toDomain();
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
