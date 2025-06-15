import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Sparkles,
  Shield,
  CreditCard as Edit3,
  Users,
  Globe,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMoodTypes } from '@/hooks/useMoodTypes';
import { useMoodEntries } from '@/hooks/useMoodEntries';
import { useVisibilityLevels } from '@/hooks/useVisibilityLevels';
import { useAuthContext } from '@/components/AuthProvider';

const { width } = Dimensions.get('window');

// Heart-shaped mood images matching the provided images
const moodImages = {
  happy: require('../../assets/images/moods/happy.png'),
  excited: require('../../assets/images/moods/excited.png'),
  playful: require('../../assets/images/moods/loving.png'),
  angry: require('../../assets/images/moods/angry.png'),
  sad: require('../../assets/images/moods/sad.png'),
  surprised: require('../../assets/images/moods/confused.png'),
  tired: require('../../assets/images/moods/tired.png'),
  silly: require('../../assets/images/moods/anxious.png'),
};

export default function HomeScreen() {
  const { user } = useAuthContext();
  const { moodTypes, loading: moodTypesLoading } = useMoodTypes();
  const { visibilityLevels, loading: visibilityLoading } =
    useVisibilityLevels();
    const { createMoodEntry } = useMoodEntries() as any;

  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [realTalkMode, setRealTalkMode] = useState(false);
  const [moodIntensity, setMoodIntensity] = useState(3);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleMoodSelection = (moodId: number) => {
    setSelectedMood(moodId);
  };

  const handleIntensityChange = (level: number) => {
    setMoodIntensity(level);
  };

  const handleRealTalkToggle = () => {
    setRealTalkMode(!realTalkMode);
  };

  const handleSharingOption = async (
    visibilityType: 'private' | 'friends' | 'public'
  ) => {
    if (!selectedMood) return;

    // Find the appropriate visibility level ID
    let visibilityId: number | undefined;
    if (visibilityType === 'private') {
      visibilityId = visibilityLevels.find((v) =>
        v.level_name.toLowerCase().includes('private')
      )?.id;
    } else if (visibilityType === 'friends') {
      visibilityId = visibilityLevels.find((v) =>
        v.level_name.toLowerCase().includes('friend')
      )?.id;
    } else {
      visibilityId = visibilityLevels.find((v) =>
        v.level_name.toLowerCase().includes('public')
      )?.id;
    }

    try {
      const { data, error } = await createMoodEntry(
        selectedMood,
        undefined, // No journal text for now
        visibilityId,
        realTalkMode
      );

      if (error) {
        Alert.alert('Error', error);
      } else {
        Alert.alert('Success', 'Your mood has been saved!');
        // Reset form
        setSelectedMood(null);
        setMoodIntensity(3);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to save mood entry');
    }
  };

  const renderMoodCard = (mood: any, index: number) => {
    const isSelected = selectedMood === mood.id;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.moodCard,
          isSelected && styles.moodCardSelected,
          { backgroundColor: isSelected ? '#3B82F640' : 'white' },
        ]}
        onPress={() => handleMoodSelection(mood.id)}
        activeOpacity={0.7}
      >
        {/* Mood images */}
        <View style={styles.moodIconContainer}>
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
        </View>
        <Text style={styles.moodLabel}>{mood.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderIntensityDot = (level: number) => (
    <TouchableOpacity
      key={level}
      style={[
        styles.intensityDot,
        moodIntensity >= level && styles.intensityDotActive,
      ]}
      onPress={() => handleIntensityChange(level)}
      activeOpacity={0.7}
    />
  );

  if (moodTypesLoading || visibilityLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#EBF8FF', '#DBEAFE', '#E0F2FE']}
          style={styles.gradient}
        >
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FF', '#DBEAFE', '#E0F2FE']}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good morning! ☀️</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>

          {/* RealTalk Toggle */}
          <View style={styles.realTalkContainer}>
            <View style={styles.realTalkHeader}>
              <Shield size={20} color="#3B82F6" />
              <Text style={styles.realTalkTitle}>RealTalk Mode</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, realTalkMode && styles.toggleActive]}
              onPress={handleRealTalkToggle}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggleThumb,
                  realTalkMode && styles.toggleThumbActive,
                ]}
              />
            </TouchableOpacity>
          </View>

          {realTalkMode && (
            <View style={styles.realTalkMessage}>
              <Text style={styles.realTalkText}>
                Safe space activated. Express your true feelings without
                judgment. 💙
              </Text>
            </View>
          )}

          {/* Mood Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.question}>How are you feeling right now?</Text>
            <Text style={styles.subQuestion}>
              Choose what resonates with you
            </Text>
          </View>

          {/* Mood Grid */}
          <View style={styles.moodGrid}>
            {moodTypes.map((mood, index) => renderMoodCard(mood, index))}
          </View>

          {/* Intensity Slider */}
          {selectedMood && (
            <View style={styles.intensityContainer}>
              <Text style={styles.intensityTitle}>
                How intense is this feeling?
              </Text>
              <View style={styles.intensitySlider}>
                {[1, 2, 3, 4, 5].map((level) => renderIntensityDot(level))}
              </View>
              <View style={styles.intensityLabels}>
                <Text style={styles.intensityLabel}>Mild</Text>
                <Text style={styles.intensityLabel}>Intense</Text>
              </View>
            </View>
          )}

          {/* Emotional Sharing Options */}
          {selectedMood && (
            <View style={styles.sharingContainer}>
              <Text style={styles.sharingTitle}>
                Share your emotions with...
              </Text>
              <Text style={styles.sharingSubtitle}>
                Choose how you'd like to express yourself
              </Text>

              <View style={styles.sharingOptions}>
                <TouchableOpacity
                  style={styles.sharingOption}
                  onPress={() => handleSharingOption('private')}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.sharingIconContainer,
                      { backgroundColor: '#E6FFFA' },
                    ]}
                  >
                    <Edit3 size={24} color="#38B2AC" />
                  </View>
                  <View style={styles.sharingContent}>
                    <Text style={styles.sharingOptionTitle}>
                      📝 Just for Me
                    </Text>
                    <Text style={styles.sharingOptionDescription}>
                      Privately reflect and keep it with yourself
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sharingOption}
                  onPress={() => handleSharingOption('friends')}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.sharingIconContainer,
                      { backgroundColor: '#EBF8FF' },
                    ]}
                  >
                    <Users size={24} color="#3B82F6" />
                  </View>
                  <View style={styles.sharingContent}>
                    <Text style={styles.sharingOptionTitle}>
                      👥 Close Circle
                    </Text>
                    <Text style={styles.sharingOptionDescription}>
                      Share with your trusted friends only
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sharingOption}
                  onPress={() => handleSharingOption('public')}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.sharingIconContainer,
                      { backgroundColor: '#F0FFF4' },
                    ]}
                  >
                    <Globe size={24} color="#48BB78" />
                  </View>
                  <View style={styles.sharingContent}>
                    <Text style={styles.sharingOptionTitle}>
                      🌍 Open to All
                    </Text>
                    <Text style={styles.sharingOptionDescription}>
                      Let others feel and respond to your emotion
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Today's Encouragement */}
          <View style={styles.encouragementCard}>
            <Text style={styles.encouragementTitle}>
              Today's Gentle Reminder
            </Text>
            <Text style={styles.encouragementText}>
              "Your feelings are valid, and it's okay to feel whatever you're
              experiencing right now. You're doing better than you think. 💕"
            </Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#718096',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
  },
  realTalkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  realTalkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  realTalkTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 8,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  realTalkMessage: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  realTalkText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#2D3748',
    lineHeight: 20,
  },
  questionContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  question: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  subQuestion: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  moodCard: {
    width: (width - 60) / 4,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  moodCardSelected: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  moodIconContainer: {
    marginBottom: 4,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#2D3748',
    textAlign: 'center',
  },
  intensityContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  intensityTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 20,
  },
  intensitySlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  intensityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  intensityDotActive: {
    backgroundColor: '#3B82F6',
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
  },
  sharingContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sharingTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  sharingSubtitle: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  sharingOptions: {
    gap: 16,
  },
  sharingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sharingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sharingContent: {
    flex: 1,
  },
  sharingOptionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  sharingOptionDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
    lineHeight: 18,
  },
  encouragementCard: {
    margin: 20,
    marginTop: 8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
});
