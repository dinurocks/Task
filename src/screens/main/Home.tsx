import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomText from '../../components/CustomText';
import {greetingMessage} from '../../helpers/greetings';

const Home = () => {
  return (
    <View style={styles.container}>
      <CustomText textStyle={styles.greetingText}>
        {greetingMessage()}
      </CustomText>
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
