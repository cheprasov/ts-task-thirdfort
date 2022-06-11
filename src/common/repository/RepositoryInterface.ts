import EntityInterface from './EntityInterface';

import type { Nullable } from '../../types/Nullable';

export default interface RepositoryInterface<E extends EntityInterface<T>, T> {

    getById(id: T): Promise<Nullable<E>>;

    list(): Promise<E[]>;

    create(entity: E): Promise<E>;

    delete(id: T): Promise<boolean>;

    update(entity: E): Promise<E | false>;

}