import express, { Express } from 'express';
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { sequelize } from './repository';
import { ContactSchema } from './schemas/schema';

import { config } from './config/config';
import { initializeValues } from './repository/initializeValues';

const app: Express = express();

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: ContactSchema,
    graphiql: true,
}));

(async () => {

    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        await initializeValues();
        console.log('⚡️[server]: Connection has been established successfully.');
    } catch (error) {
        console.error('⚡️[server]: Unable to connect to the database:', error);
        return;
    }

    app.listen(config.port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${config.port}`);
    });
})();
