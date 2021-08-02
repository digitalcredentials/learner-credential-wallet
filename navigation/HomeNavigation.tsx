import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Theme from '../style/colors';
import { HomeScreen, ShareScreen, AddScreen, SettingsScreen } from '../screens';

const Tab = createMaterialBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      activeColor={Theme.iconActive}
      inactiveColor={Theme.iconInactive}
      labeled={false}
      shifting={true}
      barStyle={{
        backgroundColor: Theme.backgroundSecondary,
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
