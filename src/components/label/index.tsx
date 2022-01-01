import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {themeContants} from '../../theme';

type Props = {
  title: string;
  style?: any;
};

const BSLabel: React.FC<Props> = ({title, style}) => {
  return <Text style={[styles.text, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: themeContants.fontFamily,
  },
});

export default BSLabel;
