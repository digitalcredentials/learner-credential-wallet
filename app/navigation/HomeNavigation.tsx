import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../styles/theme';
import { HomeScreen, ShareScreen, AddScreen, SettingsScreen } from '../screens';
import { WalletState } from '../store/slices/wallet';
import { RootState } from '../store';

const Tab = createMaterialBottomTabNavigator();

export default ({ navigation }) => {
  const {
    isUnlocked,
    isInitialized,
  } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

  useEffect(() => {
    if (isInitialized && !isUnlocked) {
      navigation.navigate('LoginScreen');
    }
  }, [isUnlocked, isInitialized]);

  // Prevent users from going back
  useEffect(
    () => navigation.addListener('beforeRemove', (e: Event) => e.preventDefault()), 
    [navigation]
  );

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
        tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={theme.iconSize} />,
      }}/>
      <Tab.Screen name="ShareScreen" component={ShareScreen} options={{
        title: "Share",
        tabBarIcon: ({ color }) => <MaterialIcons name="share" color={color} size={theme.iconSize} />,
      }}/>
      <Tab.Screen name="AddScreen" component={AddScreen} options={{
        title: "Add",
        tabBarIcon: ({ color }) => <MaterialIcons name="add-circle" color={color} size={theme.iconSize} />,
      }}/>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{
        title: "Settings",
        tabBarIcon: ({ color }) => <MaterialIcons name="settings" color={color} size={theme.iconSize} />,
      }}/>
    </Tab.Navigator>
  );
}
