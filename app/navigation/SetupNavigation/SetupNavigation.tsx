import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { theme, mixins } from '../../styles';
import { initialize } from '../../store/slices/wallet';
import { LoadingIndicator, SafeScreenView, ErrorDialog } from '../../components';
import walletImage from '../../assets/wallet.png';

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
      <Stack.Screen name="CreateStep" component={CreateStep} />
      <Stack.Screen
        name="PasswordStep"
        component={PasswordStep}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

function StartStep({ navigation }: StartStepProps) {
  return (
    <SafeScreenView style={[styles.container, styles.containerMiddle]}>
      <Image style={styles.image} source={walletImage} />
      <Text style={styles.title}>EDU Wallet</Text>
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

function CreateStep({ route }: CreateStepProps) {
  const { password } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);

      setTimeout(() => {
        dispatch(initialize(password));
      }, 500);
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return (
    <SafeScreenView style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>1</Text>
        <View style={styles.stepDivider} />
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 2</Text>
      </View>
      <Text style={styles.header}>Creating Wallet</Text>
      <Text style={styles.paragraphRegular}>This will only take a moment.</Text>
      <View style={styles.loadingContainer}>
        <LoadingIndicator loading={loading} />
      </View>
    </SafeScreenView>
  );
}

function PasswordStep ({ navigation }: PasswordStepProps) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorText, setErrorText] = useState('');

  const isPasswordValid = password.length >= 10 && password === passwordConfirm;

  useEffect(() => {
    if (isPasswordValid) {
      setErrorText('');
    }
  }, [isPasswordValid]);

  function _onInputBlur() {
    if (password && passwordConfirm) {
      if (password.length < 10) setErrorText('Password must contain at least 10 characters');
      else if (password !== passwordConfirm) setErrorText('Passwords must match');
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
      <View style={styles.stepContainer}>
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 1</Text>
        <View style={styles.stepDivider} />
        <Text style={styles.stepText}>2</Text>
      </View>
      <Text style={styles.header}>Password</Text>
      <Text style={styles.paragraphRegular}>
        Setup a password to secure your wallet. You will not be able to recover
        a lost password.
      </Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={mixins.input}
          autoCompleteType="off"
          textContentType="newPassword"
          passwordRules="minlength: 10;"
          secureTextEntry
          autoCorrect={false}
          value={password}
          outlineColor={theme.color.textPrimary}
          selectionColor={theme.color.foregroundPrimary}
          theme={{ colors: {
            placeholder: theme.color.textPrimary,
            text: theme.color.textPrimary,
            primary: theme.color.brightAccent,
          }}}
          label="Password"
          mode="outlined"
          onChangeText={setPassword}
          keyboardAppearance="dark"
          onBlur={_onInputBlur}
        />
        <View style={styles.inputSeparator} />
        <TextInput
          style={mixins.input}
          autoCompleteType="off"
          textContentType="newPassword"
          passwordRules="minlength: 10;"
          secureTextEntry
          autoCorrect={false}
          value={passwordConfirm}
          outlineColor={theme.color.textPrimary}
          selectionColor={theme.color.foregroundPrimary}
          theme={{ colors: {
            placeholder: theme.color.textPrimary,
            text: theme.color.textPrimary,
            primary: theme.color.brightAccent,
          }}}
          label="Confirm Password"
          mode="outlined"
          onChangeText={setPasswordConfirm}
          keyboardAppearance="dark"
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
