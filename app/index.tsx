import { View, StyleSheet } from 'react-native';
import Sidebar from '../components/Sidebar';
import theme from '../constants/theme';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();
  const activeColors = isDark ? theme.colors.dark : theme.colors.light;

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <Sidebar />
      <View style={[styles.content, { backgroundColor: activeColors.background }]}>
        {/* Conteúdo do dashboard virá aqui */}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
}); 