import {StyleSheet, Text, TextProps, TextStyle, View} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../constants/colors';
interface Props extends TextProps {
  children: ReactNode;
  textStyle?: TextStyle;
}
const CustomText = ({children, textStyle, ...rest}: Props) => {
  return (
    <Text style={[styles.text, textStyle]} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
  },
});
