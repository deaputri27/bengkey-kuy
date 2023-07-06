import * as React from 'react';
import MapTracking from '../components/MapTracking';
import { View } from 'react-native';


export default function TrackOrderDetail({navigation}) {
    return (
        <View style={{ flex:1 }}>
        <MapTracking navigation={navigation}/>
        </View>
    );
}