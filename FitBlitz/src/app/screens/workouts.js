//workouts page
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../components/NavBar';

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Workouts</Text>
      </View>
      <NavBar />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});

