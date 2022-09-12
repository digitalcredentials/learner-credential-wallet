import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, AccessibilityInfo } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, CheckBox } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch } from '../../hooks';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import appConfig from '../../../app.json';
import { theme, mixins } from '../../styles';
import { initialize, pollWalletState } from '../../store/slices/wallet';
import { LoadingIndicator, SafeScreenView, AccessibleView, PasswordForm } from '../../components';
import walletImage from '../../assets/wallet.png';
import { useAccessibilityFocus, useAsyncValue } from '../../hooks';

import styles from './SetupNavigation.styles';
import type {
  StartStepProps,
  CreateStepProps,
  PasswordStepProps,
  ForFadeType,
  CustomMethodStepProps,
  SetupNavigationParamList,
} from './SetupNavigation.d';

import { isBiometricsSupported } from '../../lib/biometrics';
import { ReportDetails } from '../../lib/import';
import { DetailsScreen } from '../../screens';
import { ImportFileModal } from '../../components';
import type { ImportFileModalHandle } from '../../components';

const Stack = createStackNavigator<SetupNavigationParamList>();

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
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
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
          onPress={() => navigation.navigate('PasswordStep')}
        />
      </View>
      <View style={[mixins.buttonGroup, styles.topMargin]}>
        <Button
          buttonStyle={[mixins.button, mixins.buttonSecondary]}
          containerStyle={mixins.buttonContainer}
          titleStyle={mixins.buttonTitleSecondary}
          title="Custom"
          onPress={() => navigation.navigate('PasswordStep', { isCustomSetup: true })}
        />
      </View>
    </SafeScreenView>
  );
}

function PasswordStep({ navigation, route }: PasswordStepProps) {
  const [enableBiometrics, setEnableBiometrics] = useState(false);
  const [biometricsSupported] = useAsyncValue(isBiometricsSupported);
  const [password, setPassword] = useState<string>();
  const { isCustomSetup = false } = route?.params ?? {};

  function _goToNextStep() {
    if (password !== undefined) {
      navigation.navigate(isCustomSetup ? 'CustomMethodStep' : 'CreateStep', {
        password,
        enableBiometrics,
      });
    }
  }

  function _onPressBiometrics() {
    setEnableBiometrics(!enableBiometrics);
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
      <View style={styles.body}>
        <PasswordForm onChangePassword={setPassword} style={styles.inputGroup} focusOnMount />
        {biometricsSupported && (
          <>
            <View style={styles.inputSeparator} />
            <TouchableWithoutFeedback onPress={_onPressBiometrics}>
              <View style={styles.biometricsButton}>
                <CheckBox
                  checked={enableBiometrics}
                  checkedColor={theme.color.buttonPrimary}
                  containerStyle={[mixins.checkboxContainer, styles.checkboxContainer]}
                />
                <Text style={styles.biometricsButtonText}>Use biometrics to unlock</Text>
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
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
          disabled={!password}
          disabledStyle={mixins.buttonDisabled}
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
  const { password, enableBiometrics } = route.params;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [titleRef, focusTitle] = useAccessibilityFocus<Text>();

  async function _initializeWallet() {
    await dispatch(initialize({ passphrase: password, enableBiometrics }));
    await dispatch(pollWalletState());
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
          disabledStyle={mixins.buttonDisabled}
          disabledTitleStyle={mixins.buttonTitle}
        />
      </View>
    </SafeScreenView>
  );
}

function CustomMethodStep({ navigation, route }: CustomMethodStepProps) {
  const { password, enableBiometrics } = route.params;
  const [done, setDone] = useState(false);
  const importModalRef = useRef<ImportFileModalHandle>(null);
  const dispatch = useAppDispatch();

  async function importWallet(data: string) {
    const reportDetails = await dispatch(initialize({ passphrase: password, enableBiometrics, existingWallet: data })).unwrap();
    setDone(true);

    return reportDetails;
  }

  function onPressRestoreFromFile() {
    importModalRef.current?.doImport();
  }

  function onPressDetails(reportDetails: ReportDetails) {
    navigation.navigate('DetailsScreen', {
      header: 'Restored Wallet Details',
      details: reportDetails,
    });
  }

  function updateWalletState() {
    dispatch(pollWalletState());
  }

  return (
    <SafeScreenView style={styles.customMethodContainer}>
      <AccessibleView style={styles.customMethodStepContainer} label="Step 2 of 2">
        <Text style={styles.stepText}>1</Text>
        <View style={styles.stepDivider} />
        <Text style={[styles.stepText, styles.stepTextActive]}>Step 2</Text>
      </AccessibleView>
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
          onPress={onPressRestoreFromFile}
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
        {!done && (
          <Button
            buttonStyle={[mixins.button, styles.buttonClear]}
            containerStyle={styles.buttonClearContainer}
            titleStyle={[mixins.buttonTitle, styles.buttonClearTitle]}
            title="Cancel"
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
      <ImportFileModal
        ref={importModalRef}
        onPressDetails={onPressDetails}
        importItem={importWallet}
        onFinished={updateWalletState}
        textConfig={restoreWalletTextConfig}
      />
    </SafeScreenView>
  );
}

const restoreWalletTextConfig = {
  loadingTitle: 'Restoring From File',
  lockedTitle: 'Wallet Locked',
  lockedBody: 'Enter the correct password restore this wallet.',
  finishedTitle: 'Restore Complete',
  finishedButton: 'View Wallet',
  errorBody: 'The wallet could not be restored.',
};
