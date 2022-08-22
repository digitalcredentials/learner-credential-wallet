export class HumanReadableError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
