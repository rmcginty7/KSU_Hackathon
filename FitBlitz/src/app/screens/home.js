import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import NavBar from '../../components/NavBar';

export default function HomeScreen() {
  const workoutPlan = {
    'Mon': 'Chest & Tris', 'Tue': 'Back & Bis', 'Wed': 'Rest Day', 
    'Thu': 'Leg Day', 'Fri': 'Shoulders', 'Sat': 'Cardio', 'Sun': 'Yoga'
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDayIndex = new Date().getDay(); 
  const today = days[(currentDayIndex + 6) % 7];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>{getGreeting()},</Text>
            <Text style={styles.greetingText}>(username)</Text>
          </View>
          <View style={styles.streakCircle}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakCount}>5 Days</Text>
          </View>
        </View>

        {/* Horizontal Calendar - Mobile Optimized */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Your Week</Text>
          <View style={styles.calendarRow}>
            {days.map((day) => {
              const isToday = day === today;
              return (
                <View key={day} style={styles.dayColumn}>
                  <Text style={[styles.dayLabel, isToday && styles.todayLabel]}>{day}</Text>
                  <TouchableOpacity 
                    style={[styles.dayButton, isToday && styles.todayButton]}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.statusDot, isToday && styles.todayDot]} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* Large "Do This Now" Card */}
        <TouchableOpacity style={styles.mainActionCard} activeOpacity={0.9}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTag}>NEXT UP</Text>
            <Text style={styles.cardTime}>45 MIN</Text>
          </View>
          <Text style={styles.cardTitle}>{workoutPlan[today]}</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </TouchableOpacity>

        {/* Quick Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#E1F5FE' }]}>
            <Text style={[styles.statValue, { color: '#0288D1' }]}>85%</Text>
          </View>
        </View>

      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Room for NavBar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greetingText: { fontSize: 16, color: '#FFFFFF', fontWeight: '500' },
  userName: { fontSize: 28, fontWeight: '800', color: '#1A1A1A' },
  streakCircle: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  streakEmoji: { fontSize: 18, marginRight: 4 },
  streakCount: { fontWeight: '800', fontSize: 18 },

  section: { marginBottom: 25 },
  sectionHeader: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 15 },
  
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 24,
  },
  dayColumn: { alignItems: 'center' },
  dayLabel: { fontSize: 12, fontWeight: '600', color: '#BDBDBD', marginBottom: 8 },
  todayLabel: { color: '#5856D6' },
  dayButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayButton: { backgroundColor: '#5856D6' },
  statusDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#D1D1D6' },
  todayDot: { backgroundColor: '#FFF' },

  mainActionCard: {
    backgroundColor: '#1C1C1E',
    padding: 24,
    borderRadius: 30,
    marginBottom: 20,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cardTag: { color: '#5856D6', fontWeight: '800', fontSize: 12, letterSpacing: 1 },
  cardTime: { color: '#8E8E93', fontSize: 12, fontWeight: '600' },
  cardTitle: { color: '#FFF', fontSize: 26, fontWeight: '800', marginBottom: 20 },
  progressBarBackground: { height: 6, backgroundColor: '#3A3A3C', borderRadius: 3, marginBottom: 10 },
  progressBarFill: { width: '40%', height: '100%', backgroundColor: '#5856D6', borderRadius: 3 },
  progressText: { color: '#8E8E93', fontSize: 11 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  statValue: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#7C7C7C', marginTop: 2 },
});