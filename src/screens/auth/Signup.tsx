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
import {insertUser} from '../../services/DatabaseService';

const signUpValidationSchema = yup.object().shape({
  name: yup.string().trim().required('Required'),
  email: yup.string().trim().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(6, ({min}) => 'Minimum 8 characters')
    .max(20, ({max}) => 'Maximum 20 characters')
    .required('Required'),
  confirmPass: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Signup = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values: FormikValues) => {
    Keyboard.dismiss();
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User account created & signed in!');
        auth()
          .currentUser?.updateProfile({
            displayName: values.name,
          })
          .then(() => {
            insertUser(values.email, values.name);
            setLoading(false);
          });
      })
      .catch(error => {
        setLoading(false);

        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
      });
  };

  const {handleChange, handleSubmit, errors, touched} = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
    },
    onSubmit: handleSignup,
    validationSchema: signUpValidationSchema,
  });

  const handleLogin = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <CustomInput
        label="Name"
        onChangeText={handleChange('name')}
        errorMessage={errors.name && touched.name ? errors.name : ''}
      />
      <CustomInput
        label="Email"
        onChangeText={handleChange('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        errorMessage={errors.email && touched.email ? errors.email : ''}
      />
      <CustomInput
        label="Password"
        onChangeText={handleChange('password')}
        secureTextEntry
        errorMessage={
          errors.password && touched.password ? errors.password : ''
        }
      />
      <CustomInput
        label="Confirm Password"
        onChangeText={handleChange('confirmPass')}
        secureTextEntry
        errorMessage={
          errors.confirmPass && touched.confirmPass ? errors.confirmPass : ''
        }
      />
      <CustomButton
        isLoading={loading}
        title="Signup"
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
          Don't have an account?{' '}
          <CustomText textStyle={styles.signupText} onPress={handleLogin}>
            Login
          </CustomText>
        </CustomText>
      </View>
    </ScrollView>
  );
};

export default Signup;

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
