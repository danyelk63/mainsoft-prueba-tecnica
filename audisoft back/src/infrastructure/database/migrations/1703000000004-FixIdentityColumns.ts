import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixIdentityColumns1703000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dbType = queryRunner.connection.driver.options.type;

    if (dbType === 'mssql') {
      await queryRunner.query(`
        IF OBJECT_ID('dbo.grade', 'U') IS NOT NULL
        BEGIN
          ALTER TABLE dbo.grade DROP CONSTRAINT IF EXISTS FK_grade_teacher;
          ALTER TABLE dbo.grade DROP CONSTRAINT IF EXISTS FK_grade_student;
          DROP TABLE dbo.grade;
        END
      `);

      await queryRunner.query(`IF OBJECT_ID('dbo.teacher', 'U') IS NOT NULL DROP TABLE dbo.teacher;`);
      await queryRunner.query(`IF OBJECT_ID('dbo.student', 'U') IS NOT NULL DROP TABLE dbo.student;`);

      await queryRunner.query(`
        CREATE TABLE student (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `);

      await queryRunner.query(`
        CREATE TABLE teacher (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `);

      await queryRunner.query(`
        CREATE TABLE grade (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          teacher_id INT NOT NULL,
          student_id INT NOT NULL,
          value NUMERIC(10,2) NOT NULL,
          CONSTRAINT FK_grade_teacher FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON DELETE NO ACTION ON UPDATE CASCADE,
          CONSTRAINT FK_grade_student FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE NO ACTION ON UPDATE CASCADE
        )
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS grade`);
    await queryRunner.query(`DROP TABLE IF EXISTS teacher`);
    await queryRunner.query(`DROP TABLE IF EXISTS student`);
  }
}
