import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../../styles/theme';
import CredentialNavigation from '../../navigation/CredentialNavigation/CredentialNavigation';
import AddCredentialNavigation from '../../navigation/AddCredentialNavigation/AddCredentialNavigation';
import SettingsNavigation from '../../navigation/SettingsNavigation/SettingsNavigation';
import { ShareScreen } from '../../screens';
import type { TabParamList, TabIconProps } from './HomeNavigation.d';

const Tab = createMaterialBottomTabNavigator<TabParamList>();

const HomeTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="home" color={color} size={theme.iconSize} />;
const ShareTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="share" color={color} size={theme.iconSize} />;
const AddTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="add-circle" color={color} size={theme.iconSize} />;
const SettingsTabIcon = ({ color }: TabIconProps) => <MaterialIcons name="settings" color={color} size={theme.iconSize} />;

export default function HomeNavigation(): JSX.Element {
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
      <Tab.Screen name="CredentialNavigation" component={CredentialNavigation} options={{
        title: 'Home',
        tabBarIcon: HomeTabIcon,
      }}/>
      <Tab.Screen name="ShareScreen" component={ShareScreen} options={{
        title: 'Share',
        tabBarIcon: ShareTabIcon,
      }}/>
      <Tab.Screen name="AddCredentialNavigation" component={AddCredentialNavigation} options={{
        title: 'Add',
        tabBarIcon: AddTabIcon,
      }}/>
      <Tab.Screen name="SettingsNavigation" component={SettingsNavigation} options={{
        title: 'Settings',
        tabBarIcon: SettingsTabIcon,
      }}/>
    </Tab.Navigator>
  );
}
