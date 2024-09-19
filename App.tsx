import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/routes/RootStack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {createUserTable} from './src/services/DatabaseService';

const App = () => {
  useEffect(() => {
    createUserTable();
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <RootStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
