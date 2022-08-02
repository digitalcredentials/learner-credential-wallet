export type CredentialItemProps = {
  title: string;
  subtitle: string;
  onSelect: () => void;
  image?: ImageSourcePropType;
  checkable?: boolean;
  selected?: boolean;
  chevron?: boolean;
  bottomElement?: React.ReactNode;
  hideLeft?: boolean
}
