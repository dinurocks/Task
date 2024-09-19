import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUsers} from '../../services/DatabaseService';
import {colors} from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '../../components/CustomText';
import {useFocusEffect} from '@react-navigation/native';

const Users = () => {
  const [users, setUsers] = useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      getUsers((data: any) => setUsers(data));
    }, []),
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={users}
        keyExtractor={item => item.ID.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <CustomText textStyle={styles.commonText}>
              Name: {item.Name}
            </CustomText>
            <CustomText textStyle={styles.commonText}>
              Email: {item.Email}
            </CustomText>
            <CustomText textStyle={styles.commonText}>
              Signup Date: {item.SignupDate}
            </CustomText>
          </View>
        )}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  commonText: {
    fontSize: scale(14),
    fontFamily: '500',
  },
  itemContainer: {
    backgroundColor: colors.white,
    padding: scale(10),
    margin: scale(8),
    borderRadius: scale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
