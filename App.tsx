import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/routes/RootStack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  createUserContactTable,
  createUserTable,
} from './src/services/DatabaseService';
import {colors} from './src/constants/colors';

const App = () => {
  useEffect(() => {
    createUserTable();
    createUserContactTable();
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
          <RootStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
