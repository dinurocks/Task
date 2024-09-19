import {StyleSheet, Text, View, TextInputProps, TextInput} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {colors} from '../constants/colors';
import CustomText from './CustomText';
import {ViewStyle} from 'react-native';

interface Props extends TextInputProps {
  label: string;
  errorMessage?: string;
  inputStyle?: ViewStyle;
}

const CustomInput = React.forwardRef<TextInput, Props>(
  ({label, errorMessage, inputStyle, ...rest}, ref) => {
    return (
      <View style={styles.container}>
        <CustomText textStyle={styles.label}>{label}</CustomText>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            inputStyle,
            {borderColor: !!errorMessage ? colors.red : colors.grey},
          ]}
          {...rest}
        />
        <CustomText textStyle={styles.error}>{errorMessage}</CustomText>
      </View>
    );
  },
);

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
    flex: 1,
    height: scale(36),
    borderRadius: scale(8),
    paddingStart: scale(5),
    color: colors.black,
    fontSize: scale(13),
  },
  error: {
    fontSize: scale(12),
    color: colors.red,
    flex: 1,
    marginBottom: scale(5),
  },
});
