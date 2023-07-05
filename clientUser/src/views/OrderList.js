import React from 'react';
import { SafeAreaView, Pressable, View, StyleSheet, Text, Image, Dimensions, FlatList } from 'react-native';
const { height, width } = Dimensions.get('window');
import { TextInput, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

export default function OrderList({ navigation }) {
  const articels = [
    { id: 1, text: "Tama dan Fauzi", uri: 'https://www.doktermobil.com/wp-content/uploads/2021/11/Bengkel-Mobil-Terdekat-Surabaya.jpg' },
    { id: 2, text: 'Fauzi dan Tama', uri: 'https://naiandianji.com/wp-content/uploads/2020/04/Bengkel-Mobil-9.jpg' },
    { id: 3, text: "Tama", uri: 'https://i0.wp.com/news.olx.co.id/wp-content/uploads/2021/10/2b3065df-4b50-47cc-9526-10fe32cc2cd2.jpeg?resize=696%2C416&ssl=1' },
    { id: 4, text: "f\Fauzi", uri: "https://carsworld.co.id/wp-content/uploads/2020/04/Carfix-1.jpg" },
  ];

  const CustomCard = ({ text, uri }) => {
    return (
      <View style={styles.containerCustomCard}>
        <Image source={{ uri }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textCustomCard}>{text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* <IconButton
            icon={() => <MaterialCommunityIcons name="cart" size={20} color="white" />}
            style={styles.button}
            onPress={() => {
              navigation.navigate('WaitingScreenMitra');
            }}
          /> */}
          <Pressable onPress={() => {
            navigation.navigate('WaitingScreenMitra');
          }
          }>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
              style={{ height:40, width: 40, marginTop: 7, marginLeft: 10 }}
            >
              <Path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Svg>
          </Pressable>
          <IconButton
            icon={() => <MaterialCommunityIcons name="message-text" size={20} color="white" />}
            style={styles.button}
            onPress={() => {
              console.log('chat');
            }}
          />
        </View>
        {/* <View style={styles.translucentBoxAdress}> */}
        {/* <Text style={styles.translucentText}>Address</Text> */}
        {/* </View> */}
        {/* <View style={styles.translucentBoxRatings}> */}
        {/* <Text style={styles.translucentText}>Ratings</Text> */}
        {/* </View> */}
      </View>
    );
  };

  const renderArticels = ({ item }) => (
    <Pressable onPress={() => {
      navigation.navigate('', {
        id: item.id,
        name: item.text,
        img: item.uri,
      });
    }}>
      <CustomCard text={item.text} uri={item.uri} />
    </Pressable>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={styles.containerSafe}>
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', flexDirection: 'row' }}>
          <Button onPress={() => {
            console.log(navigation, "<<<")
            navigation.openDrawer()
          }
          }>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
              style={{ height: 25, width: 25, marginTop: 12, marginLeft: 10 }}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </Svg>
          </Button>
        </View>
        <View style={styles.green}>
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal={false}
              data={articels}
              renderItem={renderArticels}
              keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: 'red'
    // marginHorizontal: 10,
    // marginVertical: 10,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
