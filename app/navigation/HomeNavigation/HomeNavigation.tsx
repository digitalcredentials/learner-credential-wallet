import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../../styles/theme';
import { HomeScreen, ShareScreen, AddScreen, SettingsScreen } from '../../screens';
import type { TabIconProps } from './HomeNavigation.d';
import type { HomeNavigationProps } from '../AppNavigation/AppNavigation.d';
import { WalletState, getAllCredentials } from '../../store/slices/wallet';
import { RootState } from '../../store';

const Tab = createMaterialBottomTabNavigator();

const HomeTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="home" color={color} size={theme.iconSize} />;
const ShareTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="share" color={color} size={theme.iconSize} />;
const AddTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="add-circle" color={color} size={theme.iconSize} />;
const SettingsTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="settings" color={color} size={theme.iconSize} />;

export default function HomeNavigation({ navigation }: HomeNavigationProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    isUnlocked,
    isInitialized,
  } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

  useEffect(() => {
    if (isInitialized && !isUnlocked) {
      navigation.navigate('LoginScreen');
    }
  }, [isUnlocked, isInitialized]);

  useEffect(() => {
    dispatch(getAllCredentials());
  }, []);

  // Prevent users from going back
  useEffect(
    () => navigation.addListener('beforeRemove', (e) => e.preventDefault()), 
    [navigation],
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
        title: 'Home',
        tabBarIcon: HomeTabIcon,
      }}/>
      <Tab.Screen name="ShareScreen" component={ShareScreen} options={{
        title: 'Share',
        tabBarIcon: ShareTabIcon,
      }}/>
      <Tab.Screen name="AddScreen" component={AddScreen} options={{
        title: 'Add',
        tabBarIcon: AddTabIcon,
      }}/>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{
        title: 'Settings',
        tabBarIcon: SettingsTabIcon,
      }}/>
    </Tab.Navigator>
  );
}
