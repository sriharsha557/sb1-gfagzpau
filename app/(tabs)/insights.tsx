import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, Calendar, Clock, Heart, Brain } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data for insights
const weeklyData = [
  { day: 'Mon', mood: 4, color: '#3B82F6' },
  { day: 'Tue', mood: 3, color: '#60A5FA' },
  { day: 'Wed', mood: 5, color: '#1D4ED8' },
  { day: 'Thu', mood: 2, color: '#93C5FD' },
  { day: 'Fri', mood: 4, color: '#3B82F6' },
  { day: 'Sat', mood: 5, color: '#1D4ED8' },
  { day: 'Sun', mood: 3, color: '#60A5FA' },
];

const moodDistribution = [
  { mood: 'Happy', percentage: 35, color: '#3B82F6' },
  { mood: 'Calm', percentage: 25, color: '#60A5FA' },
  { mood: 'Excited', percentage: 20, color: '#1D4ED8' },
  { mood: 'Sad', percentage: 10, color: '#93C5FD' },
  { mood: 'Anxious', percentage: 10, color: '#2563EB' },
];

const insights = [
  {
    icon: TrendingUp,
    title: 'Mood Trending Up',
    description: 'Your mood has improved by 15% this week compared to last week.',
    color: '#48BB78',
  },
  {
    icon: Calendar,
    title: 'Best Day Pattern',
    description: 'You tend to feel happiest on weekends. Consider planning more relaxing activities.',
    color: '#3B82F6',
  },
  {
    icon: Clock,
    title: 'Evening Reflections',
    description: 'You journal most often in the evening. This helps process your day.',
    color: '#9F7AEA',
  },
  {
    icon: Heart,
    title: 'Emotional Growth',
    description: 'You\'ve been more open about your feelings lately. Keep it up!',
    color: '#3B82F6',
  },
];

export default function InsightsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const maxMood = Math.max(...weeklyData.map(d => d.mood));

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FF', '#DBEAFE', '#E0F2FE']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Your Insights</Text>
            <Text style={styles.subtitle}>Understanding your emotional patterns</Text>
          </View>

          {/* Period Selector */}
          <View style={styles.periodSelector}>
            {(['week', 'month', 'year'] as const).map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.periodButtonActive
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive
                ]}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Mood Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Mood Trends</Text>
            <View style={styles.chart}>
              {weeklyData.map((data, index) => (
                <View key={index} style={styles.chartBar}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: (data.mood / maxMood) * 100,
                        backgroundColor: data.color,
                      }
                    ]}
                  />
                  <Text style={styles.chartLabel}>{data.day}</Text>
                </View>
              ))}
            </View>
            <View style={styles.chartLegend}>
              <Text style={styles.chartLegendText}>1 = Low intensity, 5 = High intensity</Text>
            </View>
          </View>

          {/* Mood Distribution */}
          <View style={styles.distributionContainer}>
            <Text style={styles.sectionTitle}>Mood Distribution</Text>
            {moodDistribution.map((item, index) => (
              <View key={index} style={styles.distributionItem}>
                <View style={styles.distributionLeft}>
                  <View style={[styles.distributionColor, { backgroundColor: item.color }]} />
                  <Text style={styles.distributionLabel}>{item.mood}</Text>
                </View>
                <View style={styles.distributionRight}>
                  <View style={styles.distributionBar}>
                    <View
                      style={[
                        styles.distributionFill,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.distributionPercentage}>{item.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Key Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Key Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Days Tracked</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3.6</Text>
                <Text style={styles.statLabel}>Avg Mood</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>Journal Entries</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </View>

          {/* AI Insights */}
          <View style={styles.insightsContainer}>
            <View style={styles.insightsHeader}>
              <Brain size={24} color="#3B82F6" />
              <Text style={styles.sectionTitle}>AI Insights</Text>
            </View>
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <View key={index} style={styles.insightCard}>
                  <View style={styles.insightHeader}>
                    <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                      <IconComponent size={20} color={insight.color} />
                    </View>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                  </View>
                  <Text style={styles.insightDescription}>{insight.description}</Text>
                </View>
              );
            })}
          </View>

          {/* Recommendations */}
          <View style={styles.recommendationsContainer}>
            <Text style={styles.sectionTitle}>Gentle Suggestions</Text>
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>🌱 Mindful Moment</Text>
              <Text style={styles.recommendationText}>
                Try a 5-minute breathing exercise when you notice anxiety patterns.
              </Text>
            </View>
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>📝 Gratitude Practice</Text>
              <Text style={styles.recommendationText}>
                Consider adding one thing you're grateful for to your daily entries.
              </Text>
            </View>
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>🚶‍♀️ Movement Break</Text>
              <Text style={styles.recommendationText}>
                A short walk might help boost your mood on lower-energy days.
              </Text>
            </View>
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
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#3B82F6',
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#718096',
  },
  periodButtonTextActive: {
    color: 'white',
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 12,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
  },
  chartLegend: {
    alignItems: 'center',
  },
  chartLegendText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#A0AEC0',
  },
  distributionContainer: {
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
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  distributionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  distributionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  distributionColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 12,
  },
  distributionLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#2D3748',
  },
  distributionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F7FAFC',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    borderRadius: 4,
  },
  distributionPercentage: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#4A5568',
    width: 35,
    textAlign: 'right',
  },
  statsContainer: {
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  insightsContainer: {
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
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightCard: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  insightDescription: {
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
    lineHeight: 18,
    marginLeft: 44,
  },
  recommendationsContainer: {
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
  recommendationCard: {
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#48BB78',
  },
  recommendationTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 6,
  },
  recommendationText: {
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
    lineHeight: 18,
  },
});