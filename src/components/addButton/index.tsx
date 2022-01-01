import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BSLabel} from '..';
import {themeColors, themeGap} from '../../theme';

import Icon from 'react-native-vector-icons/Entypo';

type Props = {
  value: number;
  onValueChange(value: number): void;
};

const BSAddButton: React.FC<Props> = ({value: value, onValueChange}) => {
  const handleAdd = () => {
    const newValue = value + 1;
    onValueChange(newValue);
  };

  const handleMinus = () => {
    if (value > 0) {
      const newValue = value - 1;
      onValueChange(newValue);
    }
  };

  return (
    <View style={styles.addButtonContainer}>
      {value === 0 ? (
        <TouchableOpacity onPress={handleAdd}>
          <BSLabel style={styles.addButtonText} title="ADD" />
        </TouchableOpacity>
      ) : (
        <View style={styles.addButtons}>
          <TouchableOpacity style={styles.plusMinus} onPress={handleMinus}>
            <Icon
              name="minus"
              size={14}
              color={themeColors.PRIMARY_COLOR}></Icon>
          </TouchableOpacity>
          <BSLabel style={styles.addButtonText} title={value.toString()} />
          <TouchableOpacity style={styles.plusMinus} onPress={handleAdd}>
            <Icon
              name="plus"
              size={14}
              color={themeColors.PRIMARY_COLOR}></Icon>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

BSAddButton.defaultProps = {
  value: 0,
};

const styles = StyleSheet.create({
  addButtonContainer: {
    borderColor: themeColors.PRIMARY_COLOR,
    borderWidth: 1,
    width: 84,
    alignItems: 'center',
  },
  addButtonText: {
    color: themeColors.PRIMARY_COLOR,
    padding: themeGap.small,
  },
  addButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //width: '100%',
    alignItems: 'center',
  },
  plusMinus: {
    padding: themeGap.small,
  },
});

export default BSAddButton;
