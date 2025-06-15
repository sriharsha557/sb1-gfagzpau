import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mic, MicOff, Lock, Users, Globe, Eye, EyeOff, Sparkles } from 'lucide-react-native';

const prompts = [
  "What happened today that made you feel this way?",
  "What are you grateful for right now?",
  "What's weighing on your mind?",
  "How did you take care of yourself today?",
  "What would you tell a friend feeling the same way?",
  "What's one thing that brought you joy today?",
];

export default function JournalScreen() {
  const [journalText, setJournalText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [visibility, setVisibility] = useState<'private' | 'friends' | 'public'>('private');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const visibilityOptions = [
    { key: 'private', label: 'Private', icon: Lock, color: '#718096' },
    { key: 'friends', label: 'Friends Only', icon: Users, color: '#3B82F6' },
    { key: 'public', label: 'Public', icon: Globe, color: '#48BB78' },
  ];

  const handleSave = () => {
    if (!journalText.trim()) {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }
    
    // Here you would save to your backend/storage
    Alert.alert('Saved!', 'Your journal entry has been saved successfully.');
    setJournalText('');
    setSelectedPrompt(null);
  };

  const getEncouragementText = () => {
    const encouragements = [
      "Your feelings matter and deserve to be heard. 💙",
      "Thank you for being honest with yourself today. 🌟",
      "Every emotion you feel is valid and important. 💕",
      "You're brave for expressing your true feelings. ✨",
      "Your vulnerability is a strength, not a weakness. 🌸",
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FF', '#DBEAFE', '#E0F2FE']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Express Yourself</Text>
            <Text style={styles.subtitle}>Your safe space to share and reflect</Text>
          </View>

          {/* Visibility Settings */}
          <View style={styles.visibilityContainer}>
            <Text style={styles.sectionTitle}>Who can see this?</Text>
            <View style={styles.visibilityOptions}>
              {visibilityOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.visibilityOption,
                      visibility === option.key && styles.visibilityOptionActive
                    ]}
                    onPress={() => setVisibility(option.key as any)}
                  >
                    <IconComponent 
                      size={20} 
                      color={visibility === option.key ? 'white' : option.color} 
                    />
                    <Text style={[
                      styles.visibilityLabel,
                      visibility === option.key && styles.visibilityLabelActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Anonymous Toggle */}
            <TouchableOpacity
              style={styles.anonymousToggle}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <View style={styles.anonymousToggleLeft}>
                {isAnonymous ? <EyeOff size={20} color="#3B82F6" /> : <Eye size={20} color="#718096" />}
                <Text style={styles.anonymousLabel}>Post Anonymously</Text>
              </View>
              <View style={[styles.toggle, isAnonymous && styles.toggleActive]}>
                <View style={[styles.toggleThumb, isAnonymous && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Writing Prompts */}
          <View style={styles.promptsContainer}>
            <Text style={styles.sectionTitle}>Need inspiration?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {prompts.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.promptCard,
                    selectedPrompt === prompt && styles.promptCardActive
                  ]}
                  onPress={() => {
                    setSelectedPrompt(prompt);
                    setJournalText(prompt + '\n\n');
                  }}
                >
                  <Text style={[
                    styles.promptText,
                    selectedPrompt === prompt && styles.promptTextActive
                  ]}>
                    {prompt}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Journal Input */}
          <View style={styles.journalContainer}>
            <View style={styles.journalHeader}>
              <Text style={styles.sectionTitle}>Your thoughts</Text>
              <TouchableOpacity
                style={[styles.recordButton, isRecording && styles.recordButtonActive]}
                onPress={() => setIsRecording(!isRecording)}
              >
                {isRecording ? <MicOff size={20} color="white" /> : <Mic size={20} color="#3B82F6" />}
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.journalInput}
              multiline
              placeholder="Start writing... Let your thoughts flow freely."
              placeholderTextColor="#A0AEC0"
              value={journalText}
              onChangeText={setJournalText}
              textAlignVertical="top"
            />

            {isRecording && (
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>Recording... Tap mic to stop</Text>
              </View>
            )}
          </View>

          {/* AI Encouragement */}
          {journalText.length > 50 && (
            <View style={styles.encouragementContainer}>
              <View style={styles.encouragementHeader}>
                <Sparkles size={20} color="#3B82F6" />
                <Text style={styles.encouragementTitle}>Gentle Support</Text>
              </View>
              <Text style={styles.encouragementText}>
                {getEncouragementText()}
              </Text>
            </View>
          )}

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Entry</Text>
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
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  visibilityContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  visibilityOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  visibilityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  visibilityOptionActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  visibilityLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#4A5568',
    marginLeft: 6,
  },
  visibilityLabelActive: {
    color: 'white',
  },
  anonymousToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  anonymousToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  anonymousLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
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
  promptsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  promptCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  promptCardActive: {
    backgroundColor: '#3B82F6',
  },
  promptText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  promptTextActive: {
    color: 'white',
  },
  journalContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  recordButtonActive: {
    backgroundColor: '#3B82F6',
  },
  journalInput: {
    minHeight: 150,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#2D3748',
    lineHeight: 24,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#3B82F6',
  },
  encouragementContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#48BB78',
  },
  encouragementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  encouragementTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 8,
  },
  encouragementText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  saveButton: {
    marginHorizontal: 20,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  bottomSpacing: {
    height: 20,
  },
});