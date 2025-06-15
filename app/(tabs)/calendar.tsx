import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const dayWidth = (width - 40) / 7;

// Mock data for mood calendar
const moodData = {
  '2024-01-01': { mood: 'happy', intensity: 4, color: '#3B82F6' },
  '2024-01-02': { mood: 'calm', intensity: 3, color: '#60A5FA' },
  '2024-01-03': { mood: 'excited', intensity: 5, color: '#1D4ED8' },
  '2024-01-04': { mood: 'sad', intensity: 2, color: '#93C5FD' },
  '2024-01-05': { mood: 'anxious', intensity: 3, color: '#2563EB' },
  '2024-01-06': { mood: 'happy', intensity: 4, color: '#3B82F6' },
  '2024-01-07': { mood: 'tired', intensity: 2, color: '#BFDBFE' },
  '2024-01-08': { mood: 'calm', intensity: 4, color: '#60A5FA' },
  '2024-01-09': { mood: 'happy', intensity: 5, color: '#3B82F6' },
  '2024-01-10': { mood: 'confused', intensity: 2, color: '#93C5FD' },
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getMoodForDate = (day: number) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    return moodData[dateKey];
  };

  const getSelectedDateInfo = () => {
    if (!selectedDate) return null;
    return moodData[selectedDate];
  };

  const days = getDaysInMonth(currentDate);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FF', '#DBEAFE', '#E0F2FE']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Mood Calendar</Text>
            <Text style={styles.subtitle}>Track your emotional journey</Text>
          </View>

          {/* Calendar Navigation */}
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigateMonth('prev')}
            >
              <ChevronLeft size={24} color="#3B82F6" />
            </TouchableOpacity>
            
            <Text style={styles.monthYear}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigateMonth('next')}
            >
              <ChevronRight size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <View style={styles.calendarContainer}>
            {/* Day Headers */}
            <View style={styles.dayHeaders}>
              {dayNames.map((dayName) => (
                <View key={dayName} style={styles.dayHeader}>
                  <Text style={styles.dayHeaderText}>{dayName}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {days.map((day, index) => {
                if (day === null) {
                  return <View key={index} style={styles.emptyDay} />;
                }

                const mood = getMoodForDate(day);
                const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isSelected = selectedDate === dateKey;
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayCell,
                      mood && { backgroundColor: mood.color + '40' },
                      isSelected && styles.selectedDay,
                      isToday && styles.todayDay,
                    ]}
                    onPress={() => setSelectedDate(dateKey)}
                  >
                    <Text style={[
                      styles.dayText,
                      isToday && styles.todayText,
                      isSelected && styles.selectedDayText
                    ]}>
                      {day}
                    </Text>
                    {mood && (
                      <View style={styles.moodIndicator}>
                        {Array.from({ length: mood.intensity }, (_, i) => (
                          <View
                            key={i}
                            style={[styles.intensityDot, { backgroundColor: mood.color }]}
                          />
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Selected Date Info */}
          {selectedDate && getSelectedDateInfo() && (
            <View style={styles.selectedDateInfo}>
              <Text style={styles.selectedDateTitle}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              <View style={styles.moodDetails}>
                <View style={[styles.moodColorBox, { backgroundColor: getSelectedDateInfo()?.color }]} />
                <Text style={styles.moodName}>
                  {getSelectedDateInfo()?.mood.charAt(0).toUpperCase() + getSelectedDateInfo()?.mood.slice(1)}
                </Text>
                <Text style={styles.intensityText}>
                  Intensity: {getSelectedDateInfo()?.intensity}/5
                </Text>
              </View>
            </View>
          )}

          {/* Mood Legend */}
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Mood Colors</Text>
            <View style={styles.legendGrid}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
                <Text style={styles.legendText}>Happy</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#93C5FD' }]} />
                <Text style={styles.legendText}>Sad</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#2563EB' }]} />
                <Text style={styles.legendText}>Anxious</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#60A5FA' }]} />
                <Text style={styles.legendText}>Calm</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#1D4ED8' }]} />
                <Text style={styles.legendText}>Excited</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#BFDBFE' }]} />
                <Text style={styles.legendText}>Tired</Text>
              </View>
            </View>
          </View>

          {/* Monthly Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>This Month's Summary</Text>
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Days Tracked</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>😊</Text>
                <Text style={styles.statLabel}>Most Common</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3.4</Text>
                <Text style={styles.statLabel}>Avg Intensity</Text>
              </View>
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  monthYear: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  calendarContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeader: {
    width: dayWidth,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#718096',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    width: dayWidth,
    height: 50,
  },
  dayCell: {
    width: dayWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
    position: 'relative',
  },
  selectedDay: {
    backgroundColor: '#3B82F6',
  },
  todayDay: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2D3748',
  },
  todayText: {
    color: '#3B82F6',
    fontFamily: 'Poppins-Bold',
  },
  selectedDayText: {
    color: 'white',
  },
  moodIndicator: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 2,
    gap: 1,
  },
  intensityDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  selectedDateInfo: {
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
  selectedDateTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  moodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moodColorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  moodName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2D3748',
  },
  intensityText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#718096',
  },
  legendContainer: {
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
  legendTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#4A5568',
  },
  summaryContainer: {
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
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
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
});