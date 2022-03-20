import { StyleSheet, Text, View } from 'react-native';
import TaskList from './src/screens/TaskList'

export default function App() {
  return (
    <View style={styles.container}>
      <TaskList />   
      <Text>Teste GIT</Text>         
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
