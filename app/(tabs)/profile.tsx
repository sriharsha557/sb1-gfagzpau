import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Shield, Heart, Award, Moon, Palette, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useAuthContext } from '@/components/AuthProvider';

const badges = [
  { id: 1, name: 'Vulnerability Champ', emoji: '💪', description: 'Shared 10 honest entries', earned: true },
  { id: 2, name: 'Daily Feeler', emoji: '📅', description: '7-day tracking streak', earned: true },
  { id: 3, name: 'Reflection Master', emoji: '🧘', description: 'Completed 30 journal entries', earned: false },
  { id: 4, name: 'Courage Warrior', emoji: '⚡', description: 'Used RealTalk mode 5 times', earned: true },
  { id: 5, name: 'Mindful Soul', emoji: '🌸', description: 'Practiced gratitude 20 times', earned: false },
  { id: 6, name: 'Growth Seeker', emoji: '🌱', description: 'Tracked moods for 30 days', earned: false },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuthContext();
  const [nightMode, setNightMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [realTalkReminders, setRealTalkReminders] = useState(true);

  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    { icon: Bell, label: 'Notifications', hasSwitch: true, value: notifications, onToggle: setNotifications },
    { icon: Shield, label: 'Privacy Settings', hasChevron: true },
    { icon: Moon, label: 'Night Mode', hasSwitch: true, value: nightMode, onToggle: setNightMode },
    { icon: Palette, label: 'Theme Customization', hasChevron: true },
    { icon: HelpCircle, label: 'Help & Support', hasChevron: true },
    { icon: Settings, label: 'App Settings', hasChevron: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FF', '#DBEAFE', '#E0F2FE']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subtitle}>Track your emotional journey</Text>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <User size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{user?.user_metadata?.username || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>42</Text>
                <Text style={styles.statLabel}>Days Tracked</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Journal Entries</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3.8</Text>
                <Text style={styles.statLabel}>Avg Mood</Text>
              </View>
            </View>
          </View>

          {/* Courage System - Badges */}
          <View style={styles.badgesContainer}>
            <View style={styles.badgesHeader}>
              <Award size={24} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Courage Badges</Text>
              <Text style={styles.badgeProgress}>{earnedBadges.length}/{totalBadges}</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {badges.map((badge) => (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeCard,
                    !badge.earned && styles.badgeCardLocked
                  ]}
                >
                  <Text style={[
                    styles.badgeEmoji,
                    !badge.earned && styles.badgeEmojiLocked
                  ]}>
                    {badge.earned ? badge.emoji : '🔒'}
                  </Text>
                  <Text style={[
                    styles.badgeName,
                    !badge.earned && styles.badgeNameLocked
                  ]}>
                    {badge.name}
                  </Text>
                  <Text style={[
                    styles.badgeDescription,
                    !badge.earned && styles.badgeDescriptionLocked
                  ]}>
                    {badge.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* RealTalk Settings */}
          <View style={styles.realTalkContainer}>
            <View style={styles.realTalkHeader}>
              <Heart size={20} color="#3B82F6" />
              <Text style={styles.realTalkTitle}>RealTalk Preferences</Text>
            </View>
            <View style={styles.realTalkOption}>
              <Text style={styles.realTalkOptionText}>Gentle reminders to be authentic</Text>
              <Switch
                value={realTalkReminders}
                onValueChange={setRealTalkReminders}
                trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
                thumbColor="white"
              />
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <IconComponent size={20} color="#3B82F6" />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.hasSwitch && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
                        thumbColor="white"
                      />
                    )}
                    {item.hasChevron && (
                      <ChevronRight size={20} color="#A0AEC0" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Encouragement Quote */}
          <View style={styles.encouragementContainer}>
            <Text style={styles.encouragementTitle}>Today's Affirmation</Text>
            <Text style={styles.encouragementText}>
              "You are worthy of love and kindness, especially from yourself. Your journey of self-discovery is beautiful and valid. 💕"
            </Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#E53E3E" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
  },
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
    marginBottom: 20,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
  },
  badgesContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  badgesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 8,
    flex: 1,
  },
  badgeProgress: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#3B82F6',
  },
  badgeCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 120,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#48BB78',
  },
  badgeCardLocked: {
    backgroundColor: '#F7FAFC',
    borderColor: '#E2E8F0',
  },
  badgeEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  badgeEmojiLocked: {
    opacity: 0.5,
  },
  badgeName: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeNameLocked: {
    color: '#A0AEC0',
  },
  badgeDescription: {
    fontSize: 10,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 14,
  },
  badgeDescriptionLocked: {
    color: '#CBD5E0',
  },
  realTalkContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  realTalkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  realTalkTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 8,
  },
  realTalkOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  realTalkOptionText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
    flex: 1,
  },
  menuContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2D3748',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  encouragementContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  encouragementTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  logoutText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#E53E3E',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});