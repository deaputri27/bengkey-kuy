import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthUser from './src/views/AuthUser';
import AuthMitra from './src/views/AuthMitra';
import Home from './src/views/Home'
import Tabs from './src/navigation/Tabs';
import FormAwal from './src/views/FormAwal';
import CardsBengkel from './src/views/CardsBengkel';
import OrderList from './src/views/OrderList';
import TotalIncome from './src/views/TotalIncome';
import ChatTrackMitra from './src/views/ChatTrackMitra'
import DetailOrder from './src/views/DetailOrder'
import WaitingScreenMitra from './src/views/WaitingScreenMitra';
// import FormMitra from './src/views/FormMitra';
import DrawerSide from './src/navigation/DrawerSide'
const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <>
      <NavigationContainer>
        {/* <DrawerSide/> */}
        <Stack.Navigator>
          <Stack.Screen name="AuthMitra" component={AuthMitra} options={{headerShown:false}} />
          <Stack.Screen name="DrawerSide" component={DrawerSide} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="FormAwal" component={FormAwal} options={{ headerShown: false }} />
          <Stack.Screen name="CardsBengkel" component={CardsBengkel} options={{ headerShown: false }} /> */}
           {/* <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="TotalIncome" component={TotalIncome} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="WaitingScreenMitra" component={WaitingScreenMitra} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="ChatTrackMitra" component={ChatTrackMitra} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="DetailOrder" component={DetailOrder} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="FormMitra" component={FormMitra} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


