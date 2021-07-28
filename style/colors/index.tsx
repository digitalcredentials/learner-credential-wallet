enum ThemeColor {
  BackgroundPrimary = 'backgroundPrimary',
  BackgroundSecondary = 'backgroundSecondary',
  ForegroundPrimary = 'foregroundPrimary',
  TextTitle = 'textTitle',
  TextPrimary = 'textPrimary',
  TextSecondary = 'textSecondary',
  IconActive = 'iconActive',
  IconInactive = 'iconInactive',
}

const Theme: {[key in ThemeColor]: string} = {
  [ThemeColor.BackgroundPrimary]: '#1F2937',
  [ThemeColor.BackgroundSecondary]: '#111827',
  [ThemeColor.ForegroundPrimary]: '#384151',
  [ThemeColor.TextTitle]: '#67E8F9',
  [ThemeColor.TextPrimary]: '#F3F4F6',
  [ThemeColor.TextSecondary]: '#D1D5DB',
  [ThemeColor.IconActive]: '#FFF',
  [ThemeColor.IconInactive]: '#9CA3AF',
};

export default Theme;
