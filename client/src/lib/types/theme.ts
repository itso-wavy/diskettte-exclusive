export const themes = [
  'strawberry',
  'mango',
  'lemon',
  'melon',
  'grape',
  'dragonfruit',
] as const;

export type Theme = (typeof themes)[number];

export type ThemeState = {
  theme: Theme;
  isDarkmode: boolean;
};
