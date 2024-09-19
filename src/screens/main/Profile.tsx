import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import {colors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../components/CustomInput';
import {updateUser} from '../../services/DatabaseService';

const Profile = () => {
  const navigation = useNavigation();
  const {currentUser} = auth();
  const inputRef = useRef<TextInput>(null);
  const [name, setName] = useState(currentUser?.displayName ?? '');

  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    try {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => await auth().signOut(),
        },
      ]);
    } catch (err) {
      console.log('handle logout err', err);
    }
  };

  const handleEdit = () => {
    if (!isEditing) {
      setTimeout(() => {
        setIsEditing(true);

        inputRef?.current?.focus();
      });
    } else {
      currentUser
        ?.updateProfile({
          displayName: name,
        })
        .then(() => {
          setIsEditing(false);
          updateUser(currentUser?.email, name);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: scale(20),
        }}>
        <View style={{flex: 1, height: scale(40), width: '100%'}}>
          <TextInput
            ref={inputRef}
            editable={isEditing}
            value={name}
            style={styles.nameInput}
            onChangeText={text => setName(text)}
          />
        </View>

        <Pressable
          onPress={handleEdit}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}>
          <Ionicons
            name={!isEditing ? 'pencil' : 'save'}
            color={colors.blue}
            size={scale(18)}
          />
        </Pressable>
      </View>

      <CustomText textStyle={[styles.commonTextStyle, {color: colors.grey}]}>
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
  label: {
    fontSize: scale(14),
    color: colors.red,
    flex: 1,
  },
  commonTextStyle: {
    fontSize: scale(14),
    marginBottom: scale(5),
    fontWeight: '600',
    borderWidth: 1,
    padding: scale(8),
    borderRadius: scale(8),
  },
  nameInput: {
    height: scale(36),
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: scale(8),
    marginEnd: scale(10),
    color: colors.black,
    fontSize: scale(13),
    flex: 1,
  },
});
