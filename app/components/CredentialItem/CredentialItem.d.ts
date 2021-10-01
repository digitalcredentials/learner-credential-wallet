export type CredentialItemProps = {
  title: string;
  subtitle: string;
  onSelect: () => void;
  image?: ImageSourcePropType;
  checkable?: boolean;
  selected?: boolean;
  bottomElement?: React.ReactNode;
}
