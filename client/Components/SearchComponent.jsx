import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React from 'react'
import { GOOGLE_KEY } from '../key';

const SearchComponent = ({
    placeholderText, fetchAddress
}) => {
    const onPressAddress = (data, details) => {
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat, lng)
    }
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placeholderText}
                onPress={onPressAddress}
                fetchDetails={true}
                query={{
                    key: GOOGLE_KEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: styles.containerStyle,
                    TextInput: styles.textInputStyle
                }}
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        borderColor: '#F3F3F3'
    }
})

export default SearchComponent