import { View, Text, StyleSheet, Button } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { initializeApp } from 'firebase/app' // utk mulainya
import { getFirestore, addDoc, updateDoc, collection, doc, setDoc, deleteDoc, onSnapshot, getDoc } from "firebase/firestore" // utk fire store databasenya
import image from '../icons/garageicon.png'
import mark from '../icons/iconmark.png'
import { GOOGLE_KEY } from '../../key';
import useStore from '../store/store';
import { BASE_URL } from '../../server';
import axios from 'axios';
import * as Location from "expo-location"
import AsyncStorage from '@react-native-async-storage/async-storage';


const MapTracking = ({ navigation }) => {
    const LOCATION_DISTANCE_THRESHOLD = 1
    const setDataProduct = useStore(state => state.updateDataProduct)
    const dataProduct = useStore(state => state.dataProduct)
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['10%', '50%'], []);

    // callbacks
    const handleSheetChanges = (index) => {
        console.log('handleSheetChanges', index);
    };

    const userLoc = useStore(state => state.userLoc)
    const { lat, lng } = userLoc
    const mapRef = useRef()
    const [mapReady, setMapReady] = useState(false)
    const [location, setLocation] = useState({
        pickupCords: {
            latitude: 0,
            longitude: 0
        },
        dropLocationCors: {
            latitude: lat,
            longitude: lng
        }
    })


    useEffect(() => {
        const orderId = "01827373"
        const app = initializeApp(firebaseConfig)
        const db = getFirestore(app)
        const connection = collection(db, "final-phase-bengkel")


        onSnapshot(connection, async () => {
            try {
                const subscription = await Location.getCurrentPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        distanceInterval: LOCATION_DISTANCE_THRESHOLD
                    },
                )
    
                const { coords } = subscription
                const { latitude, longitude } = coords
                const docSnapshot = await getDoc(doc(connection, orderId));
                if (docSnapshot.exists()) {
                    console.log(docSnapshot.data());
                    setLocation(prev => ({
                        ...prev, pickupCords: {
                            latitude: docSnapshot.data().latitude,
                            longitude: docSnapshot.data().longitude
                        },dropLocationCors: {
                            latitude,
                            longitude
                        }
                    }))
                }
            } catch (err) {
                console.log(err);
            }
        })
        let subscription


        return () => {
            if (subscription) {
                subscription.remove()
            }
        }
    }, [])


    const { pickupCords, dropLocationCors } = location



    const fetchValues = (data) => {
        setLocation({
            ...data, dropLocationCors: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    //////////////////////////////// ini firebase //////////////////////////////////
    const firebaseConfig = {
        apiKey: "AIzaSyA3a63q1F5cOBFF_GF4ssElkOu-Ix2-7vY",
        authDomain: "bengkel-kuy-final-project.firebaseapp.com",
        projectId: "bengkel-kuy-final-project",
        storageBucket: "bengkel-kuy-final-project.appspot.com",
        messagingSenderId: "558920179990",
        appId: "1:558920179990:web:cfce73cb86f6bbb8933037"
    };

    const payment = async () => {
        try {
            await AsyncStorage.removeItem('orderId')
            await AsyncStorage.removeItem('status')
            const token = await AsyncStorage.getItem('access_token')
            console.log(token);
            // http://localhost:3000/users/process-transaction/1
            const response = await axios.post(`${BASE_URL}/process-transaction/1`, {}, {
                headers: {
                    // 'Content-Type': 'application/json',
                    "access_token": token
                }
            }
            );

            const result = response.data
            navigation.navigate('Payment', { paymentResult: result.redirect_url });

        } catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('access_token')
                console.log(token);
                const { data } = await axios({
                    url: `${BASE_URL}/order/detail/1`,
                    method: 'get',
                    headers: {
                        'access_token': token
                    }
                })
                // console.log(data, ',,, STATE')
                setDataProduct(data.Products)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    console.log(dataProduct, "<<<<<<<<<<<,");
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={pickupCords}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker image={image} coordinate={location.pickupCords} />
                    <Marker coordinate={dropLocationCors} />
                    <MapViewDirections
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
                    />
                </MapView>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text style={{justifyContent:true, marginLeft:30}}>Detail Order</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, marginLeft:25, marginHorizontal:30 }}>
                        <Button title='Chat' onPress={()=>{
                            navigation.navigate('Chat')
                        }}/>
                        <Button title='Pay now' onPress={payment} />
                    </View > 
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 120, marginVertical: 10 }}>
                        <Text style={{fontWeight:'bold', marginLeft:10}}>Product</Text>
                        <Text style={{fontWeight:'bold'}}>Harga</Text>
                        <Text style={{fontWeight:'bold'}}>Total</Text>
                    </View>
                    {dataProduct?.map((el) => {
                        return (
                            <View key={el?.id} style={{ marginTop: 10, display: 'flex', flexDirection: 'row', gap: 120 }}>
                                <Text style={{marginLeft:10}}>{el?.productName}</Text>
                                <Text>{el?.price}</Text>
                                <Text>{el?.OrderDetail?.quantity}</Text>
                            </View>
                        )
                    })}
                </View>
            </BottomSheet>
        </View>
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
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
});


export default MapTracking