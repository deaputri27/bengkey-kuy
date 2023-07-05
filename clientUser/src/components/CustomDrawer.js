import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import Svg, { Path } from 'react-native-svg';

// import { View } from 'react-native-animatable'
import {Pressable, Image, View, Text, ImageBackground, TouchableOpacity } from 'react-native'


const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            {/* <DrawerContentScrollView {...props}
            > */}
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYWdlfGVufDB8fDB8fHww&w=1000&q=80' }}
                    style={{ padding: 20, paddingTop: 56 }}
                >
                    <Image source={{ uri: 'https://w7.pngwing.com/pngs/640/918/png-transparent-logo-car-workshop-yamaha-hand-sports-equipment-fictional-character.png' }}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Roboto-Medium', fontWeight: 'bold' }}>
                        Honda Bintaro
                    </Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            {/* </DrawerContentScrollView> */}
            <View>
                <Pressable
                 style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc',flexDirection:'row' }}
                 onPress={()=>{
                    console.log('sign out');
                }}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth={3}
                        width={24}
                        height={24}
                        style={{ width: 30, height: 30, marginTop: 5 ,paddingVertical:15}}
                    >
                        <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </Svg>
                    <Text
                    style={{fontWeight:'bold',marginTop: 3 ,paddingVertical:10,marginLeft:10}}
                    >
                        Sign Out
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default CustomDrawer