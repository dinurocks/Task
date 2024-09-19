import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {colors} from '../constants/colors';

interface Props extends PressableProps {
  title: string;
  btnStyle?: ViewStyle;
  isLoading?: boolean;
}

const CustomButton = ({title, btnStyle, isLoading, ...rest}: Props) => {
  return (
    <Pressable
      disabled={isLoading}
      style={({pressed}) => [
        styles.btn,
        btnStyle,
        {
          opacity: pressed ? 0.6 : 1,
        },
      ]}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} size={'small'} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    height: scale(36),
    borderRadius: scale(8),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(16),
    fontWeight: '600',
    color: colors.white,
  },
});
