export const themes = [
  'pink',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'violet',
] as const;

export type Theme = (typeof themes)[number];

export type ThemeState = {
  theme: Theme;
  isDarkmode: boolean;
};
