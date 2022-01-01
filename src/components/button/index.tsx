import React from 'react';
import {StyleProp, Text, ViewStyle} from 'react-native';

import {Button} from 'react-native-paper';
import {themeColors} from '../../theme';

type Props = {
  onPress(): void;
  disabled?: boolean;
  title: string;
  type?: 'primary';
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  style?: StyleProp<ViewStyle>;
};

const BSButton: React.FC<Props> = props => {
  return (
    <Button
      mode={props.mode}
      labelStyle={{
        color:
          props.mode !== 'contained'
            ? themeColors.PRIMARY_COLOR
            : themeColors.WHITE,
      }}
      onPress={props.onPress}
      disabled={props.disabled}
      style={props.style}>
      {props.title}
    </Button>
  );
};

BSButton.defaultProps = {
  disabled: false,
  mode: 'contained',
};

export default BSButton;
