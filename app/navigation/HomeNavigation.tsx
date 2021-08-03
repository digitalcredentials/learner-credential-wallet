import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../styles/theme';
import { HomeScreen, ShareScreen, AddScreen, SettingsScreen } from '../screens';

const Tab = createMaterialBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      activeColor={theme.color.iconActive}
      inactiveColor={theme.color.iconInactive}
      labeled={false}
      shifting={true}
      barStyle={{
        backgroundColor: theme.color.backgroundSecondary,
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
        title: "Home",
        tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={22} />,
      }}/>
      <Tab.Screen name="ShareScreen" component={ShareScreen} options={{
        title: "Share",
        tabBarIcon: ({ color }) => <MaterialIcons name="share" color={color} size={22} />,
      }}/>
      <Tab.Screen name="AddScreen" component={AddScreen} options={{
        title: "Add",
        tabBarIcon: ({ color }) => <MaterialIcons name="add-circle" color={color} size={22} />,
      }}/>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{
        title: "Settings",
        tabBarIcon: ({ color }) => <MaterialIcons name="settings" color={color} size={22} />,
      }}/>
    </Tab.Navigator>
  );
}
