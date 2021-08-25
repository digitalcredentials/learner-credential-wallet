import { HeaderProps } from 'react-native-elements';

export interface NavHeaderProps extends HeaderProps {
  title: string;
  goBack: () => void;
}
