import type { Connection, ResultSetHeader, RowDataPacket } from 'mysql2';
import type { CacheInterface } from '../../common/cache/CacheInterface';
import type { Nullable } from '../../types/Nullable';
import Note from '../entity/Note';
import type NotesRepositoryInteface from './NotesRepositoryInterface';

const TABLE = '`notes`';

interface NoteEntytyInf extends RowDataPacket {
    id: number;
    user_id: number;
    title: string;
    text: string;
}

export const createNote = (data: NoteEntytyInf): Note => {
    return new Note(data.id, data.title, data.text);
}

export const getNewId = (): number => {
    // todo: use more proper id
    return Date.now() - Date.parse('2022-01-01T00:00:00');
}

export default class NotesRepositoryMysql implements NotesRepositoryInteface {

    protected readonly _userId: number;
    protected readonly _connection: Connection;
    protected readonly _cache: Nullable<CacheInterface>;

    constructor(
        usedId: number,
        connection: Connection,
        cache?: CacheInterface,
    ) {
        this._userId = usedId;
        this._connection = connection;
        this._cache = cache || null;
    }

    async getById(id: number): Promise<Nullable<Note>> {
        if (this._cache) {
            const cache = await this._cache.get<NoteEntytyInf>({ TABLE, userId: this._userId, id, archived: false });
            if (cache) {
                return Promise.resolve(createNote(cache))
            }
        }
        return this._connection.promise().execute<NoteEntytyInf[]>(`
            SELECT \`id\`, \`title\`, \`text\` FROM ${TABLE}
            WHERE \`id\` = ? AND \`user_id\` = ? AND is_archived IS FALSE
            LIMIT 1
        `,
        [id, this._userId]
       ).then(([ rows ]) => {
            if (rows.length === 0) {
                return null;
            }
            if (this._cache) {
                this._cache.cache(rows[0], { TABLE, userId: this._userId, id, archived: false })
            }
            return createNote(rows[0]);
       });
    }

    async list(): Promise<Note[]> {
        if (this._cache) {
            const cache = await this._cache.get<NoteEntytyInf[]>({ TABLE, userId: this._userId, archived: false });
            if (cache) {
                return Promise.resolve(cache.map(item => createNote(item)));
            }
        }
        return this._connection.promise().execute<NoteEntytyInf[]>(`
            SELECT \`id\`, \`title\`, \`text\` FROM ${TABLE}
            WHERE \`user_id\` = ? AND is_archived IS FALSE
            #TODO add limit/pagination
            `,
            [this._userId]
        ).then(([ rows ]) => {
            if (this._cache) {
                this._cache.cache(rows, { TABLE, userId: this._userId, archived: false })
            }
            return rows.map(item => createNote(item));
        });
    }

    async create(note: Note): Promise<Note> {
        const id = getNewId();
        return this._connection.promise().execute<ResultSetHeader>(`
            INSERT INTO ${TABLE} SET
                \`user_id\` = ? ,
                \`id\` = ? ,
                \`title\` = ? ,
                \`text\` = ?,
                is_archived = FALSE
            `,
        [this._userId, id, note.getTitle(), note.getText()]
       ).then(([ result ]) => {
            if (!result.affectedRows) {
                throw new Error('Can\'t create note');
            }
            note.setId(id);
            if (this._cache) {
                this._cache.purge({ TABLE, userId: this._userId, archived: false })
            }
            return note;
       });
    }

    async delete(id: number): Promise<boolean> {
        return this._connection.promise().execute<ResultSetHeader>(`
            DELETE FROM ${TABLE}
            WHERE \`id\` = ? AND \`user_id\` = ? AND is_archived iS FALSE
            LIMIT 1
            `,
            [id, this._userId]
        ).then(([ result ]) => {
            if (!result.affectedRows) {
               return false;
            }
            if (this._cache) {
                this._cache.purge({ TABLE, userId: this._userId, archived: false })
            }
            return true;
        });
    }

    async update(note: Note): Promise<Note | false> {
        return this._connection.promise().execute<ResultSetHeader>(`
            UPDATE ${TABLE} SET
                \`title\` = ? ,
                \`text\` = ?
            WHERE \`id\` = ? AND \`user_id\` = ? AND is_archived iS FALSE
            LIMIT 1
            `,
            [note.getTitle(), note.getText(), note.getId(), this._userId]
        ).then(([ result ]) => {
            if (!result.affectedRows) {
                return false;
            }
            if (this._cache) {
                this._cache.purge({ TABLE, userId: this._userId, archived: false })
            }
            return note;
       });
    }

    async archiveList(): Promise<Note[]> {
        if (this._cache) {
            const cache = await this._cache.get<NoteEntytyInf[]>({ TABLE, userId: this._userId, archived: true });
            if (cache) {
                return Promise.resolve(cache.map(item => createNote(item)));
            }
        }
        return this._connection.promise().execute<NoteEntytyInf[]>(`
            SELECT \`id\`, \`title\`, \`text\` FROM ${TABLE}
            WHERE \`user_id\` = ? AND is_archived IS TRUE
            #TODO add limit/pagination
            `,
            [this._userId]
        ).then(([ rows ]) => {
            if (this._cache) {
                this._cache.cache(rows, { TABLE, userId: this._userId, archived: true })
            }
            return rows.map(item => createNote(item));
        });
    }

    async archive(id: number): Promise<boolean> {
        return this._connection.promise().execute<ResultSetHeader>(`
            UPDATE ${TABLE} SET
                is_archived = TRUE
            WHERE \`id\` = ? AND \`user_id\` = ? AND is_archived iS FALSE
            LIMIT 1
            `,
            [id, this._userId]
        ).then(([ result ]) => {
            if (!result.affectedRows) {
                return false;
            }
            if (this._cache) {
                this._cache.purge({ TABLE, userId: this._userId })
            }
            return true;
       });
    }

    async unarchive(id: number): Promise<boolean> {
        return this._connection.promise().execute<ResultSetHeader>(`
            UPDATE ${TABLE} SET
                is_archived = FALSE
            WHERE \`id\` = ? AND \`user_id\` = ? AND is_archived iS TRUE
            LIMIT 1
            `,
            [id, this._userId]
        ).then(([ result ]) => {
            if (!result.affectedRows) {
                return false;
            }
            if (this._cache) {
                this._cache.purge({ TABLE, userId: this._userId })
            }
            return true;
       });
    }

}