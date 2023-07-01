import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import SearchComponent from '../Components/SearchComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';


const SearchScreen = (props) => {
    const [loc, setLoc] = useState({
        pickupCords: {}
    })
    const { pickupCords } = loc

    const navigation = useNavigation()
    const onDone = () => {
        props.route.params.getCoordinates({
            pickupCords
        })
        navigation.goBack()
    }

    const fetchAddressCords = (lat, lng) => {
        setLoc({
            ...loc, pickupCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>', props)

    return (
        <ScrollView showsVerticalScrollIndicator={true} vertical
            keyboardShouldPersistTaps="handled"
            style={{ borderColor: 'white', flex: 1, padding: 24 }}>
            <SearchComponent placeholderText="Input your location..."
                fetchAddress={fetchAddressCords} />
            <ButtonComponent btnText="Done" btnStyle={{ marginTop: 24 }} onPress={onDone} />
        </ScrollView>
    );
}

export default SearchScreen;
