import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Cache {
  private static instance?: Cache;

  private storage: Storage;
  private constructor() {
    this.storage = new Storage({
      storageBackend: AsyncStorage,
    });
  }

  async load(key: string, id: string): Promise<unknown> {
    return this.storage.load({ key, id }) || {};
  }

  async store(key: string, id: string, data: unknown): Promise<void> {
    return this.storage.save({ key, id, data, expires: null });
  }

  static getInstance(): Cache {
    if (this.instance === undefined) {
      this.instance = new Cache();
    }
    return this.instance;
  }
}
