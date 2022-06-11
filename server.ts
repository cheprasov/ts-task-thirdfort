import express from 'express';
import cors from 'cors';
import { initRoutes } from './src/routers/routes';
import mysql from 'mysql2';

const run = () => {
    const PORT = 3000;

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    initRoutes(app);

    app.listen(PORT, () => {
        console.log(`Service listening at http://localhost:${PORT}`)
    });
}

// I know, this is not good, but just for the task :)

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: (process.env.MYSQL_PORT || 3306) as any,
    user:  process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PWD || 'mysqlpw',
});
connection.execute(`CREATE DATABASE IF NOT EXISTS \`test\``);
connection.execute(`
    CREATE TABLE IF NOT EXISTS \`test\`.\`notes\`  (
        \`user_id\` int NOT NULL,
        \`id\` bigint NOT NULL,
        \`title\` varchar(200) NOT NULL,
        \`text\` text NOT NULL,
        \`is_archived\` tinyint(1) NOT NULL DEFAULT '0',
        PRIMARY KEY (\`user_id\`,\`id\`),
        KEY \`user_id\` (\`user_id\`,\`is_archived\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
`, run);