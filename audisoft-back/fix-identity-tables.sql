-- Script para recrear las tablas con IDENTITY configurado correctamente
-- Ejecuta este script en SQL Server Management Studio

-- Eliminar tablas si existen (en orden correcto para respetar foreign keys)
IF OBJECT_ID('dbo.grade', 'U') IS NOT NULL
BEGIN
    ALTER TABLE dbo.grade DROP CONSTRAINT IF EXISTS FK_grade_teacher;
    ALTER TABLE dbo.grade DROP CONSTRAINT IF EXISTS FK_grade_student;
    DROP TABLE dbo.grade;
END

IF OBJECT_ID('dbo.teacher', 'U') IS NOT NULL
    DROP TABLE dbo.teacher;

IF OBJECT_ID('dbo.student', 'U') IS NOT NULL
    DROP TABLE dbo.student;

-- Crear tabla student con IDENTITY
CREATE TABLE student (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear tabla teacher con IDENTITY
CREATE TABLE teacher (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear tabla grade con IDENTITY
CREATE TABLE grade (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    teacher_id INT NOT NULL,
    student_id INT NOT NULL,
    value NUMERIC(10,2) NOT NULL,
    CONSTRAINT FK_grade_teacher FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT FK_grade_student FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE NO ACTION ON UPDATE CASCADE
);

-- Limpiar tabla de migraciones
IF OBJECT_ID('dbo.migrations', 'U') IS NOT NULL
    TRUNCATE TABLE dbo.migrations;
