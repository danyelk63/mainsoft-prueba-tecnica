import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateGradeTable1703000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'grade',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'identity',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'teacher_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'student_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'numeric',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'grade',
      new TableForeignKey({
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teacher',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
        name: 'FK_grade_teacher',
      })
    );

    await queryRunner.createForeignKey(
      'grade',
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
        name: 'FK_grade_student',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('grade');
    if (table) {
      const foreignKeyTeacher = table.foreignKeys.find(
        (fk) => fk.name === 'FK_grade_teacher'
      );
      const foreignKeyStudent = table.foreignKeys.find(
        (fk) => fk.name === 'FK_grade_student'
      );

      if (foreignKeyTeacher) {
        await queryRunner.dropForeignKey('grade', foreignKeyTeacher);
      }
      if (foreignKeyStudent) {
        await queryRunner.dropForeignKey('grade', foreignKeyStudent);
      }
    }

    await queryRunner.dropTable('grade');
  }
}
