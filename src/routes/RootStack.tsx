import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackNames} from '../constants/routeName';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    console.log({user});
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!user ? (
        <Stack.Screen name={RootStackNames.Auth} component={AuthStack} />
      ) : (
        <Stack.Screen name={RootStackNames.BottomTabs} component={BottomTabs} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
