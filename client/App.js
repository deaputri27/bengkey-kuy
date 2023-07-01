import { StyleSheet, Text, View, LogBox } from 'react-native';
import MapScreen from './Screens/MapScreen';
import SearchScreen from './Screens/SearchScreen';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={MapScreen} />
        <Stack.Screen name='chooseLocation' component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
