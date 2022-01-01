import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BSLabel} from '..';
import {themeColors, themeGap} from '../../theme';

type Props = {
  options: string[];
  defaultValue?: string;
  mode: 'single' | 'multiple';
  onChange(value: string): void;
};

const BSChips: React.FC<Props> = ({options, defaultValue, onChange}) => {
  const [value, setValue] = useState(defaultValue || '');

  const onChipPress = (selectedItem: string) => {
    setValue(selectedItem);
    onChange(selectedItem);
  };

  return (
    <View style={styles.chipsContainer}>
      {options &&
        options.map((item, key) => (
          <TouchableOpacity
            style={[styles.chip, item === value && styles.selected]}
            onPress={() => onChipPress(item)}
            key={key}>
            <BSLabel
              style={[styles.chipText, item === value && styles.selectedText]}
              title={item}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: themeColors.PRIMARY_COLOR,
    marginRight: themeGap.small,
    marginBottom: themeGap.small,
    paddingHorizontal: themeGap.base,
    paddingVertical: themeGap.small,
  },
  selected: {
    backgroundColor: themeColors.PRIMARY_COLOR,
  },
  chipText: {
    color: themeColors.PRIMARY_COLOR,
  },
  selectedText: {
    color: themeColors.WHITE,
  },
});

export default BSChips;
