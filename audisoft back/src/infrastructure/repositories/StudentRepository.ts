import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Student } from '../../domain/entities/Student';
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { PaginationResult } from '../../domain/common/PaginationResult';
import { StudentEntity } from '../database/entities/StudentEntity';

export class StudentRepository implements IStudentRepository {
  private repository: Repository<StudentEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(StudentEntity);
  }

  async findAll(): Promise<Student[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginationResult<Student>> {
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

  async findById(id: number): Promise<Student | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async create(student: Student): Promise<Student> {
    const result = await this.repository.insert({
      name: student.name
    });
    const id = result.identifiers[0].id;
    const savedEntity = await this.repository.findOne({ where: { id } });
    return savedEntity!.toDomain();
  }

  async update(id: number, student: Student): Promise<Student> {
    const entity = StudentEntity.fromDomain(student);
    entity.id = id;
    const updatedEntity = await this.repository.save(entity);
    return updatedEntity.toDomain();
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
