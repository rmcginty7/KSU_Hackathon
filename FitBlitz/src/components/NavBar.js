import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { label: 'Home', icon: 'home', route: '/screens/home' },
  { label: 'Workouts', icon: 'barbell', route: '/screens/workouts' },
  { label: 'Profile', icon: 'person', route: '/screens/profile' },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => router.push(tab.route)}
          >
            <Ionicons
              name={isActive ? tab.icon : `${tab.icon}-outline`}
              size={24}
              color={isActive ? '#4F46E5' : '#9ca3af'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});