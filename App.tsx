import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import { AppNavigation } from './app/navigation';
import { ThemeProvider } from './app/components';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </Provider>
  );
}
