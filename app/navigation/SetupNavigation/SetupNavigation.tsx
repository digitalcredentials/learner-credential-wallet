import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, AccessibilityInfo, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import appConfig from '../../../app.json';
import { theme, mixins } from '../../styles';
import { initialize } from '../../store/slices/wallet';
import { LoadingIndicator, SafeScreenView, ErrorDialog, AccessibleView, PasswordInput } from '../../components';
import walletImage from '../../assets/wallet.png';
import { useAccessibilityFocus } from '../../hooks';

import styles from './SetupNavigation.styles';
import type {
  StartStepProps,
  CreateStepProps,
  PasswordStepProps,
  ForFadeType,
} from './SetupNavigation.d';

const Stack = createStackNavigator();

const forFade: ForFadeType = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function SetupNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="StartStep" component={StartStep} />
      <Stack.Screen name="PasswordStep" component={PasswordStep} />
      <Stack.Screen
        name="CreateStep"
        component={CreateStep}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

function StartStep({ navigation }: StartStepProps) {
  return (
    <SafeScreenView style={[styles.container, styles.containerMiddle]}>
      <Image
        style={styles.image}
        source={walletImage}
        accessible
        accessibilityLabel={`${appConfig.displayName} Logo`}
      />
      <Text 
        style={styles.title}
        accessibilityRole="header"
      >
        {appConfig.displayName}
      </Text>
      <Text style={styles.paragraph}>
        A place to store all your credentials. They stay on your device until
        you decide to share them.
      </Text>
      <View style={mixins.buttonGroup}>
        <Button
          buttonStyle={[mixins.button, mixins.buttonPrimary]}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitle}
          title="Start Setup"
          onPress={() => navigation.navigate('PasswordStep')}
        />
      </View>
    </SafeScreenView>
  );
}

function PasswordStep({ navigation }: PasswordStepProps) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorText, setErrorText] = useState('');
  const passwordRef = useRef<TextInput>(null);

  const isPasswordValid = password.length >= 10 && password === passwordConfirm;

  useEffect(() => passwordRef.current?.focus(), []);

  useEffect(() => {
    if (isPasswordValid) {
      setErrorText('');
    }
  }, [isPasswordValid]);

  function _onInputBlur() {
    if (password && passwordConfirm) {
      if (password.length < 10)
        setErrorText('Password must contain at least 10 characters');
      else if (password !== passwordConfirm)
        setErrorText('Passwords must match');
      else setErrorText('');
    }
  }

  function _goToNextStep() {
    if (isPasswordValid) {
      navigation.navigate('CreateStep', { password });
    }
  }

  return (
    <SafeScreenView style={styles.container}>
      <AccessibleView style={styles.stepContainer} label="Step 1 of 2">
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 1</Text>
        <View style={styles.stepDivider} />
        <Text style={styles.stepText}>2</Text>
      </AccessibleView>
      <Text 
        style={styles.header}
        accessibilityRole="header"
      >
        Password
      </Text>
      <Text style={styles.paragraphRegular}>
        Setup a password to secure your wallet. You will not be able to recover
        a lost password.
      </Text>
      <View style={styles.inputGroup}>
        <PasswordInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          onBlur={_onInputBlur}
          inputRef={passwordRef}
        />
        <View style={styles.inputSeparator} />
        <PasswordInput
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          onBlur={_onInputBlur}
          onSubmitEditing={_goToNextStep}
        />
        <View style={styles.inputSeparator} />
        <ErrorDialog message={errorText} />
      </View>
      <View style={mixins.buttonGroup}>
        <Button
          buttonStyle={[mixins.button, styles.buttonClear]}
          containerStyle={styles.buttonClearContainer}
          titleStyle={[mixins.buttonTitle, styles.buttonClearTitle]}
          title="Cancel"
          onPress={() => navigation.navigate('StartStep')}
        />
        <View style={mixins.buttonSeparator} />
        <Button
          buttonStyle={[mixins.button, mixins.buttonPrimary]}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitle}
          title="Next"
          onPress={_goToNextStep}
          disabled={!isPasswordValid}
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
}

function CreateStep({ route }: CreateStepProps) {
  const { password } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [titleRef, focusTitle] = useAccessibilityFocus<Text>();

  function _initializeWallet() {
    dispatch(initialize(password));
  }

  useEffect(() => {
    focusTitle();
    const t = setTimeout(() => {
      setLoading(false);
      AccessibilityInfo.announceForAccessibility('Finished creating wallet');
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return (
    <SafeScreenView style={styles.container}>
      <AccessibleView style={styles.stepContainer} label="Step 2 of 2">
        <Text style={styles.stepText}>1</Text>
        <View style={styles.stepDivider} />
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 2</Text>
      </AccessibleView>
      <Text style={styles.header} ref={titleRef} accessibilityRole="header">
        Creating Wallet
      </Text>
      <Text style={styles.paragraphRegular}>This will only take a moment.</Text>
      <View style={styles.loadingContainer}>
        <LoadingIndicator loading={loading} />
      </View>
      <View style={mixins.buttonGroup}>
        <Button
          buttonStyle={[mixins.button, mixins.buttonPrimary]}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitle}
          title="Take Me To My Wallet"
          onPress={_initializeWallet}
          disabled={loading}
          disabledStyle={styles.buttonDisabled}
          disabledTitleStyle={mixins.buttonTitle}
        />
      </View>
    </SafeScreenView>
  );
}
