-- Script para limpiar las migraciones y tablas existentes
-- Ejecuta este script en SQL Server Management Studio antes de ejecutar las migraciones

-- Eliminar las tablas con foreign keys primero
IF OBJECT_ID('dbo.grade', 'U') IS NOT NULL
BEGIN
    ALTER TABLE dbo.grade DROP CONSTRAINT IF EXISTS FK_grade_teacher;
    ALTER TABLE dbo.grade DROP CONSTRAINT IF EXISTS FK_grade_student;
    DROP TABLE dbo.grade;
END

-- Eliminar las otras tablas
IF OBJECT_ID('dbo.teacher', 'U') IS NOT NULL
    DROP TABLE dbo.teacher;

IF OBJECT_ID('dbo.student', 'U') IS NOT NULL
    DROP TABLE dbo.student;

-- Limpiar la tabla de migraciones
IF OBJECT_ID('dbo.migrations', 'U') IS NOT NULL
    TRUNCATE TABLE dbo.migrations;
