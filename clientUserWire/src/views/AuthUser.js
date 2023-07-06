import { Pressable, Button, FlatList, StyleSheet, Text, View, Dimensions, TextComponent, TextInput } from 'react-native';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, runOnJS } from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../../server';

export default function AuthUser({ navigation }) {
    const authLogin = async () => {
        const Token = await AsyncStorage.getItem('access_token')
        try {
            if (!Token) {
                navigation.navigate('AuthUser')
            }
            else {
                navigation.navigate('Tabs')
            }

        } catch (error) {
            console.log(error);
        }
    }

    const [data, setData] = useState({})

    const handleOnChangeForm = (field, value) => {
        setData((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmitLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, data);
            const responseData = response.data


            await AsyncStorage.setItem('access_token', responseData.access_token)
            await AsyncStorage.setItem('username', responseData.user.username)
            await AsyncStorage.setItem('userId', responseData.user.id.toString())
            await navigation.navigate('Tabs')
            setData({email: "", password: ""})
        } catch (err) {
            console.log(err,"INI EROR");
            Alert.alert(err.response.data.message);
        }
    };
    const handleSubmitRegister = async () => {
        try {
            const regist = await axios.post(`${BASE_URL}/register`, data);
            imagePosition.value = 1
            const datas = regist.data
            data.email = ''
            data.password = ''
            data.username = ''
            data.phoneNumber = ''
        } catch (err) {
            Alert.alert(err.response.data.message);
        }
    };

    useEffect(() => {
        authLogin()
    }, [])

    const { height, width } = Dimensions.get('window');

    const imagePosition = useSharedValue(1);

    const formButtonScale = useSharedValue(1);

    const [isRegistering, setIsRegistering] = useState(false)

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 2, 0])
        return {
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })

    const closeButtonContainerStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
            transform: [{ rotate: withTiming(interpolation + 'deg', { duration: 1000 }) }]
        }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: imagePosition.value === 0
                ? withDelay(400, withTiming(1, { duration: 800 }))
                : withTiming(0, { duration: 300 })
        }
    })

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: formButtonScale.value }]
        }
    })

    const loginHandler = () => {
        imagePosition.value = 0
        if (isRegistering) {
            runOnJS(setIsRegistering)(false)
        }
    }

    const registerHandler = () => {
        imagePosition.value = 0
        if (!isRegistering) {
            runOnJS(setIsRegistering)(true)
        }
    }

    return (
        <>
            <Animated.View style={styles.container}>
                <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
                    <Svg height={height + 100} width={width}>
                        {isRegistering && (
                            <ClipPath id='clipPathId'>
                                <Ellipse cx={width / 2} rx={height} ry={height + 50} />
                            </ClipPath>
                        )}
                        {!isRegistering && (
                            <ClipPath id='clipPathId'>
                                <Ellipse cx={width / 2} rx={height} ry={height + 100} />
                            </ClipPath>
                        )}
                        <Image
                            href={{ uri: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYWdlfGVufDB8fDB8fHww&w=1000&q=80' }}
                            width={width + 100}
                            height={height + 100}
                            preserveAspectRatio='xMidyMid slice'
                            clipPath='url(#clipPathId)'
                        />
                    </Svg>
                    {isRegistering && (
                        <Animated.View style={[styles.closeButtonContainerRegister, closeButtonContainerStyle]}>
                            <Text onPress={() => imagePosition.value = 1}>X</Text>
                        </Animated.View>
                    )}
                    {!isRegistering && (
                        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
                            <Text onPress={() => imagePosition.value = 1}>X</Text>
                        </Animated.View>
                    )}
                </Animated.View>

                <View style={styles.bottomContainer}>
                    <Animated.View style={buttonAnimatedStyle}>
                        <Pressable style={styles.button} onPress={loginHandler}>
                            <Text style={styles.buttonText}>
                                LOG IN
                            </Text>
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={buttonAnimatedStyle}>
                        <Pressable style={styles.button} onPress={registerHandler}>
                            <Text style={styles.buttonText}>
                                SIGN UP
                            </Text>
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
                        {isRegistering && (
                            <TextInput
                                placeholder='Username'
                                placeholderTextColor='black'
                                onChangeText={(value) => handleOnChangeForm('username', value)}
                                value={data.username}
                                style={styles.textInput}
                            />
                        )}
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor='black'
                            onChangeText={(value) => handleOnChangeForm('email', value)}
                            value={data.email}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder='Password'
                            textContentType='password'
                            placeholderTextColor='black'
                            onChangeText={(value) => handleOnChangeForm('password', value)}
                            value={data.password}
                            secureTextEntry={true}
                            style={styles.textInput}
                        />
                        {isRegistering && (
                            <TextInput
                                placeholder='Phone Number'
                                placeholderTextColor='black'
                                onChangeText={(value) => handleOnChangeForm('phoneNumber', value)}
                                value={data.phoneNumber}
                                style={styles.textInput}
                            />
                        )}
                        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                            {isRegistering &&
                                <Button style={styles.buttonText} title="SIGN UP" onPress={handleSubmitRegister} />
                            }
                            {!isRegistering &&
                                <Button style={styles.buttonText} title="LOG IN" onPress={handleSubmitLogin} />
                            }
                        </Animated.View>
                    </Animated.View>
                </View>
            </Animated.View >
        </>
    );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
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
        // borderColor: 'white'
    },
    buttonText: {
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#FFF',
        // marginTop: 13,
        // letterSpacing: 0.5
    },
    bottomContainer: {
        justifyContent: 'center',
        height: height / 3
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 10
    },
    formButton: {
        backgroundColor: 'black',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        // borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }, formInputContainer: {
        marginBottom: 70,
        ...StyleSheet.absoluteFill,
        zIndex: -1,
        justifyContent: 'center'
    },
    closeButtonContainer: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        top: -20
    },
    closeButtonContainerRegister: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        top: -70
    }

})