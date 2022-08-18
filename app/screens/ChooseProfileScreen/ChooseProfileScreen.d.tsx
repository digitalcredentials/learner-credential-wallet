import { Profile } from '../../types/profile';

export type { ChooseProfileScreenProps } from '../../navigation';

export type ProfileButtonProps = {
  profile: Profile
  onPress: () => void;
}
