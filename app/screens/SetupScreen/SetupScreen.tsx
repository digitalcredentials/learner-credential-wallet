import React, { useState, useEffect, useRef, createRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Animated,
} from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import theme from '../../styles/theme';
import mixins from '../../styles/mixins';
import { unlock } from '../../store/slices/wallet';
import SafeScreenView from '../../components/SafeScreenView/SafeScreenView';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import styles from './SetupScreen.style';
import type {
  StartStepProps,
  CreateStepProps,
  PasswordStepProps,
  ForFadeType,
} from './SetupScreen.d';

const walletImage = require('../../assets/wallet.png');

const Stack = createStackNavigator();

const forFade: ForFadeType = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const StartStep = ({ navigation }: StartStepProps) => {
  return (
    <SafeScreenView style={[styles.container, styles.containerMiddle]}>
      <Image style={styles.image} source={walletImage} />
      <Text style={styles.title}>EDU Wallet</Text>
      <Text style={styles.paragraph}>
        A place to store all your credentials. They stay on your device until
        you decide to share them.
      </Text>
      <View style={styles.buttonGroup}>
        <Button
          buttonStyle={[mixins.button, styles.buttonPrimary]}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitle}
          title="Start Setup"
          onPress={() => navigation.navigate('CreateStep')}
        />
      </View>
    </SafeScreenView>
  );
};

const CreateStep = ({ navigation }: CreateStepProps) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeScreenView style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 1</Text>
        <View style={styles.stepDivider} />
        <Text style={styles.stepText}>2</Text>
      </View>
      <Text style={styles.header}>Creating Wallet</Text>
      <Text style={styles.paragraphRegular}>This will only take a moment.</Text>
      <View style={styles.loadingContainer}>
        <LoadingIndicator loading={loading} />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          buttonStyle={[mixins.button, styles.buttonClear]}
          containerStyle={mixins.buttonContainer}
          titleStyle={[mixins.buttonTitle, styles.buttonClearTitle]}
          title="Cancel"
          onPress={() => navigation.navigate('StartStep')}
        />
        <View style={styles.buttonSeparator} />
        <Button
          buttonStyle={mixins.button}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitle}
          title="Next"
          onPress={() => navigation.navigate('PasswordStep')}
          disabled={loading}
          disabledStyle={styles.buttonDisabled}
          disabledTitleStyle={mixins.buttonTitle}
          iconRight
          icon={
            <MaterialIcons
              style={styles.arrowIcon}
              name="arrow-forward"
              color={theme.color.backgroundSecondary}
              size={theme.iconSize}
            />
          }
        />
      </View>
    </SafeScreenView>
  );
};

const PasswordStep = ({ navigation }: PasswordStepProps) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorText, setErrorText] = useState('');

  const isPasswordValid = password.length > 0 && password === passwordConfirm;

  useEffect(() => {
    if (isPasswordValid) {
      setErrorText('');
    }
  }, [isPasswordValid]);

  function _onInputBlur() {
    if (password && passwordConfirm) {
      if (password !== passwordConfirm) setErrorText('Passwords must match');
      else setErrorText('');
    }
  }

  return (
    <SafeScreenView style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>1</Text>
        <View style={styles.stepDivider} />
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 2</Text>
      </View>
      <Text style={styles.header}>Password</Text>
      <Text style={styles.paragraphRegular}>
        Setup a password to secure your wallet. You will not be able to recover
        a lost password.
      </Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={mixins.input}
          autoCompleteType="password"
          secureTextEntry
          autoCorrect={false}
          value={password}
          placeholder="Password"
          placeholderTextColor={theme.color.textSecondary}
          onChangeText={setPassword}
          keyboardAppearance="dark"
          onBlur={_onInputBlur}
        />
        <View style={styles.inputSeparator} />
        <TextInput
          style={mixins.input}
          autoCompleteType="password"
          secureTextEntry
          autoCorrect={false}
          value={passwordConfirm}
          placeholder="Confirm Password"
          placeholderTextColor={theme.color.textSecondary}
          onChangeText={setPasswordConfirm}
          keyboardAppearance="dark"
          onBlur={_onInputBlur}
        />
        <Text style={[styles.paragraphRegular, styles.errorText]}>
          {errorText}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          buttonStyle={[mixins.button, styles.buttonClear]}
          containerStyle={mixins.buttonContainer}
          titleStyle={[mixins.buttonTitle, styles.buttonClearTitle]}
          title="Cancel"
          onPress={() => navigation.navigate('StartStep')}
        />
        <View style={styles.buttonSeparator} />
        <Button
          buttonStyle={[mixins.button, styles.buttonPrimary]}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitle}
          title="Finalize"
          onPress={() => dispatch(unlock())}
          disabled={!isPasswordValid}
          disabledStyle={styles.buttonDisabled}
          disabledTitleStyle={mixins.buttonTitle}
        />
      </View>
    </SafeScreenView>
  );
};

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="StartStep" component={StartStep} />
      <Stack.Screen name="CreateStep" component={CreateStep} />
      <Stack.Screen
        name="PasswordStep"
        component={PasswordStep}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
};
