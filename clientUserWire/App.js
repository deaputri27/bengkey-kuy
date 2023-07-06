import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import AuthUser from './src/views/AuthUser';
import Home from './src/views/Home'
import Tabs from './src/navigation/Tabs';
import FormAwal from './src/views/FormAwal';
import CardsBengkel from './src/views/CardsBengkel';
import SearchScreen from './src/views/SearchScreen';
import TrackOrderDetail from './src/views/TrackOrderDetail';
import Payment from './src/views/Payment';
import ChatScreen from './src/views/ChatScreen';
import History from './src/views/History';

const Stack = createNativeStackNavigator()
LogBox.ignoreAllLogs()
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AuthUser'>
          <Stack.Screen name="AuthUser" component={AuthUser} options={{headerShown:false}} />
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="FormAwal" component={FormAwal} options={{ headerShown: false }} />
          <Stack.Screen name="CardsBengkel" component={CardsBengkel} options={{ headerShown: false }} />
          <Stack.Screen name="Choose Location" component={SearchScreen} />
          <Stack.Screen name="TrackOrderDetail" component={TrackOrderDetail} options={{ headerShown: false }}/>
          <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
          <Stack.Screen name="Chat" component={ChatScreen}/>
          <Stack.Screen name="History" component={History}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


