import React from 'react';
import { SafeAreaView, Pressable, View, StyleSheet, Text, Image, Dimensions, FlatList, Alert } from 'react-native';
const { height, width } = Dimensions.get('window');
import { TextInput, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapComponent from '../components/MapComponent';
import useStore from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../server';


export default function CardsBengkel({ navigation }) {
  const datas = useStore(state => [
    state.datas
  ])
  const [partnerId,setPartnerId] = useStore(state => [
    state.partnerId,
    state.updatePartnerId
  ])




  const dataMitra = [].concat(...datas)

  const CustomCard = ({ item }) => {
    return (
      <View style={styles.containerCustomCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textCustomCard}>{item.partnerName} ({item.distance / 1000} K.m)</Text>
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            icon={() => <MaterialCommunityIcons name="cart" size={20} color="white" />}
            style={styles.button}
            onPress={()=>{
              setPartnerId(item.id)
              navigation.navigate('FormAwal')
            }}
          />
          <IconButton
            icon={() => <MaterialCommunityIcons name="message-text" size={20} color="white" />}
            style={styles.button}
            onPress={() => {
              console.log('chat');
            }}
          />
        </View>
        {/* <View> */}
        <Text ></Text>
        {/* </View> */}
        <View style={styles.translucentBoxAdress}>
          <Text style={styles.translucentText}>{item.address.length > 20 ? item.address.slice(0, 10) + '...' : item.address}</Text>
        </View>
        <View style={styles.translucentBoxRatings}>
          <Text style={styles.translucentText}>Ratings</Text>
        </View>
      </View>
    );
  };

  const renderArticels = ({ item }) => (
    <CustomCard item={item} />
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={styles.containerSafe}>

        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            color="white"
            size={24}
            onPress={handleGoBack}
          />
        </View>
        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'white' }}>
          <View style={styles.container}>
            <View style={styles.black} >
              <MapComponent navigation={navigation} />
            </View>
          </View>
        </View>
        <View style={styles.green}>
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal={false}
              data={dataMitra}
              renderItem={renderArticels}
              keyExtractor={(item, idx) => idx}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  black: {
    flex: 1,
    width: '100%',
    height: '100%'
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
    width: 350,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 10,
  },
  textCustomCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  translucentBoxRatings: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    // marginBottom: 20
  },
  translucentBoxAdress: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    // marginBottom: 20
  },
  translucentText: {
    color: 'white',
    fontSize: 14,
  },
  containerSafe: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
