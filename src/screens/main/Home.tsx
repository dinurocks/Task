import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../components/CustomText';
import {scale} from 'react-native-size-matters';
import {greetingMessage} from '../../helpers/greetings';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreetingMessage();
  }, []);

  const setGreetingMessage = async () => {
    await auth().currentUser?.reload();
    let msg = greetingMessage();
    setGreeting(msg);
  };
  return (
    <View style={styles.container}>
      <CustomText textStyle={styles.greetingText}>{greeting}</CustomText>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});
