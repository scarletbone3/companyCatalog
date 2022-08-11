import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 8080,
    db_host: process.env.DB_HOST || 'localhost',
    db_port: process.env.DB_PORT || '5432',
    db_database: process.env.DB_DATABASE || 'catalog',
    db_user: 'postgres',
    db_password: process.env.DB_PASSWORD || '112263',
}
