import GestureFlipView from 'react-native-gesture-flip-card';
import * as React from 'react';
import RenderFront from '../components/RenderFront';
import RenderBack from '../components/RenderBack';
import { Pressable, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import InputForm from '../components/InputForm';
import Svg, { Path } from 'react-native-svg';



const { height, width } = Dimensions.get('window');
const renderFront = () => {
    return (
        <>
            <Text>
                detail order
            </Text>
        </>
    );
};

const renderBack = () => {
    return (
        <>
        <Image
                style={{ width: width, height: height, borderRadius: 20 }}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyNKCuqhEFQkxMJkwN-yxSctu0R2q6y4l2lA&usqp=CAU' }}
            />
        </>
    );
};


export default function TrackOrderDetail() {
    return (
        <>
            <GestureFlipView width={width} height={height}>
                {renderFront()}
                {renderBack()}
            </GestureFlipView>
        </>
    );
}