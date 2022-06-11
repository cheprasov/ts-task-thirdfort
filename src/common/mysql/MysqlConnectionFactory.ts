import mysql, { Connection } from 'mysql2';
import { Nullable } from '../../types/Nullable';

export class MysqlConnectionFactory {

    protected static _connection: Nullable<Connection> = null;

    static create(): Connection {
        if (!this._connection) {
            // todo: move to ENV vars & config
            this._connection = mysql.createConnection({
                host: process.env.MYSQL_HOST || 'localhost',
                port: (process.env.MYSQL_PORT || 3306) as any,
                user:  process.env.MYSQL_USER || 'root',
                password: process.env.MYSQL_PWD || 'mysqlpw',
                database: 'test',
            });
        }
        return this._connection;
    }

}