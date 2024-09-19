import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNames} from '../constants/routeName';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AuthStackNames.Login} component={Login} />
      <Stack.Screen name={AuthStackNames.Signup} component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
