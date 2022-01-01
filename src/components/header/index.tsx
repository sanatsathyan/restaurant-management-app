import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {themeColors, themeFontSize, themeGap} from '../../theme';
import BSLabel from '../label';

type Props = {
  title: string;
  onBack?(): void;
  hideBackButton?: boolean;
};

const BSHeader: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      {!props.hideBackButton && (
        <TouchableOpacity style={styles.icon} onPress={props.onBack}>
          <Icon
            name="arrow-back-ios"
            color={themeColors.PRIMARY_COLOR}
            size={themeGap.large}
          />
        </TouchableOpacity>
      )}
      <BSLabel style={styles.title} title={props.title}></BSLabel>
    </View>
  );
};

BSHeader.defaultProps = {
  hideBackButton: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: themeGap.base,
    alignItems: 'center',
  },
  icon: {
    marginRight: themeGap.xsmall,
  },
  title: {
    flex: 1,
    fontSize: themeFontSize.large,
    color: themeColors.PRIMARY_COLOR,
  },
});

export default BSHeader;
