import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from "../components/CustomDrawer";
import ChatTrackMitra from "../views/ChatTrackMitra";
import DetailOrder from "../views/DetailOrder";
import TotalIncome from "../views/TotalIncome";
import OrderList from "../views/OrderList";

const Drawer = createDrawerNavigator();


const DrawerSide = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }}>
            {/* <Drawer.Screen name="Detail Order" component={DetailOrder} /> */}
            <Drawer.Screen name="List Order" component={OrderList}/>
            <Drawer.Screen name="Chat dan Track Mitra" component={ChatTrackMitra} />
            <Drawer.Screen name="History" component={TotalIncome} />
        </Drawer.Navigator>
    )
}

export default DrawerSide