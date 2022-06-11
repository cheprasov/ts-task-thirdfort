import { MysqlConnectionFactory } from '../../common/mysql/MysqlConnectionFactory';
import NotesRepositoryInteface from './NotesRepositoryInterface';
import NotesRepositoryMysql from './NotesRepositoryMysql';

export class NotesRepositoryFactory {

    static create(userId: number): NotesRepositoryInteface {
        return new NotesRepositoryMysql(
            userId,
            MysqlConnectionFactory.create(),
        );
    }

}