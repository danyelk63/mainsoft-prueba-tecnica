import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StudentEntity } from './StudentEntity';
import { TeacherEntity } from './TeacherEntity';
import { Grade } from '../../../domain/entities/Grade';

@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'teacher_id' })
  teacherId!: number;

  @Column({ name: 'student_id' })
  studentId!: number;

  @Column()
  value!: number;

  @ManyToOne(() => TeacherEntity, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher?: TeacherEntity;

  @ManyToOne(() => StudentEntity, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student?: StudentEntity;

  toDomain(): Grade {
    return new Grade(
      this.name,
      this.teacherId,
      this.studentId,
      this.value,
      this.id
    );
  }

  static fromDomain(grade: Grade): GradeEntity {
    const entity = new GradeEntity();
    if (grade.id !== undefined && grade.id !== null) {
      entity.id = grade.id;
    }
    entity.name = grade.name;
    entity.teacherId = grade.teacherId;
    entity.studentId = grade.studentId;
    entity.value = grade.value;
    return entity;
  }
}
