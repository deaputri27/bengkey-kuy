import * as React from 'react';
import { Dimensions, View, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function CarouselUser() {
  const width = Dimensions.get('window').width;

  const images = [
    'https://th.bing.com/th/id/OIP.O58uIDrQc_wkB3Kde5gmFgHaDt?w=326&h=175&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    'https://montiro.id/_ipx/_/https://api.montiro.id/storage/images/konten/eE3SQGnKu1tFUhwbzTJP.jpeg',
    'https://hondabintangsolo.co.id/wp-content/uploads/2020/12/WhatsApp-Image-2020-12-22-at-13.22.19.jpeg',
  ];

  return (
    <>
      <Carousel
        loop
        width={width - 20}
        height={width / 2}
        autoPlay={true}
        data={[0, 1, 2]}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              paddingBottom: 10,
              paddingRight: 10,
              width: 380,
              borderRadius: 20,
              overflow: 'hidden', // Ensure the image stays within the rounded boundaries
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
                overflow: 'hidden', // Ensure the image stays within the rounded boundaries
              }}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: images[index] }}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

export default CarouselUser;
