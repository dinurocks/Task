import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import {StackActions, useNavigation} from '@react-navigation/native';
import {AuthStackNames, RootStackNames} from '../../constants/routeName';
import auth from '@react-native-firebase/auth';
import {FormikValues, useFormik} from 'formik';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});
const Login = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: FormikValues) => {
    Keyboard.dismiss();
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.dispatch(StackActions.replace(RootStackNames.BottomTabs));
      })
      .catch(error => {
        Alert.alert('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const {handleChange, handleSubmit, values} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema: loginValidationSchema,
  });

  const handleSignup = () => {
    navigation.navigate(AuthStackNames.Signup);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <CustomInput
        label="Email"
        onChangeText={handleChange('email')}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <CustomInput
        label="Password"
        onChangeText={handleChange('password')}
        secureTextEntry
      />
      <CustomButton
        isLoading={loading}
        title="Login"
        btnStyle={{marginTop: scale(20)}}
        onPress={() => handleSubmit()}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: scale(30),
          alignSelf: 'center',
        }}>
        <CustomText textStyle={{fontSize: scale(14)}}>
          Already have an account?{' '}
          <CustomText textStyle={styles.signupText} onPress={handleSignup}>
            Signup
          </CustomText>
        </CustomText>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: scale(10),
  },
  signupText: {
    fontWeight: '600',
    fontSize: scale(14),
    textDecorationLine: 'underline',
  },
});
