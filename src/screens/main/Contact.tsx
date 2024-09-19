import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {FormikValues, useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import * as yup from 'yup';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import {
  getUserContact,
  insertUser,
  upsertUserContact,
} from '../../services/DatabaseService';

const contactValidationSchema = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}/, 'Phone number is invalid')
    .min(10, 'Phone number must be exactly 10 digits')
    .max(10, 'Phone number must be exactly 10 digits')
    .required('Required'),
  address: yup.string().trim().required('Required'),
});

const Contact = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleContact = async (values: FormikValues) => {
    Keyboard.dismiss();
    setLoading(true);
    upsertUserContact(auth().currentUser?.email, values.mobile, values.address);
    setLoading(false);
    fetchDetails();
    Alert.alert('Contact saved successfully');
  };

  const {handleChange, handleSubmit, errors, touched, setFieldValue, values} =
    useFormik({
      initialValues: {
        mobile: '',
        address: '',
      },
      onSubmit: handleContact,
      validationSchema: contactValidationSchema,
    });

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    getUserContact(auth().currentUser?.email, (error, contact) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Contact Details:', contact);
        setFieldValue('mobile', contact.Mobile);
        setFieldValue('address', contact.Address);
        // You can now use contact.Email, contact.Mobile, contact.Address, etc.
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <CustomInput
        value={values.mobile}
        label="Mobile No"
        onChangeText={handleChange('mobile')}
        errorMessage={errors.mobile && touched.mobile ? errors.mobile : ''}
        keyboardType="number-pad"
      />
      <CustomInput
        value={values.address}
        label="Address"
        onChangeText={handleChange('address')}
        autoCapitalize="none"
        errorMessage={errors.address && touched.address ? errors.address : ''}
        multiline
        inputStyle={{
          maxHeight: scale(150),
          height: 'auto',
        }}
      />

      <CustomButton
        isLoading={loading}
        title="Save Contact"
        btnStyle={{marginTop: scale(20)}}
        onPress={() => handleSubmit()}
      />
    </ScrollView>
  );
};

export default Contact;

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
