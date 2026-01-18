import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GradeEntity } from './GradeEntity';
import { Teacher } from '../../../domain/entities/Teacher';

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => GradeEntity, (grade) => grade.teacher)
  grades?: GradeEntity[];

  toDomain(): Teacher {
    return new Teacher(this.name, this.id);
  }

  static fromDomain(teacher: Teacher): TeacherEntity {
    const entity = new TeacherEntity();
    if (teacher.id !== undefined && teacher.id !== null) {
      entity.id = teacher.id;
    }
    entity.name = teacher.name;
    return entity;
  }
}
