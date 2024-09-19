import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import {RootStackNames} from '../../constants/routeName';
import CustomText from '../../components/CustomText';
import {scale} from 'react-native-size-matters';

const Profile = () => {
  const navigation = useNavigation();
  const {currentUser} = auth();
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(StackActions.replace(RootStackNames.Auth));
    } catch (err) {
      console.log('handle logout err', err);
    }
  };
  return (
    <View style={styles.container}>
      <CustomText textStyle={styles.commonTextStyle}>
        {currentUser?.displayName}
      </CustomText>
      <CustomText textStyle={styles.commonTextStyle}>
        {currentUser?.email}
      </CustomText>

      <CustomButton
        title="Logout"
        onPress={handleLogout}
        btnStyle={{marginTop: scale(20)}}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: scale(20),
  },
  commonTextStyle: {
    fontSize: scale(14),
    marginBottom: scale(5),
    fontWeight: '600',
    textAlign: 'center',
  },
});
