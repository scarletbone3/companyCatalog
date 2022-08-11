import { Sequelize } from 'sequelize';

import { config } from '../config/config';

const db: string = `postgresql://${config.db_user}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_database}`;
export const sequelize = new Sequelize(db);
