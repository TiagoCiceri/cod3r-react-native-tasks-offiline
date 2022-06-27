import { StyleSheet, Text, View } from 'react-native'
//import TaskList from './src/screens/TaskList'
//import Auth from './src/screens/Auth'
import Navigator from './src/Navigator'

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
