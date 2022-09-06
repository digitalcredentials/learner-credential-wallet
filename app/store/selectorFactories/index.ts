import { RootState } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectorProps = any;
export type Selector<Props, Return> = (state: RootState, props: Props) => Return; 

export const selectProps = (state: RootState, props: SelectorProps): SelectorProps => props;

export function expectValue<T>(value: T, errorMessage: string): NonNullable<T> {
  if (value !== undefined && value !== null) {
    return value as NonNullable<T>;
  } else {
    throw new Error(errorMessage);
  }
}

export * from './makeSelectDidForCredential';
export * from './makeSelectDidFromProfile';
export * from './makeSelectProfileFromCredential';
export * from './makeSelectProfilesWithCredentials';
