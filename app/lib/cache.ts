export class Cache {
  private static instance?: Cache;
  static getInstance(): Cache {
    if (this.instance === undefined) {
      this.instance = new Cache();
    }
    return this.instance;
  }
  async load(id: string): Promise<unknown> {
    return '';
  }

  async store(id: string, data: unknown): Promise<boolean> {
    return true;
  }
}