import { Profile } from '../../types/profile';

export type ProfileItemProps = {
  profile: Profile;
};

export type ActionModalProps = {
  profile: Profile;
  onRequestClose: () => void;
};
