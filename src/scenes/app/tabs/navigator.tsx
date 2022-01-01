import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {themeColors, themeGap} from '../../../theme';

import ReportsScreen from './reports';
import OrdersScreen from './orders';
import MenuScreen from './menu';
import SettingsScreen from './more';

const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  const tabIconColor = themeColors.SECONDARY_COLOR;
  const inactiveTabIconColor = themeColors.PRIMARY_COLOR;

  return (
    <Tab.Navigator
      initialRouteName="Menu"
      style={{
        margin: themeGap.base,
      }}
      activeColor={themeColors.SECONDARY_COLOR}
      inactiveColor={themeColors.WHITE}
      barStyle={{
        backgroundColor: themeColors.LIGHT_PRIMARY_COLOR,
        borderColor: themeColors.PRIMARY_COLOR,
        borderWidth: 3,
        borderRadius: themeGap.xlarge,
        overflow: 'hidden',
        shadowColor: themeColors.TRANSPARENT,
      }}>
      <Tab.Screen
        name="OrderMenu"
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="calendar-month"
              color={focused ? tabIconColor : inactiveTabIconColor}
              size={26}
            />
          ),
        }}
        component={MenuScreen}
      />
      <Tab.Screen
        name="Orders"
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="cake-variant"
              color={focused ? tabIconColor : inactiveTabIconColor}
              size={26}
            />
          ),
        }}
        component={OrdersScreen}
      />
      <Tab.Screen
        name="Reports"
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="chart-bar"
              color={focused ? tabIconColor : inactiveTabIconColor}
              size={26}
            />
          ),
        }}
        component={ReportsScreen}
      />
      <Tab.Screen
        name="More"
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="rhombus-split"
              color={focused ? tabIconColor : inactiveTabIconColor}
              size={26}
            />
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};
