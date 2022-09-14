const FALLBACK_ERROR_MESSAGE = 'Something went wrong';

export class HumanReadableError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'HumanReadableError';
  }
}

function isHumanReadableError(err: unknown): err is HumanReadableError {
  return (err as Error).name === HumanReadableError.name;
}

export function errorMessageFrom(err: unknown, fallback = FALLBACK_ERROR_MESSAGE): string {
  if (isHumanReadableError(err)) {
    return err.message;
  } else {
    console.error(err);
    return fallback;
  }
}

export function errorMessageIncludes(err: unknown, message: string): boolean {
  return (err as Error).message.includes(message);
}
