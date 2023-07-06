import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground, Dimensions, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../store/store';
import { BASE_URL } from '../../server';
import axios from 'axios';


const { height, width } = Dimensions.get('window');

const InputForm = () => {
  const dataOrder = useStore(state => state.dataOrder)
  const setDataOrder = useStore(state => state.updateOrder)
  const userLoc = useStore(state => state.userLoc)
  const partnerId = useStore(state => state.partnerId)

  const [data, setData] = useState({})

  const datasForm = { ...data, ...userLoc, partnerId }
  const handleOnChangeForm = (field, value) => {
    setData((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const navigation = useNavigation();

  const handleFormSubmit = async () => {
    try {

      const token = await AsyncStorage.getItem('access_token')

      const response = await axios({
        url: `${BASE_URL}/order`,
        method: 'post',
        data: datasForm,
        headers: {
          'access_token': token
        }
      })
      await AsyncStorage.setItem('orderId', response.data.id.toString())
      await AsyncStorage.setItem('status', response.data.paymentStatus)
      // setDataOrder({ id: response.data.id, status: response.data.paymentStatus })
      // console.log(response.data.id);
      // console.log();
      navigation.navigate('TrackOrderDetail');
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async () => {

  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  console.log(dataOrder);
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYWdlfGVufDB8fDB8fHww&w=1000&q=80',
      }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            color="white"
            size={24}
            onPress={handleGoBack}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Problem"
            onChangeText={(value) => handleOnChangeForm('problem', value)}
            value={data.problem}
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                placeholder: '#888',
                text: '#000',
                primary: '#0d47a1',
              },
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Car Brand"
            onChangeText={(value) => handleOnChangeForm('car', value)}
            value={data.carBrand}
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                placeholder: '#888',
                text: '#000',
                primary: '#0d47a1',
              },
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Car Type"
            onChangeText={(value) => handleOnChangeForm('carType', value)}
            value={data.carType}
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                placeholder: '#888',
                text: '#000',
                primary: '#0d47a1',
              },
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="License"
            onChangeText={(value) => handleOnChangeForm('license', value)}
            value={data.license}
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                placeholder: '#888',
                text: '#000',
                primary: '#0d47a1',
              },
            }}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleFormSubmit}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Submit
        </Button>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    // flex: 1,
    // padding: 10,
    width: '90%',
    height: height,
    display: 'flex',
    marginLeft:20

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    // backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#0d47a1',
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default InputForm;
