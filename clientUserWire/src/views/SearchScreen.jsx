import React, { useState } from 'react';
import { View, ScrollView, DeviceEventEmitter } from 'react-native';
import SearchComponent from '../components/SearchComponent';
import ButtonComponent from '../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const SearchScreen = (props) => {
    const [loc, setLoc] = useState({
        dropLocationCors: {}
    })
    const { dropLocationCors } = loc

    const navigation = useNavigation()
    const onDone = () => {
        // props.route.params.getCoordinates({
        //     dropLocationCors
        // })
        DeviceEventEmitter.emit("search_location", dropLocationCors)
        navigation.goBack()
    }

    const fetchAddressCords = (lat, lng) => {
        setLoc({
            ...loc, dropLocationCors: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>', props)

    return (
        // <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={true} vertical
                keyboardShouldPersistTaps="handled"
                style={{ borderColor: 'white', flex: 1, padding: 24 }}>
                <SearchComponent placeholderText="Input your location..."
                    fetchAddress={fetchAddressCords} />
                <ButtonComponent btnText="Done" btnStyle={{ marginTop: 24 }} onPress={onDone} />
            </ScrollView>
        // </SafeAreaView>
    );
}

export default SearchScreen;
