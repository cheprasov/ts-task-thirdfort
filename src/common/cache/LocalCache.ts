import { CacheInterface } from './CacheInterface';
import type { CacheKeysType } from './CacheKeysType';

export class LocalCache implements CacheInterface {

    cache<T>(data: T, keys: CacheKeysType): void {
        // todo: impement
    };

    get<T>(keys: CacheKeysType): T | null {
        // todo: impement
        return null;
    };

    purge(keys: CacheKeysType): void {
        // todo: impement
    };

}