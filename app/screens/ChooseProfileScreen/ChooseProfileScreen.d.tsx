import { ProfileRecordRaw } from '../../model';

export type { ChooseProfileScreenProps } from '../../navigation';

export type ProfileButtonProps = {
  rawProfileRecord: ProfileRecordRaw
  onPress: () => void;
}
