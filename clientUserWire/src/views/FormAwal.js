import GestureFlipView from 'react-native-gesture-flip-card';
import * as React from 'react';
import RenderFront from '../components/RenderFront';
import RenderBack from '../components/RenderBack';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import InputForm from '../components/InputForm';

const { height, width } = Dimensions.get('window');
// const renderFront = () => {
//     return (
//         <>
//             <InputForm />
//         </>
//     );
// };

// const renderBack = () => {
//     return (
//         <View style={{width:width, height: height, borderRadius:20,borderColor:'black',backgroundColor:'grey'}} >
//             <Text style={{ fontSize: 25, color: 'white' }}>{'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. '}</Text>
//         </View>
//     );
// };


export default function FormAwal({ navigation }) {
    return (
        <>
            {/* <GestureFlipView width={width} height={height}>
                {renderBack()}
                {renderFront()}
            </GestureFlipView> */}
            <InputForm navigation={navigation}/>
        </>
    );
}