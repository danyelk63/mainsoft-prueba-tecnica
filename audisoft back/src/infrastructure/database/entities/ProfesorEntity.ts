import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GradeEntity } from './GradeEntity';
import { Teacher } from '../../../domain/entities/Teacher';

@Entity('profesor')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => GradeEntity, (grade) => grade.teacher)
  grades?: GradeEntity[];

  toDomain(): Teacher {
    return new Teacher(this.nombre, this.id);
  }

  static fromDomain(teacher: Teacher): TeacherEntity {
    const entity = new TeacherEntity();
    if (teacher.id) entity.id = teacher.id;
    entity.nombre = teacher.name;
    return entity;
  }
}
