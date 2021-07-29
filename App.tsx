import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import Theme from './style/colors';
import Home from './components/routes/home';
import Share from './components/routes/share';
import Add from './components/routes/add';
import Settings from './components/routes/settings';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          activeColor={Theme.iconActive}
          inactiveColor={Theme.iconInactive}
          labeled={false}
          shifting={true}
          barStyle={{
            backgroundColor: Theme.backgroundSecondary,
          }}
        >
          <Tab.Screen name="Home" component={Home} options={{
            title: "Home",
            tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={22} />,
          }}/>
          <Tab.Screen name="Share" component={Share} options={{
            title: "Share",
            tabBarIcon: ({ color }) => <MaterialIcons name="share" color={color} size={22} />,
          }}/>
          <Tab.Screen name="Add" component={Add} options={{
            title: "Add",
            tabBarIcon: ({ color }) => <MaterialIcons name="add-circle" color={color} size={22} />,
          }}/>
          <Tab.Screen name="Settings" component={Settings} options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <MaterialIcons name="settings" color={color} size={22} />,
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
