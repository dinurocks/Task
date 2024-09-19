import {StyleSheet, Text, View, TextInputProps, TextInput} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {colors} from '../constants/colors';

interface Props extends TextInputProps {
  label: string;
}

const CustomInput = ({label, ...rest}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: scale(14),
    color: colors.grey,
    flex: 1,
  },
  input: {
    borderWidth: scale(1),
    borderColor: colors.grey,
    flex: 1,
    height: scale(36),
    borderRadius: scale(8),
    marginBottom: scale(10),
    paddingStart: scale(5),
    color: colors.black,
  },
});
