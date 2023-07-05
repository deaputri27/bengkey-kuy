import React, { useEffect, useState } from 'react';
import { Pressable, View, StyleSheet, Text, Image, Dimensions, FlatList, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CarouselUser from '../components/CarouselUser';
const { height, width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Home({ navigation }) {

    const [datas, setDatas] = useState({
        username: '',
        user_id: ''
    })

    useEffect(() => {
        (async () => {
            setDatas({
                username: await AsyncStorage.getItem('username'),
                user_id: await AsyncStorage.getItem('user_id')
            })
        })()
    }, [])
    console.log(datas.username);
    const logout = async () => {
        try {
            await AsyncStorage.clear()
            await navigation.navigate('AuthUser')
        } catch (error) {
            Alert.alert(error)
        }
    }

    // const username = async () => await AsyncStorage.getItem('username')
    // console.log(username, "<<<<");
    const articels = [
        { id: 1, text: "Layanan Cepat dan Efisien untuk Tambal Ban Terdekat", uri: 'https://montiro.id/_ipx/_/https://api.montiro.id/storage/images/konten/tvbCs6OPUW6ocBvOJZaG.jpeg', textStyle: { marginBottom: 300 } },
        { id: 2, text: '9 Cara Perawatan Mobil yang Bisa Dilakukan Sendiri', uri: 'https://montiro.id/_ipx/_/https://api.montiro.id/storage/images/konten/d2L7hADbnHpzFVmwFcRD.jpeg' },
        { id: 3, text: "Bantuan Darurat Towing Mobil Terdekat saat Mobil Anda Mogok di Jalan", uri: 'https://montiro.id/_ipx/_/https://api.montiro.id/storage/images/konten/eE3SQGnKu1tFUhwbzTJP.jpeg' },
        { id: 4, text: "10 Cara Membersihkan Evaporator AC Mobil", uri: "https://montiro.id/_ipx/_/https://api.montiro.id/storage/images/konten/uI7DWgqIFICUuBUhA52W.jpeg" },
    ];
    const CustomCard = ({ text, uri }) => {
        return (
            <View style={styles.containerCustomCard}>
                <Image source={{ uri }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.textCustomCard}>{text}</Text>
                </View>
            </View>
        );
    };
    const renderArticels = ({ item }) => (
        <Pressable onPress={() => {
            navigation.navigate('Profile', {
                id: item.id,
                name: item.text,
                img: item.uri,
            });
        }}>
            {/* <ImagedCarouselCard style={{ marginLeft: 9 }} text={item.text} source={{ uri: item.uri }}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardText}>{item.text}</Text>
                </View>
            </ImagedCarouselCard> */}
            {/* <Pressable onPress={() => {
                navigation.navigate('Profile', {
                    id: item.id,
                    name: item.text,
                    img: item.uri,
                });
            }}>
        </Pressable> */}
            <CustomCard text={item.text} uri={item.uri} />

        </Pressable>
    );


    return (
        <>
            <View style={styles.container}>
                <View style={styles.black} >
                    <Image style={{ height: height, width: width }}
                        source={{ uri: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYWdlfGVufDB8fDB8fHww&w=1000&q=80' }}
                    />
                </View>
                <View style={styles.red}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        < Svg style={{ height: 50, width: 50, marginLeft: 20, marginTop: 10 }}
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

                        <Text style={styles.text}>Hi, {datas.username}</Text>
                        <Svg onPress={logout} style={{ position:'absolute',height: 40, width: 50, marginLeft:'75%', marginTop: 18 }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="black">
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </Svg>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Pressable onPress={(item) => {
                                navigation.navigate('CardsBengkel', {
                                    id: item.id,
                                });
                            }}>
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="black"
                                    strokeWidth={1.5}
                                    style={{ height: 50, width: 50, alignSelf: 'center', marginTop: 5 }}
                                >
                                    <Path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                                    />
                                </Svg>
                            </Pressable>
                            <Text style={styles.textIcon}>Emergency</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="black"
                                strokeWidth={1.5}
                                style={{ height: 50, width: 50, alignSelf: 'center', marginTop: 5 }}
                            >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </Svg>
                            <Text style={styles.textIcon}>Home Service</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                                style={{ height: 50, width: 50, color: 'black', alignSelf: 'center', marginTop: 5 }}
                            >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                />
                            </Svg>
                            <Text style={styles.textIcon}>History</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.darkOrange}>
                    <CarouselUser />
                </View>
                <View style={styles.green}>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            horizontal
                            data={articels}
                            renderItem={renderArticels}
                            keyExtractor={(item) => item.id.toString()}
                        />
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
        flex: 1,
        // backgroundColor: 'black',
    },
    red: {
        flex: 1.5,
        backgroundColor: 'white',
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
        marginTop: 30
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
        flex: 1.5,
        // backgroundColor: 'darkorange',
        margin: 10,
        marginHorizontal: 30,
        borderRadius: 20,
    },
    green: {
        flex: 3,
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
});
