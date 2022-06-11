import type RepositoryInterface from '../../common/repository/RepositoryInterface';
import Note from '../entity/Note';

export default interface NotesRepositoryInteface extends RepositoryInterface<Note, number> {

    archiveList(): Promise<Note[]>;

    archive(id: number): Promise<boolean>;

    unarchive(id: number): Promise<boolean>;

}