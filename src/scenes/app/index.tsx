import React from 'react';

import MenuScreen from './menu';
import AllOrdersScreen from './allorders';
import SettingsScreen from './settings';
import {themeColors} from '../../theme';
import {StatusBar} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './tabs/navigator';

const Stack = createNativeStackNavigator();

const App: React.FC<{}> = ({}) => {
  return (
    <>
      <StatusBar backgroundColor={themeColors.WHITE} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AllOrders" component={AllOrdersScreen} />
      </Stack.Navigator>
    </>
  );
};

export default App;
