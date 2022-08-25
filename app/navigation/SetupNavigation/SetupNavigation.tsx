import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, AccessibilityInfo, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import appConfig from '../../../app.json';
import { theme, mixins } from '../../styles';
import { getAllCredentials, initialize, pollWalletState } from '../../store/slices/wallet';
import { LoadingIndicator, SafeScreenView, ErrorDialog, AccessibleView, PasswordInput, ConfirmModal } from '../../components';
import walletImage from '../../assets/wallet.png';
import { useAccessibilityFocus } from '../../hooks';
import { db } from '../../model';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { navigationRef } from '../../navigation';

import styles from './SetupNavigation.styles';
import type {
  StartStepProps,
  CreateStepProps,
  PasswordStepProps,
  ForFadeType,
  CustomMethodStepProps,
} from './SetupNavigation.d';
import { importWallet, performImport, pickWalletFile } from '../../lib/import';
import { getAllDidRecords, mintDid } from '../../store/slices/did';
import { RestoreDetails } from '../SettingsNavigation/SettingsNavigation';

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
      <Stack.Screen name="CustomMethodStep" component={CustomMethodStep} />
      <Stack.Screen
        name="CreateStep"
        component={CreateStep}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen name="RestoreDetails" component={RestoreDetails} />
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
          title="Quick Setup (Recommended)"
          onPress={() => navigation.navigate('PasswordStep', { nextStep: 'CreateStep' })}
        />
      </View>
      <View style={[mixins.buttonGroup, styles.topMargin]}>
        <Button
          buttonStyle={[mixins.button, mixins.buttonSecondary]}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitleSecondary}
          title="Custom"
          onPress={() => navigation.navigate('PasswordStep', { nextStep: 'CustomMethodStep' })}
        />
      </View>
    </SafeScreenView>
  );
}

function PasswordStep({ navigation, route }: PasswordStepProps) {
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
      navigation.navigate(route.params.nextStep, { password });
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

function CustomMethodStep({ navigation, route }: CustomMethodStepProps) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reopenModal, setReopenModal] = useState(false);
  const [done, setDone] = useState(false);
  const [importReport, setImportReport] = useState({});

  const reportSummary = Object.keys(importReport).join('\n');

  async function _importWallet() {
    const file = await pickWalletFile();
    setModalIsOpen(true);
    await db.initialize(route.params.password);
    await db.unlock(route.params.password);
    const report = await performImport(file);
    setImportReport(report);
    setDone(true);

    dispatch(getAllCredentials());
    dispatch(getAllDidRecords());
  }

  async function goToDetails() {
    setReopenModal(true);
    setModalIsOpen(false);
    navigation.navigate('RestoreDetails', { importReport });
  }

  React.useEffect(() => {
    // reopen the modal when the user comes back from the page.
    const unsubscribe = navigation.addListener('focus', () => {
      if (reopenModal) {
        setReopenModal(false);
        setModalIsOpen(true);
      }
    });

    return unsubscribe;
  }, [navigation, reopenModal]);

  return (
    <SafeScreenView style={styles.customMethodContainer}>
      <AccessibleView style={styles.customMethodStepContainer} label="Step 2 of 2">
        <Text style={styles.stepText}>1</Text>
        <View style={styles.stepDivider} />
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 2</Text>
      </AccessibleView>
      <ConfirmModal
        open={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        cancelButton={false}
        confirmButton={done}
        title={done ? 'Existing Wallet Added' : 'Adding Existing Wallet'}
        confirmText="View Wallet"
        onConfirm={() => {
          dispatch(pollWalletState());
        }}
      >
        {done ? (
          <>
            <Text style={styles.reportSummary}>{reportSummary}</Text>
            <Button
              buttonStyle={styles.reportButtonClear}
              titleStyle={styles.reportButtonClearTitle}
              containerStyle={styles.reportButtonClearContainer}
              title="Details"
              onPress={goToDetails}
            />
          </>
        ) : (
          <>
            <Text style={styles.reportSummary}>This will only take a moment.</Text>
            <View style={styles.reportLoadingContainer}>
              <AnimatedEllipsis style={styles.loadingDots} minOpacity={0.4} animationDelay={200}/>
            </View>
          </>
        )}
      </ConfirmModal>
      <Text style={styles.header} accessibilityRole="header">
        Custom
      </Text>
      <Text style={styles.paragraphRegular}>To add an existing wallet, scan a valid QR code or upload a wallet file (.dcc) from your device.</Text>
      <View style={mixins.buttonGroup}>
        <Button
          buttonStyle={[mixins.button, mixins.buttonIcon]}
          containerStyle={mixins.buttonIconContainer}
          titleStyle={mixins.buttonIconTitle}
          title="Scan QR code"
          onPress={() => {}}
          iconRight
          icon={
            <MaterialIcons
              name="qr-code-scanner"
              color={theme.color.iconInactive}
              size={theme.iconSize}
            />
          }
        />
      </View>
      <View style={mixins.buttonContainer}>
        <Button
          buttonStyle={[mixins.button, mixins.buttonIcon]}
          containerStyle={mixins.buttonIconContainer}
          titleStyle={mixins.buttonIconTitle}
          title="Restore from a file"
          onPress={_importWallet}
          iconRight
          icon={
            <MaterialIcons
              name="upload-file"
              color={theme.color.iconInactive}
              size={theme.iconSize}
            />
          }
        />
      </View>
      <View style={mixins.buttonGroup}>
        {
          !done && (
            <Button
              buttonStyle={[mixins.button, styles.buttonClear]}
              containerStyle={styles.buttonClearContainer}
              titleStyle={[mixins.buttonTitle, styles.buttonClearTitle]}
              title="Cancel"
              onPress={() => navigation.goBack()}
            />
          )
        }
      </View>
    </SafeScreenView>
  );
}
