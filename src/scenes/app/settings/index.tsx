import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BSHeader, BSLabel} from '../../../components';
import {Slider} from '@miblanchard/react-native-slider';
import {themeColors, themeFontSize, themeGap} from '../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {EditTaxPercentage} from '../../../redux/settings/actions';
import {ReducerType} from '../../../redux/store';
import {SettingsState} from '../../../redux/settings/reducer';
import {Divider} from 'react-native-paper';

import Toast from 'react-native-toast-message';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';

import {MenuState, MenuType} from '../../../redux/menu/reducer';
import {ImportMenu} from '../../../redux/menu/actions';
import {ImportOrders} from '../../../redux/orders/actions';
import {CreateFile, GetFileUrl, ReadFile} from '../../../helpers/file';
import {OrderState, OrderType} from '../../../redux/orders/reducer';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
};

const Settings: React.FC<Props> = ({navigation}) => {
  const state = useSelector<ReducerType>(
    state => state.settings,
  ) as SettingsState;

  const menuState = useSelector<ReducerType>(state => state.menu) as MenuState;
  const orderState = useSelector<ReducerType>(
    state => state.orders,
  ) as OrderState;

  const [tax, setTax] = useState<number>(state.taxPercentage);
  const dispatch = useDispatch();

  const updateTaxPercentage = (taxValue: number) => {
    dispatch(EditTaxPercentage(Math.round(taxValue * 100) / 100));
  };

  const exportData = (fileName: string, content: string) => {
    try {
      CreateFile(fileName, content)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'File Downloaded!',
            text2:
              'Check for a ' + fileName + ' file in your Downloads folder!',
          });
        })
        .catch(err => {
          if (JSON.stringify(err).includes('EACCES')) {
            Toast.show({
              type: 'error',
              text1: 'Export Failed!',
              text2:
                'Delete if there is a ' +
                fileName +
                ' file in your Downloads folder!',
            });
          }
        });
    } catch (err) {}
  };

  const importData = async (type: string) => {
    ReadFile().then(data => {
      try {
        if (type === 'menu') {
          const menus: MenuType[] = data && JSON.parse(data);
          dispatch(ImportMenu(menus));
        } else if (type === 'orders') {
          const orders: OrderType[] = data && JSON.parse(data);
          dispatch(ImportOrders(orders));
        }
        Toast.show({
          type: 'success',
          text1: 'Import Successful!',
          text2: 'Your ' + type + ' data has been updated!',
        });
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Import Failed!',
          text2: 'Make sure you are uploading the right file!',
        });
      }
    });
  };

  const shareData = async () => {
    const fileCopyUri = await GetFileUrl();
    Share.open({
      url: 'file://' + fileCopyUri,
    }).catch(err => console.log(err));
  };

  return (
    <>
      <BSHeader title="Settings" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.section}>
          <BSLabel style={styles.sectionLabel} title="Tax Configuration (%)" />
          <BSLabel
            style={styles.sectionValue}
            title={`${Math.round(tax * 100) / 100}%`}
          />
        </View>
        <Slider
          value={tax}
          step={0.2}
          minimumValue={0}
          maximumValue={20}
          minimumTrackTintColor={themeColors.PRIMARY_COLOR}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
          onSlidingComplete={tax =>
            updateTaxPercentage(parseFloat(tax.toString()))
          }
          onValueChange={tax => setTax(parseFloat(tax.toString()))}
        />
        <Divider style={{marginBottom: themeGap.medium}} />
        <View style={styles.section}>
          <BSLabel
            style={styles.sectionLabel}
            title="Export - Import - Share"
          />
        </View>
        <View style={styles.exportImportSection}>
          <BSLabel title="1. Menu" />
          <View style={styles.exportImportButtonSections}>
            <TouchableOpacity
              style={styles.eisButtons}
              onPress={() =>
                exportData('menu.txt', JSON.stringify(menuState.items))
              }>
              <Icon
                name="cloud-upload-outline"
                color={themeColors.PRIMARY_COLOR}
                size={themeGap.xlarge}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.eisButtons}
              onPress={() => importData('menu')}>
              <Icon
                name="cloud-download-outline"
                color={themeColors.PRIMARY_COLOR}
                size={themeGap.xlarge}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.eisButtons} onPress={shareData}>
              <Icon
                name="share-social-outline"
                color={themeColors.PRIMARY_COLOR}
                size={themeGap.xlarge}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.exportImportSection}>
          <BSLabel title="2. Orders" />
          <View style={styles.exportImportButtonSections}>
            <TouchableOpacity
              style={styles.eisButtons}
              onPress={() =>
                exportData('orders.txt', JSON.stringify(orderState.orders))
              }>
              <Icon
                name="cloud-upload-outline"
                color={themeColors.PRIMARY_COLOR}
                size={themeGap.xlarge}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.eisButtons}
              onPress={() => importData('orders')}>
              <Icon
                name="cloud-download-outline"
                color={themeColors.PRIMARY_COLOR}
                size={themeGap.xlarge}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.eisButtons} onPress={shareData}>
              <Icon
                name="share-social-outline"
                color={themeColors.PRIMARY_COLOR}
                size={themeGap.xlarge}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: themeGap.base,
  },
  section: {
    flexDirection: 'row',
    paddingHorizontal: themeGap.base,
  },
  sectionLabel: {
    flex: 1,
    alignSelf: 'center',
    fontSize: themeFontSize.medium,
  },
  sectionValue: {
    fontSize: themeFontSize.medium,
  },
  thumb: {
    backgroundColor: themeColors.PRIMARY_COLOR,
    borderColor: themeColors.PRIMARY_COLOR,
    borderRadius: 30 / 2,
    borderWidth: 2,
    height: 30,
    width: 30,
  },
  track: {
    borderRadius: 3,
    height: 6,
  },
  exportImportSection: {
    marginTop: themeGap.base,
    paddingHorizontal: themeGap.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exportImportButtonSections: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eisButtons: {
    marginLeft: themeGap.medium,
  },
});

export default Settings;
