/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';




function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [count, setCount] = useState(0)

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.counter} >my first app!!!</Text>
        <Text style={styles.counter} >{count}</Text>
        <Button onPress={()=>{
          setCount(count + 1)
        }} title="+" />
        <Button onPress={()=>{
          setCount(count - 1)
        }}  title="-" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  counter: {
    fontSize: 50,
  },
});

export default App;
