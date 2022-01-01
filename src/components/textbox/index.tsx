import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {themeColors} from '../../theme';

type Props = {
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText(text: string): void;
  ref?: React.Ref<TextInput> | undefined;
  maxLength?: number | undefined;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  style?: StyleProp<TextStyle>;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
};

const BSTextBox: React.FC<Props> = props => {
  return (
    <PaperTextInput
      ref={props.ref}
      style={[styles.textInput, props.style]}
      mode="flat"
      keyboardType={props.keyboardType}
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      disabled={props.disabled}
      returnKeyType={props.returnKeyType}
      onSubmitEditing={props.onSubmitEditing}
      maxLength={props.maxLength}
      blurOnSubmit
      theme={{
        colors: {
          background: themeColors.TRANSPARENT,
          backdrop: themeColors.TRANSPARENT,
        },
      }}
    />
  );
};

BSTextBox.defaultProps = {
  value: '',
  disabled: false,
};

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    margin: 0,
    height: 56,
  },
});

export default BSTextBox;
