import { Dimensions, View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function WaitingScreenMitra({ navigation }) {
    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                console.log('timeout', navigation);
                navigation.navigate("ChatTrackMitra");
            }, 2000);
        }, [navigation])
    );
    return (
        <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
            <Animatable.Image
                // source={require("../Logos/delivery-boy.gif")}
                source={{uri:'https://cdn.dribbble.com/users/2572904/screenshots/17169793/media/ed801ffe0fbeb4b95ca246ba1f5ea398.gif'}}
                animation="slideInUp"
                iterationCount={1}
                style={{ height: 900, width: 500, justifyContent:'center',alignContent:'center',alignSelf:'center' }}
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
