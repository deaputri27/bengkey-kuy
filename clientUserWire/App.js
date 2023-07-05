import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthUser from './src/views/AuthUser';
import AuthMitra from './src/views/AuthMitra';
import Home from './src/views/Home'
import Tabs from './src/navigation/Tabs';
import FormAwal from './src/views/FormAwal';
import CardsBengkel from './src/views/CardsBengkel';
import SearchScreen from './src/views/SearchScreen';
import TrackOrderDetail from './src/views/TrackOrderDetail';



const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AuthUser" component={AuthUser} options={{headerShown:false}} />
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="FormAwal" component={FormAwal} options={{ headerShown: false }} />
          <Stack.Screen name="CardsBengkel" component={CardsBengkel} options={{ headerShown: false }} />
          <Stack.Screen name="Choose Location" component={SearchScreen} />
          <Stack.Screen name="TrackOrderDetail" component={TrackOrderDetail} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


