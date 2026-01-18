import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GradeEntity } from './GradeEntity';
import { Student } from '../../../domain/entities/Student';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => GradeEntity, (grade) => grade.student)
  grades?: GradeEntity[];

  toDomain(): Student {
    return new Student(this.name, this.id);
  }

  static fromDomain(student: Student): StudentEntity {
    const entity = new StudentEntity();
    if (student.id !== undefined && student.id !== null) {
      entity.id = student.id;
    }
    entity.name = student.name;
    return entity;
  }
}
