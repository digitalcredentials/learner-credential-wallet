import React, { forwardRef, Ref, useRef, RefObject } from 'react';
import { View, TextInput, StyleProp, TextStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import { AccessibleView } from '../';
import { mixins, theme } from '../../styles';

import styles from './PasswordInput.styles';

export type PasswordInputProps = {
  inputRef?: RefObject<TextInput>;
  label?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
};

function PasswordInput({
  inputRef,
  label,
  value,
  style,
  onBlur,
  onChangeText,
  onSubmitEditing,
}: PasswordInputProps, ref: Ref<View>): JSX.Element {
  const _inputRef = inputRef || useRef<TextInput>(null);

  return (
    <AccessibleView 
      ref={ref} 
      style={styles.container}
      label={`${label}, Input${value && `, containing ${value.length} characters`}`}
      onPress={() => _inputRef.current?.focus()}
    >
      <PaperTextInput
        style={[mixins.input, style]}
        autoComplete="off"
        textContentType="newPassword"
        passwordRules="minlength: 10;"
        secureTextEntry
        autoCorrect={false}
        value={value}
        outlineColor={theme.color.textPrimary}
        selectionColor={theme.color.foregroundPrimary}
        theme={{ colors: {
          placeholder: theme.color.textPrimary,
          text: theme.color.textPrimary,
          primary: theme.color.brightAccent,
        }}}
        label={label}
        mode="outlined"
        onBlur={onBlur}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        keyboardAppearance="dark"
      />
    </AccessibleView>
  );
}

export default forwardRef<View, PasswordInputProps>(PasswordInput);
