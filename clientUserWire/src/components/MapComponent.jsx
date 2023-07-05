import { DeviceEventEmitter, View, Text, StyleSheet, Button } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import React, { useEffect, useRef, useState } from 'react'
import { GOOGLE_KEY } from '../../key';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Path } from 'react-native-svg';
import * as Location from "expo-location"
import { initializeApp } from 'firebase/app' // utk mulainya
import { getFirestore, addDoc, updateDoc, collection, doc, setDoc, deleteDoc, onSnapshot, getDoc } from "firebase/firestore" // utk fire store databasenya
import image from '../icons/iconmitra.png'
import mark from '../icons/iconmark.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../store/store';
import { BASE_URL } from '../../server';


const LOCATION_DISTANCE_THRESHOLD = 1

const MapComponent = ({ navigation }) => {
    const [datas, setDatas] = useStore(state => [
        state.datas,
        state.updateDatas
    ])
    const [userLoc, setUserLoc] = useStore(state => [
        state.userLoc,
        state.updateUserLoc
    ])
    const mapRef = useRef()
    const [loading, setLoading] = useState(false)
    const [mapReady, setMapReady] = useState(false)
    const [regionUser, setRegionUser] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
    })


    const [regionMitra, setRegionMitra] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
    })



    useEffect(() => {

        // const idDriver = "01827373"
        // const app = initializeApp(firebaseConfig)
        // const db = getFirestore(app)
        // const connection = collection(db, "final-phase-bengkel")


        // onSnapshot(connection, async () => {
        //     try {
        //         const docSnapshot = await getDoc(doc(connection, idDriver));
        //         if (docSnapshot.exists()) {
        //             console.log(docSnapshot.data());
        //             setLocation(prev => ({
        //                 ...prev, pickupCords: {
        //                     latitude: docSnapshot.data().latitude,
        //                     longitude: docSnapshot.data().longitude
        //                 }
        //             }))
        //         }
        //     } catch (err) {
        //         console.log(err);
        //     }
        // })
        // let subscription
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                Alert.alert("ditolak")
                return
            }

            const subscription = await Location.getCurrentPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: LOCATION_DISTANCE_THRESHOLD
                },
            )

            const { coords } = subscription
            const { latitude, longitude } = coords
            setRegionUser(prev => {
                const newRegion = {
                    ...prev,
                    latitude: latitude,
                    longitude: longitude
                }
                mapRef.current?.animateToRegion(newRegion, 2000)
                return newRegion
            })

            const token = await AsyncStorage.getItem('access_token')
            console.log(token);

            setLoading(true)
            setUserLoc({lat:latitude,lng:longitude})
            // console.log(latitude,longitude);
            const data = await axios({
                url: `${BASE_URL}/distance`,
                method: 'post',
                data: {
                    lat: latitude,
                    long: longitude
                },
                headers: {
                    'access_token': token
                }
            })

            setLoading(false)
            setDatas(data?.data)

        }
        )()


        DeviceEventEmitter.addListener("search_location", (eventData) => {

            setTimeout(() => {
                setRegionUser(prev => {
                    const newRegion = {
                        ...prev,
                        latitude: eventData.latitude,
                        longitude: eventData.longitude
                    }
                    mapRef.current?.animateToRegion(newRegion, 2000)

                    return newRegion
                })
            }, 2000);
        })

        return () => {
            DeviceEventEmitter.removeAllListeners("search_location")
        }
    }, [])


    const onPressLocation = () => {
        navigation.navigate('Choose Location')
    }

    const getPosition = () => {
        (async () => {
            const position = await Location.getCurrentPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: LOCATION_DISTANCE_THRESHOLD
                },
            )

            const { coords } = position
            const { latitude, longitude } = coords
            setRegionUser(prev => {
                const newRegion = {
                    ...prev,
                    latitude: latitude,
                    longitude: longitude
                }
                mapRef.current?.animateToRegion(newRegion, 2000)
                return newRegion
            })

        })()
    }

    const fetchValues = ({ latitude, longitude }) => {
        setRegionUser(prev => {
            const newRegion = {
                ...prev,
                latitude: latitude,
                longitude: longitude
            }

            return newRegion
        })
    }

    //////////////////////////////// ini firebase //////////////////////////////////
    // const firebaseConfig = {
    //     apiKey: "AIzaSyA3a63q1F5cOBFF_GF4ssElkOu-Ix2-7vY",
    //     authDomain: "bengkel-kuy-final-project.firebaseapp.com",
    //     projectId: "bengkel-kuy-final-project",
    //     storageBucket: "bengkel-kuy-final-project.appspot.com",
    //     messagingSenderId: "558920179990",
    //     appId: "1:558920179990:web:cfce73cb86f6bbb8933037"
    // };


    // driver idnya di hardcoded dulu


    // useEffect(() => {
    //     mapRef.current?.animateToRegion(regionMitra, 2000)
    // }, [regionMitra])
    // console.log(regionUser, "<<<regionUser");
    // console.log(userLoc, "<<<");
    return (
        <>
            {loading ? <Text>Test</Text> : <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFill}
                        initialRegion={regionUser}
                        onRegionChangeComplete={(val) => {
                            setRegionUser(prev => ({
                                ...prev,
                                latitudeDelta: val.latitudeDelta,
                                longitudeDelta: val.longitudeDelta
                            }))
                        }}
                        provider={PROVIDER_GOOGLE}
                        minZoomLevel={13}
                        maxZoomLevel={20}

                    // ref={mapRef}
                    // style={styles.map}
                    // initialRegion={region}
                    //   minZoomLevel={16}
                    //   maxZoomLevel={16}
                    //   onPress={(e) => {
                    //     const newRegion = {
                    //       ...region,
                    //       ...e.nativeEvent.coordinate
                    //     }
                    //     setRegion(newRegion)
                    //     mapRef.current?.animateToRegion(newRegion, 3000)
                    //   }}
                    //   onRegionChangeComplete={(region) => setRegion({
                    //     ...region,
                    //     latitudeDelta: region.latitudeDelta,
                    //     longitudeDelta: region.longitudeDelta,
                    //   })}
                    >
                        {/* <Marker image={image} coordinate={location.pickupCords} /> */}
                        <Marker image={mark} coordinate={regionUser} />
                        {/* <MapViewDirections
                        resetOnChange={false}
                        origin={location.pickupCords}
                        destination={location.dropLocationCors}
                        apikey={GOOGLE_KEY}
                        strokeWidth={3}
                        strokeColor="red"
                        optimizeWaypoints={true}
                        onReady={result => {
                            if (!mapReady) {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: 30,
                                        bottom: 300,
                                        left: 30,
                                        top: 100
                                    }
                                })
                                setMapReady(true)
                            }
                        }}
                        onError={(errorMessage) => {
                            console.log(errorMessage)
                        }}
                    /> */}
                    </MapView>
                    <View style={styles.bottomCard}>
                        <TouchableOpacity style={styles.inputStyle} onPress={onPressLocation}>
                            <Text>Set your location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '2%', height: '10%', position: 'absolute', bottom: 25, marginLeft: '80%' }}>
                        <Svg
                            onPress={getPosition}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 25 25"
                            stroke="#4285F4"
                        >
                            <Circle
                                cx="12"
                                cy="12"
                                r="11"
                                strokeWidth={2}
                                fill="none"
                                stroke="#4285F4"
                            />
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 17.6c-2.3 0-6-5.6-6-10.6 0-3.8 3.1-6.9 6-6.9s6 3.1 6 6.9c0 5-3.7 10.6-6 10.6zm0-14c-2.2 0-4 1.8-4 4 0 2.6 1.8 6.7 4 9.4 2.2-2.7 4-6.8 4-9.4 0-2.2-1.8-4-4-4z"
                                fill="#4285F4"
                            />
                            <Circle
                                cx="11"
                                cy="11"
                                fill="#FFF"
                            />
                        </Svg>
                    </View>
                </View>
            </View>}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        height: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inputStyle: {
        backgroundColor: 'grey',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
    }
});


export default MapComponent