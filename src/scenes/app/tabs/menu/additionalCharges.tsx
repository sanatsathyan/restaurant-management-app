import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BSButton, BSChips, BSLabel, BSTextBox} from '../../../../components';
import {themeGap} from '../../../../theme';
import {IAdditionalCharges} from './interfaces';

type Props = {
  charges: string[];
  total: number;
  onClose(): void;
  handleAdditionalCharges(newAdditionalCharge: IAdditionalCharges): void;
};

const AdditionalCharges: React.FC<Props> = ({
  charges,
  total,
  onClose,
  handleAdditionalCharges,
}) => {
  const [chargeType, setChargeType] = useState(charges[0]);
  const [valueType, setValueType] = useState('%');
  const [value, setValue] = useState('');

  const saveAdditionalCharges = () => {
    const newAdditionalCharge: IAdditionalCharges = {
      ChargeName: chargeType,
      ChargeDisplayName:
        chargeType + (valueType === '%' ? '(' + value + '%)' : ''),
      ChargeValue:
        (valueType === '%'
          ? Math.round((total * parseFloat(value)) / 100)
          : parseFloat(value)) * (chargeType === 'Discount' ? -1 : 1),
    };
    handleAdditionalCharges(newAdditionalCharge);
    onClose();
  };

  const valueTypes = ['%', 'Value'];

  return (
    <>
      <BSLabel style={styles.addHeaders} title={'Additional Charge Type?'} />
      <BSChips
        options={charges}
        defaultValue={charges[0]}
        mode="single"
        onChange={ct => setChargeType(ct)}
      />
      <BSLabel
        style={styles.addHeaders}
        title={'Additional Charge Value Type?'}
      />
      <BSChips
        options={valueTypes}
        defaultValue={valueTypes[0]}
        mode="single"
        onChange={vt => setValueType(vt)}
      />
      <View style={styles.menuTextBox}>
        <BSTextBox
          keyboardType="numeric"
          label={`${chargeType} (${valueType})`}
          value={value}
          maxLength={5}
          onChangeText={text => setValue(text)}></BSTextBox>
      </View>
      <BSButton
        title="Save"
        onPress={saveAdditionalCharges}
        disabled={!value || parseInt(value) <= 0}></BSButton>
      <BSButton
        mode="text"
        title="CLOSE"
        onPress={() => {
          setChargeType('Discount');
          setValueType('Percentage');
          setValue('0');
          onClose();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addHeaders: {
    marginTop: themeGap.small,
    marginBottom: themeGap.base,
  },
  menuTextBox: {
    marginBottom: themeGap.base,
  },
});

export default AdditionalCharges;
