import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import MenuList from './menuList';
import MenuSearch from './search';
import {themeColors, themeFontSize, themeGap} from '../../../theme';
import {BSButton, BSHeader, BSLabel} from '../../../components';
import MenuModal from './menuModals';
import {MenuState, MenuType} from '../../../redux/menu/reducer';
import {useSelector} from 'react-redux';
import {ReducerType} from '../../../redux/store';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
};

export interface MenuItem {
  key: number;
  FoodId: string;
  FoodName: string;
  FoodCategory: string;
  Price: number;
}

const Menu: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const state = useSelector<ReducerType>(state => state.menu) as MenuState;
  const filteredItems = state.filteredItems
    .map((value, index) => {
      return {
        ...value,
        key: index,
      };
    })
    .sort((a, b) => {
      return b.FoodCategory > a.FoodCategory ? -1 : 1;
    });

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BSHeader title="Menu" onBack={handleBack} />
      {!filteredItems || filteredItems.length === 0 ? (
        <View style={styles.noItems}>
          <BSLabel
            style={{
              fontSize: themeFontSize.big,
              color: themeColors.SECONDARY_COLOR,
            }}
            title="Oops!! Menu List is empty!!!"></BSLabel>
          <Image
            source={require('../../../assets/images/nomenu.png')}
            style={{height: 210, marginVertical: themeGap.medium}}
            resizeMode="contain"
          />
          {!modalVisible && (
            <>
              <BSButton
                title="ADD NEW ITEM"
                onPress={() => setModalVisible(true)}
              />
              <BSButton
                style={{marginTop: themeGap.base}}
                title="IMPORT MENU FROM FILE"
                onPress={() => navigation.navigate('Settings')}
              />
            </>
          )}
        </View>
      ) : (
        <>
          <View style={styles.searchSection}>
            <View style={{flex: 1}}>
              <MenuSearch />
            </View>
          </View>
          <MenuList filteredItems={filteredItems} />
          {!modalVisible && (
            <BSButton
              title="ADD NEW ITEM"
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            />
          )}
        </>
      )}
      <MenuModal
        isEdit={false}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        menuItem={{} as MenuType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    margin: themeGap.base,
    borderRadius: themeGap.large,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchSectionItems: {
    marginHorizontal: themeGap.small,
  },
  menuTextBox: {
    marginBottom: themeGap.base,
  },
  suggestions: {
    padding: themeGap.base,
  },
  noItems: {
    padding: themeGap.large,
    alignItems: 'center',
  },
});

export default Menu;
