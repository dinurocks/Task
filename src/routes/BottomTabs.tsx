import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNames} from '../constants/routeName';
import Home from '../screens/main/Home';
import Dashboard from '../screens/main/Dashboard';
import Contact from '../screens/main/Contact';
import Users from '../screens/main/Users';
import Profile from '../screens/main/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';
import {scale} from 'react-native-size-matters';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.grey,
        tabBarLabelStyle: {
          fontSize: scale(10),
          fontWeight: '600',
        },
        tabBarStyle: {
          height: Platform.select({
            android: scale(48),
            ios: scale(70),
          }),
        },
      }}>
      <Tab.Screen
        name={BottomTabNames.Home}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              color={focused ? colors.black : colors.grey}
              size={scale(16)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabNames.Dashboard}
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="bar-chart"
              color={focused ? colors.black : colors.grey}
              size={scale(16)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabNames.Contact}
        component={Contact}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="information-circle"
              color={focused ? colors.black : colors.grey}
              size={scale(18)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabNames.Users}
        component={Users}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="people"
              color={focused ? colors.black : colors.grey}
              size={scale(18)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabNames.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="person"
              color={focused ? colors.black : colors.grey}
              size={scale(16)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
