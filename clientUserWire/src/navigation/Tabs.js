import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import AskAI from '../views/AskAI'
import Profile from '../views/Profile'
import Home from '../views/Home';

const Tab = createBottomTabNavigator()


const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'white'
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    height: 90,
                    ...styles.shadow
                },
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={focused ? 'black' : '#748c94'}
                            strokeWidth={1.5}
                            style={{ height: 25, width: 25 }}
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </Svg>
                        <Text
                            style={{ color: focused ? 'black' : '#748c94', fontSize: 12, fontWeight: 'bold' }}
                        >
                            HOME
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen name="AskAI" component={AskAI} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/021/059/827/original/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg' }}
                        style={{ height: 25, width: 25 }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={focused ? 'black' : '#748c94'}
                            strokeWidth={1.5}
                            style={{ height: 25, width: 25 }}
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </Svg>
                        <Text
                            style={{ color: focused ? 'black' : '#748c94', fontSize: 12, fontWeight: 'bold' }}
                        >
                            PROFILE
                        </Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})


export default Tabs