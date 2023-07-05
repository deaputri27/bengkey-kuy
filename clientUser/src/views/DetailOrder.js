import React from 'react';
import { Pressable, View, StyleSheet, Text, Image, Dimensions, FlatList } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CarouselUser from '../components/CarouselUser';
const { height, width } = Dimensions.get('window');
// const [flexDirection, setflexDirection] = useState('column');
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import { Button } from 'react-native-paper';


export default function DetailOrder({ navigation }) {

    return (
        <>
            <View style={styles.container}>
                <View style={styles.black} >
                    <Image style={{ height: height, width: width }}
                        source={{ uri: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYWdlfGVufDB8fDB8fHww&w=1000&q=80' }}
                    />
                </View>
                <View style={styles.red}>
                    <Pressable onPress={() => {
                        navigation.openDrawer()
                    }
                    }>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth={2}
                            style={{ height: 25, width: 25,marginBottom:20,marginLeft:10 }}
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </Svg>
                    </Pressable>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', borderRadius: 20, }}>
                        < Svg style={{ height: 50, width: 50, marginLeft: 10, marginTop: 5 }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="black"
                            class="w-4 h-4"
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </Svg>

                        <Text style={styles.text}>Hi, Muhammad Agung</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center', justifyContent: 'center', fontWeight: 'bold', marginTop: 10 }}>
                                    03 Juli 2023
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.darkOrange}>
                    <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, marginBottom: 10 }}>

                    </View>
                    <View style={{ flex: 1, backgroundColor: 'red', borderRadius: 20, marginBottom: 10 }}>

                    </View>
                    <View style={{ flex: 1, borderRadius: 20, backgroundColor: 'green', marginBottom: 10 }}>

                    </View>
                </View>
                <View style={styles.green}>
                    <View style={styles.flatListContainer}>
                        <Pressable style={styles.button} onPress={console.log('yaahahaha')}>
                            <Text style={styles.buttonText}>
                                ACCEPT USER
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    black: {
        flex: 0.5,
        // backgroundColor: 'black',
    },
    red: {
        flex: 1,
        // backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        overflow: 'hidden',
        // paddingLeft: 20,
        flexDirection: 'colomn'
    },
    text: {
        // marginRight: 50,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20
    },
    textIcon: {
        // marginRight: 50,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 2,
        alignSelf: 'center'
    },
    darkOrange: {
        flex: 3,
        // backgroundColor: 'darkorange',
        margin: 10,
        borderRadius: 20,
    },
    green: {
        flex: 0.5,
        // backgroundColor: 'green',
        margin: 10,
        borderRadius: 20,
        marginTop: 20
    },
    cardTextContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 2,
    },
    containerCustomCard: {
        width: 320,
        height: 320,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 10,
        marginTop: 10
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    textContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textCustomCard: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: 'black',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonText: {
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        // marginTop: 13,
        // letterSpacing: 0.5
    },
});
