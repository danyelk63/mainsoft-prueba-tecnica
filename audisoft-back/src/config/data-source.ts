import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || 'YourStrong!Passw0rd',
  database: process.env.DB_DATABASE || 'audisoft_db',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true,
  },
  entities: [
    process.env.NODE_ENV === 'production'
      ? 'dist/infrastructure/database/entities/**/*.js'
      : 'src/infrastructure/database/entities/**/*.ts',
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/infrastructure/database/migrations/**/*.js'
      : 'src/infrastructure/database/migrations/**/*.ts',
  ],
  subscribers: [
    process.env.NODE_ENV === 'production'
      ? 'dist/infrastructure/database/subscribers/**/*.js'
      : 'src/infrastructure/database/subscribers/**/*.ts',
  ],
});
