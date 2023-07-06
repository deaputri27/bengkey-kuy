import React, { useEffect, useRef } from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

function Payment({ route }) {
  const { paymentResult } = route.params;
  // console.log(paymentResult, ">>>>>>>>>>>>");

  return (
  <SafeAreaView>
    <View style={{ flex: 1 }}>
      <WebView
        // ref={webViewRef}
        source={{ uri: paymentResult }}
        // onMessage={handleWebViewMessage}
        />
    </View>
        </SafeAreaView>
  
  );
}

export default Payment;