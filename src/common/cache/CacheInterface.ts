import type { CacheKeysType } from './CacheKeysType';

export interface CacheInterface {

    cache<T>(data: T, keys: CacheKeysType): void;

    get<T>(keys: CacheKeysType): Promise<T | null>;

    purge(keys: CacheKeysType): void;

}