const lightColors = {
  // Cores principais
  primary: '#4B6BFB',
  primaryLight: '#EEF2FF',

  // Tons de cinza
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Estados
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Base
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  divider: 'rgba(226, 232, 240, 0.6)',
};

const darkColors = {
  // Cores principais - mantemos a mesma cor primária
  primary: '#4B6BFB',
  primaryLight: '#1D2B66',

  // Tons de cinza invertidos
  gray: {
    50: '#0F172A',
    100: '#1E293B',
    200: '#334155',
    300: '#475569',
    400: '#64748B',
    500: '#94A3B8',
    600: '#CBD5E1',
    700: '#E2E8F0',
    800: '#F1F5F9',
    900: '#F8FAFC',
  },

  // Estados - mantemos as mesmas cores
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Base
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  divider: 'rgba(51, 65, 85, 0.6)',
};

export const colors = {
  light: lightColors,
  dark: darkColors,
};

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  '2xl': 32,
  '3xl': 40,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 10,
  xl: 12,
  full: 9999,
};

export const shadows = {
  light: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 0,
      },
      shadowOpacity: 0.04,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  dark: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 0,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
  },
};

export const typography = {
  sizes: {
    xs: 10,
    sm: 11,
    md: 13,
    lg: 14,
    xl: 16,
    '2xl': 18,
    '3xl': 20,
    '4xl': 24,
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tighter: -0.5,
    tight: -0.3,
    normal: 0,
  },
};

export const layout = {
  sidebar: {
    expanded: 260,
    compact: 72,
  },
  header: {
    height: 72,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  layout,
}; 