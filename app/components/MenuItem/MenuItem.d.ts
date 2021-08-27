import { MaterialIcons } from '@expo/vector-icons';

export interface MenuItemProps {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  title: string;
  onPress: () => void;
}
