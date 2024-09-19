import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNames} from '../constants/routeName';
import Home from '../screens/main/Home';
import Dashboard from '../screens/main/Dashboard';
import Contact from '../screens/main/Contact';
import Users from '../screens/main/Users';
import Profile from '../screens/main/Profile';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={BottomTabNames.Home} component={Home} />
      <Tab.Screen name={BottomTabNames.Dashboard} component={Dashboard} />
      <Tab.Screen name={BottomTabNames.Contact} component={Contact} />
      <Tab.Screen name={BottomTabNames.Users} component={Users} />
      <Tab.Screen name={BottomTabNames.Profile} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
