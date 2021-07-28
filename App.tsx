import 'react-native-gesture-handler';

import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Theme from './style/colors';
import Home from './components/routes/home';
import Share from './components/routes/share';
import Add from './components/routes/add';
import Settings from './components/routes/settings';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          activeColor={Theme.iconActive}
          inactiveColor={Theme.iconInactive}
          barStyle={{
            backgroundColor: Theme.backgroundSecondary,
          }}
        >
          <Tab.Screen name="Home" component={Home} options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Ionicons name="home" color={color} />,
          }}/>
          <Tab.Screen name="Share" component={Share} options={{
            title: "Share",
            tabBarIcon: ({ color }) => <Ionicons name="share" color={color} />,
          }}/>
          <Tab.Screen name="Add" component={Add} options={{
            title: "Add",
            tabBarIcon: ({ color }) => <Ionicons name="add-circle" color={color} />,
          }}/>
          <Tab.Screen name="Settings" component={Settings} options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <Ionicons name="cog-outline" color={color} />,
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
