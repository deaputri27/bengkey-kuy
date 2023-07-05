import { Dimensions, View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function Profile({ navigation }) {
    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                console.log('timeout', navigation);
                navigation.navigate("Home");
            }, 5000);
        }, [navigation])
    );
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('timeout', navigation);
    //         navigation.navigate("Home");
    //     }, 3000);
    // }, [navigation]);

    return (
        <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
            <Animatable.Image
                // source={require("../Logos/delivery-boy.gif")}
                source={{uri:'https://i.pinimg.com/originals/bc/85/0f/bc850fcedb45dce673057d546b0b2810.gif'}}
                animation="slideInUp"
                iterationCount={1}
                style={{ height: 800, width: 750, justifyContent:'center',alignContent:'center' }}
            // className="h-80 w-80"
            />

            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-md my-10 px-4 text-white font-bold text-center"
            >
                Assigning Delivery partner to your order
            </Animatable.Text>

            <Progress.Circle size={20} indeterminate={true} color="white" />
        </SafeAreaView>
    );
};
