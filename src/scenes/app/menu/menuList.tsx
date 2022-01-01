import React, {useState} from 'react';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {
  themeColors,
  themeContants,
  themeFontSize,
  themeGap,
} from '../../../theme';
import {MenuType} from '../../../redux/menu/reducer';
import {BSLabel} from '../../../components';
import {DeleteMenuItem} from '../../../redux/menu/actions';
import MenuModal from './menuModals';
import {MenuItem} from '.';

type Props = {
  filteredItems: MenuItem[];
};

const MenuList: React.FC<Props> = ({filteredItems}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuItem, setMenuItem] = useState<MenuType>({} as MenuType);
  const dispatch = useDispatch();

  const deleteMenuItem = (item: MenuType) => {
    dispatch(DeleteMenuItem(item.FoodId));
  };

  const editMenuItem = (
    item: MenuType,
    rowMap: RowMap<MenuType>,
    rowKey: string,
  ) => {
    setMenuItem(item);
    setModalVisible(true);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  return (
    <>
      <SwipeListView
        bounces={false}
        data={filteredItems}
        renderItem={data => (
          <View style={styles.list}>
            <Icon
              name="ios-fast-food-outline"
              size={24}
              color={themeColors.SECONDARY_COLOR}
            />
            <View style={styles.foodNameCategory}>
              <BSLabel
                style={styles.foodName}
                title={data.item.FoodName}></BSLabel>
              <BSLabel
                style={styles.foodCategory}
                title={data.item.FoodCategory}></BSLabel>
            </View>
            <BSLabel
              title={`${
                themeContants.currency +
                (data.item.Price && data.item.Price.toString())
              }`}></BSLabel>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                editMenuItem(data.item, rowMap, data.item.key.toString())
              }>
              <BSLabel
                style={{color: themeColors.WHITE}}
                title={'Edit'}></BSLabel>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => deleteMenuItem(data.item)}>
              <BSLabel
                style={{color: themeColors.WHITE}}
                title={'Delete'}></BSLabel>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
      {menuItem && (
        <MenuModal
          isEdit={true}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          menuItem={menuItem}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    padding: themeGap.small,
    backgroundColor: themeColors.BACKGROUND_COLOR,
    alignItems: 'center',
    borderBottomColor: themeColors.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  foodNameCategory: {
    flex: 1,
    paddingHorizontal: themeGap.small,
  },
  foodName: {
    fontSize: themeFontSize.medium,
    color: themeColors.SECONDARY_COLOR,
  },
  foodCategory: {
    fontSize: themeFontSize.base,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: themeGap.base,
    backgroundColor: themeColors.PRIMARY_COLOR,
  },
});

export default MenuList;
