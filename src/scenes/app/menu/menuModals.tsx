import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';

import {BSButton, BSLabel, BSModal, BSTextBox} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {ReducerType} from '../../../redux/store';
import {MenuState, MenuType} from '../../../redux/menu/reducer';
import {AddMenuItem, EditMenuItem} from '../../../redux/menu/actions';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {themeGap} from '../../../theme';

type Props = {
  modalVisible: boolean;
  setModalVisible(set: boolean): void;
  isEdit: boolean;
  menuItem: MenuType;
};

const MenuModal: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
  isEdit,
  menuItem,
}) => {
  const [foodName, setFoodName] = useState(menuItem.FoodName || '');
  const [foodCategory, setFoodCategory] = useState(menuItem.FoodCategory || '');
  const [foodCategorySearchTerm, setFoodCategorySearchTerm] = useState('');
  const [foodPrice, setFoodPrice] = useState(menuItem.Price?.toString() || '');

  //const priceTextBox = React.useRef<TextInput>(null);

  useEffect(() => {
    if (menuItem.FoodId) {
      setFoodName(menuItem.FoodName);
      setFoodCategory(menuItem.FoodCategory);
      setFoodPrice(menuItem.Price.toString());
    }
  }, [menuItem]);

  const state = useSelector<ReducerType>(state => state.menu) as MenuState;
  const dispatch = useDispatch();

  const addMenu = () => {
    if (isEdit) {
      const menu: MenuType = {
        FoodId: menuItem.FoodId,
        FoodName: foodName,
        FoodCategory: foodCategory,
        Price: parseInt(foodPrice),
      };
      dispatch(EditMenuItem(menu));
    } else {
      const menu: MenuType = {
        FoodId: uuid.v4().toString(),
        FoodName: foodName,
        FoodCategory: foodCategory,
        Price: parseInt(foodPrice),
      };
      dispatch(AddMenuItem(menu));
    }
    setModalVisible(false);
    setFoodName('');
    setFoodCategory('');
    setFoodPrice('');
  };

  return (
    <BSModal
      visible={modalVisible}
      dismissable={false}
      onDismiss={() => setModalVisible(false)}>
      {foodCategory ? (
        <>
          <View>
            <BSTextBox
              label="Category"
              value={foodCategory}
              disabled
              onChangeText={text => setFoodName(text)}></BSTextBox>
          </View>
          <View>
            <BSTextBox
              label="Food Name"
              value={foodName}
              returnKeyType="next"
              onChangeText={text => setFoodName(text)}
              onSubmitEditing={
                () => true
                //priceTextBox?.current?.focus()
              }></BSTextBox>
          </View>
          <View style={styles.menuTextBox}>
            <BSTextBox
              //ref={priceTextBox}
              label="Price (Rs.)"
              value={foodPrice}
              returnKeyType="done"
              keyboardType="numeric"
              onChangeText={text => setFoodPrice(text)}></BSTextBox>
          </View>
          <BSButton
            title="Save"
            onPress={addMenu}
            disabled={!foodName || !foodCategory || !foodPrice}></BSButton>
        </>
      ) : (
        <>
          <View style={styles.menuTextBox}>
            <BSTextBox
              label="Type and Select the Category"
              value={foodCategorySearchTerm}
              onChangeText={text =>
                setFoodCategorySearchTerm(text)
              }></BSTextBox>
          </View>
          <View>
            {[...new Set(state.items.map(item => item.FoodCategory))]
              .filter(
                item =>
                  item &&
                  item
                    .toLocaleUpperCase()
                    .includes(foodCategorySearchTerm.toLocaleUpperCase()),
              )
              .map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      setFoodCategory(item);
                      setFoodCategorySearchTerm('');
                    }}
                    style={styles.suggestions}>
                    <BSLabel title={item} />
                  </TouchableOpacity>
                );
              })}
            {!!foodCategorySearchTerm && (
              <TouchableOpacity
                onPress={() => {
                  setFoodCategory(foodCategorySearchTerm);
                  setFoodCategorySearchTerm('');
                }}
                style={styles.suggestions}>
                <BSLabel title={`${foodCategorySearchTerm}`} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
      <BSButton
        mode="text"
        title="CLOSE"
        onPress={() => {
          setFoodCategory('');
          setFoodCategorySearchTerm('');
          setFoodName('');
          setFoodPrice('');
          setModalVisible(false);
        }}
      />
    </BSModal>
  );
};

const styles = StyleSheet.create({
  menuTextBox: {
    marginBottom: themeGap.base,
  },
  suggestions: {
    padding: themeGap.base,
  },
});

export default MenuModal;
