import { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Platform,
  useWindowDimensions,
  SafeAreaView,
  useColorScheme,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { IconProps } from '@expo/vector-icons/build/createIconSet';
import theme from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';

const { colors, spacing, borderRadius, shadows, typography, layout } = theme;

const SIDEBAR_EXPANDED_WIDTH = layout.sidebar.expanded;
const SIDEBAR_COMPACT_WIDTH = layout.sidebar.compact;
const MOBILE_BREAKPOINT = 768;

const PROFILE_IMAGE_URL = "https://tribe-s3-production.imgix.net/WSeqIivOgLQQIEHfdUdq5?fit=max&w=500&auto=compress,format";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge: number | null;
  activeIcon?: keyof typeof Ionicons.glyphMap;
};

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const activeColors = isDark ? colors.dark : colors.light;
  const activeShadows = isDark ? shadows.dark : shadows.light;
  const { width } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_EXPANDED_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(SIDEBAR_EXPANDED_WIDTH)).current;

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = width < MOBILE_BREAKPOINT;
      const shouldExpand = isMobileView || width >= 1024;
      setIsMobile(isMobileView);
      setIsExpanded(shouldExpand);
      
      // Animar a largura da sidebar
      Animated.spring(widthAnim, {
        toValue: shouldExpand ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COMPACT_WIDTH,
        useNativeDriver: false,
        tension: 100,
        friction: 10
      }).start();
    };
    handleResize();
  }, [width]);

  const showSidebar = () => {
    // Primeiro resetamos os valores das animações
    slideAnim.setValue(-SIDEBAR_EXPANDED_WIDTH);
    fadeAnim.setValue(0);
    
    // Depois ativamos a visibilidade
    setIsSidebarVisible(true);
    
    // Pequeno timeout para garantir que o estado foi atualizado
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 12
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    });
  };

  const hideSidebar = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: -SIDEBAR_EXPANDED_WIDTH,
        useNativeDriver: true,
        tension: 80,
        friction: 12
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      })
    ]).start(() => {
      setIsSidebarVisible(false);
    });
  };

  const menuItems: MenuItem[] = [
    { 
      icon: 'home-outline',
      activeIcon: 'home-sharp',
      label: 'Home',
      badge: null 
    },
    { 
      icon: 'stats-chart-outline',
      activeIcon: 'stats-chart',
      label: 'Analytics',
      badge: null 
    },
    { 
      icon: 'card-outline',
      activeIcon: 'card',
      label: 'Cards',
      badge: null 
    },
    { 
      icon: 'paper-plane-outline',
      activeIcon: 'paper-plane',
      label: 'Send',
      badge: null 
    },
    { 
      icon: 'people-outline',
      activeIcon: 'people',
      label: 'Users',
      badge: null 
    },
    { 
      icon: 'folder-outline',
      activeIcon: 'folder',
      label: 'Files',
      badge: 2 
    },
    { 
      icon: 'settings-outline',
      activeIcon: 'settings-sharp',
      label: 'Settings',
      badge: null 
    }
  ];

  const ThemeSwitch = () => {
    return (
      <Pressable 
        onPress={toggleTheme}
        style={[
          styles.themeSwitch,
          isDark && styles.themeSwitchDark
        ]}
      >
        <Animated.View style={[
          styles.themeSwitchKnob,
          {
            transform: [{ translateX: isDark ? 20 : 0 }]
          }
        ]}>
          <Ionicons 
            name={isDark ? 'moon' : 'sunny'} 
            size={14} 
            color={isDark ? activeColors.text : '#FDB813'} 
          />
        </Animated.View>
      </Pressable>
    );
  };

  const SidebarContent = () => (
    <Animated.View style={[
      styles.sidebar,
      { width: isMobile ? SIDEBAR_EXPANDED_WIDTH : widthAnim }
    ]}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="moon" size={26} color="#4B6BFB" />
          </View>
          {isExpanded && (
            <Text style={styles.logoText}>Dashboard</Text>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setActiveItem(index)}
              onHoverIn={() => setHoveredItem(index)}
              onHoverOut={() => setHoveredItem(null)}
              style={({pressed}) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
                hoveredItem === index && styles.menuItemHovered,
                activeItem === index && styles.menuItemActive,
                !isExpanded && styles.menuItemCompact
              ]}
            >
              <View style={[
                styles.menuIconContainer,
                (activeItem === index || hoveredItem === index) && styles.menuIconActive
              ]}>
                <Ionicons 
                  name={activeItem === index ? (item.activeIcon || item.icon) : item.icon}
                  size={22} 
                  color={(activeItem === index || hoveredItem === index) ? "#4B6BFB" : "#64748B"}
                />
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              {isExpanded && (
                <Animated.Text style={[
                  styles.menuText,
                  (activeItem === index || hoveredItem === index) && styles.menuTextActive
                ]}>{item.label}</Animated.Text>
              )}
            </Pressable>
          ))}
        </View>

        {/* Profile Section with Theme Switch */}
        <View style={styles.profileSection}>
          <View style={styles.themeContainer}>
            <ThemeSwitch />
            {isExpanded && (
              <Text style={styles.themeText}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            )}
          </View>
          <Pressable 
            style={({pressed}) => [
              styles.profileContainer,
              pressed && styles.profilePressed
            ]}
          >
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: PROFILE_IMAGE_URL }} 
                style={styles.profileImage}
              />
              <View style={styles.profileStatus} />
            </View>
            {isExpanded && (
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Paulo Morales</Text>
                <Text style={styles.profileRole}>Admin</Text>
              </View>
            )}
          </Pressable>
          
          {isExpanded && (
            <View style={styles.storageContainer}>
              <View style={styles.storageHeader}>
                <View style={styles.storageIcon}>
                  <Ionicons name="cloud-outline" size={18} color="#4B6BFB" />
                </View>
                <Text style={styles.storageText}>Storage</Text>
                <Pressable 
                  style={({pressed}) => [
                    styles.upgradeButton,
                    pressed && styles.upgradeButtonPressed
                  ]}
                >
                  <Text style={styles.upgradeText}>Upgrade</Text>
                </Pressable>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar} />
              </View>
              <Text style={styles.storageInfo}>18.2 GB of 20 GB used</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Animated.View>
  );

  const styles = useMemo(() => StyleSheet.create({
    sidebar: {
      backgroundColor: activeColors.surface,
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: activeColors.divider,
      ...activeShadows.lg,
    } as ViewStyle,
    logoContainer: {
      height: layout.header.height,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: activeColors.divider,
      backgroundColor: activeColors.surface,
      paddingTop: Platform.OS === 'ios' ? spacing.xl : 0,
    } as ViewStyle,
    logo: {
      width: 36,
      height: 36,
      borderRadius: borderRadius.lg,
      backgroundColor: activeColors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    logoText: {
      marginLeft: spacing.md,
      fontSize: typography.sizes['2xl'],
      fontWeight: String(typography.weights.semibold),
      color: activeColors.text,
      letterSpacing: typography.letterSpacing.tighter,
    } as TextStyle,
    menuContainer: {
      flex: 1,
      paddingTop: spacing.md,
      paddingHorizontal: spacing.sm,
    } as ViewStyle,
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 44,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.xs / 2,
      position: 'relative',
      overflow: 'hidden',
    } as ViewStyle,
    menuItemPressed: {
      backgroundColor: activeColors.gray[50],
    } as ViewStyle,
    menuItemHovered: {
      backgroundColor: activeColors.gray[100],
    } as ViewStyle,
    menuItemActive: {
      backgroundColor: activeColors.primaryLight,
    } as ViewStyle,
    menuItemCompact: {
      justifyContent: 'center',
      width: 44,
      height: 44,
      marginHorizontal: spacing.xs + 2,
      borderRadius: borderRadius.lg,
    } as ViewStyle,
    menuIconContainer: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      borderRadius: borderRadius.md,
    } as ViewStyle,
    menuIconActive: {
      backgroundColor: activeColors.primaryLight,
      transform: [{ scale: 1.05 }],
    } as ViewStyle,
    menuText: {
      marginLeft: spacing.md,
      fontSize: typography.sizes.lg,
      fontWeight: String(typography.weights.medium),
      color: activeColors.textSecondary,
      letterSpacing: typography.letterSpacing.tight,
    } as TextStyle,
    menuTextActive: {
      color: activeColors.primary,
      fontWeight: String(typography.weights.semibold),
      transform: [{ translateX: 2 }],
    } as TextStyle,
    badge: {
      position: 'absolute',
      top: -2,
      right: -2,
      backgroundColor: activeColors.primary,
      borderRadius: borderRadius.md,
      minWidth: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: activeColors.surface,
    } as ViewStyle,
    badgeText: {
      color: activeColors.surface,
      fontSize: typography.sizes.xs,
      fontWeight: String(typography.weights.semibold),
    } as TextStyle,
    profileSection: {
      padding: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: activeColors.divider,
    } as ViewStyle,
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
      borderRadius: borderRadius.lg,
    } as ViewStyle,
    profilePressed: {
      backgroundColor: activeColors.gray[50],
    } as ViewStyle,
    profileImageContainer: {
      position: 'relative',
    } as ViewStyle,
    profileImage: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: activeColors.gray[200],
    } as ViewStyle,
    profileStatus: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: activeColors.success,
      borderWidth: 2,
      borderColor: activeColors.surface,
    } as ViewStyle,
    profileInfo: {
      marginLeft: spacing.md,
    } as ViewStyle,
    profileName: {
      fontSize: typography.sizes.md,
      fontWeight: String(typography.weights.semibold),
      color: activeColors.text,
      letterSpacing: typography.letterSpacing.tight,
    } as TextStyle,
    profileRole: {
      fontSize: typography.sizes.sm,
      color: activeColors.textSecondary,
    } as TextStyle,
    storageContainer: {
      marginTop: spacing.lg,
      padding: spacing.lg - 2,
      backgroundColor: activeColors.gray[50],
      borderRadius: borderRadius.lg,
    } as ViewStyle,
    storageHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    } as ViewStyle,
    storageIcon: {
      width: 28,
      height: 28,
      borderRadius: borderRadius.md,
      backgroundColor: activeColors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    storageText: {
      marginLeft: spacing.sm,
      fontSize: typography.sizes.md,
      fontWeight: String(typography.weights.medium),
      color: activeColors.text,
      flex: 1,
      letterSpacing: typography.letterSpacing.tight,
    } as TextStyle,
    upgradeButton: {
      backgroundColor: activeColors.surface,
      paddingHorizontal: spacing.md - 2,
      paddingVertical: spacing.xs + 1,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: activeColors.border,
      ...activeShadows.sm,
    } as ViewStyle,
    upgradeButtonPressed: {
      backgroundColor: activeColors.gray[50],
      borderColor: activeColors.primary,
    } as ViewStyle,
    upgradeText: {
      color: activeColors.primary,
      fontSize: typography.sizes.sm,
      fontWeight: String(typography.weights.medium),
      letterSpacing: typography.letterSpacing.tight,
    } as TextStyle,
    progressBarContainer: {
      height: 5,
      backgroundColor: activeColors.gray[200],
      borderRadius: 2.5,
      marginBottom: spacing.sm,
      overflow: 'hidden',
    } as ViewStyle,
    progressBar: {
      width: '90%',
      height: '100%',
      backgroundColor: activeColors.primary,
      borderRadius: 2.5,
    } as ViewStyle,
    storageInfo: {
      fontSize: typography.sizes.sm,
      color: activeColors.textSecondary,
      letterSpacing: typography.letterSpacing.tight,
    } as TextStyle,
    mobileHeader: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? spacing['3xl'] + spacing.xl : spacing.xl,
      left: spacing.xl,
      right: spacing.xl,
      zIndex: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,
    mobileLogoGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    hamburger: {
      width: 40,
      height: 40,
      backgroundColor: activeColors.surface,
      borderRadius: borderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      ...activeShadows.md,
    } as ViewStyle,
    hamburgerPressed: {
      backgroundColor: activeColors.gray[50],
    } as ViewStyle,
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: activeColors.background + '4D',
      zIndex: 1000,
    } as ViewStyle,
    modalOverlayContent: {
      flex: 1,
    } as ViewStyle,
    modalContent: {
      width: SIDEBAR_EXPANDED_WIDTH,
      height: '100%',
      backgroundColor: activeColors.surface,
    } as ViewStyle,
    themeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.sm,
    } as ViewStyle,
    themeSwitch: {
      width: 44,
      height: 24,
      borderRadius: 12,
      backgroundColor: activeColors.gray[200],
      padding: 2,
    } as ViewStyle,
    themeSwitchDark: {
      backgroundColor: activeColors.gray[700],
    } as ViewStyle,
    themeSwitchKnob: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: activeColors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      ...activeShadows.sm,
    } as ViewStyle,
    themeText: {
      marginLeft: spacing.md,
      fontSize: typography.sizes.sm,
      color: activeColors.textSecondary,
      fontWeight: String(typography.weights.medium),
    } as TextStyle,
  }), [isDark, activeColors, activeShadows]);

  if (isMobile) {
    return (
      <>
        <View style={styles.mobileHeader}>
          <View style={styles.mobileLogoGroup}>
            <View style={styles.logo}>
              <Ionicons name="moon" size={26} color="#4B6BFB" />
            </View>
            <Text style={styles.logoText}>Dashboard</Text>
          </View>

          <Pressable 
            style={({pressed}) => [
              styles.hamburger,
              pressed && styles.hamburgerPressed
            ]}
            onPress={showSidebar}
          >
            <Ionicons name="menu" size={26} color={activeColors.textSecondary} />
          </Pressable>
        </View>
        
        <Animated.View 
          style={[
            styles.modalOverlay,
            { 
              opacity: fadeAnim,
              pointerEvents: isSidebarVisible ? 'auto' : 'none'
            }
          ]}
        >
          <Pressable 
            style={styles.modalOverlayContent}
            onPress={hideSidebar}
          >
            <Animated.View 
              style={[
                styles.modalContent,
                {
                  transform: [{ translateX: slideAnim }]
                }
              ]}
            >
              <Pressable onPress={(e) => e.stopPropagation()}>
                <SidebarContent />
              </Pressable>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </>
    );
  }

  return <SidebarContent />;
} 