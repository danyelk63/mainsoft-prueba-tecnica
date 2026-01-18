import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Teacher } from '../../domain/entities/Teacher';
import { ITeacherRepository } from '../../domain/repositories/ITeacherRepository';
import { PaginationResult } from '../../domain/common/PaginationResult';
import { TeacherEntity } from '../database/entities/TeacherEntity';

export class TeacherRepository implements ITeacherRepository {
  private repository: Repository<TeacherEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(TeacherEntity);
  }

  async findAll(): Promise<Teacher[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginationResult<Teacher>> {
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

  async findById(id: number): Promise<Teacher | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async create(teacher: Teacher): Promise<Teacher> {
    const result = await this.repository.insert({
      name: teacher.name
    });
    const id = result.identifiers[0].id;
    const savedEntity = await this.repository.findOne({ where: { id } });
    return savedEntity!.toDomain();
  }

  async update(id: number, teacher: Teacher): Promise<Teacher> {
    const entity = TeacherEntity.fromDomain(teacher);
    entity.id = id;
    const updatedEntity = await this.repository.save(entity);
    return updatedEntity.toDomain();
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
