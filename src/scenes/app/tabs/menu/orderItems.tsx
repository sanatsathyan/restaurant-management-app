import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {BSAddButton, BSButton, BSLabel} from '../../../../components';
import {MenuState, MenuType} from '../../../../redux/menu/reducer';
import {ReducerType} from '../../../../redux/store';
import {
  themeColors,
  themeContants,
  themeFontSize,
  themeGap,
} from '../../../../theme';
import {ICartOrder} from './interfaces';

type Props = {
  cartOrders: ICartOrder[];
  redirectToMenuConfiguration(): void;
  updateCart(item: MenuType, quantity: number): void;
};

const OrderItems: React.FC<Props> = ({
  cartOrders,
  updateCart,
  redirectToMenuConfiguration,
}) => {
  const state = useSelector<ReducerType>(state => state.menu) as MenuState;

  const categoryWiseItems = state.items.reduce(function (r, a) {
    r[a.FoodCategory] = r[a.FoodCategory] || [];
    r[a.FoodCategory].push(a);
    return r;
  }, Object.create(null));

  return !state.items || state.items.length === 0 ? (
    <View style={styles.noItems}>
      <BSLabel
        style={{
          fontSize: themeFontSize.big,
          color: themeColors.SECONDARY_COLOR,
        }}
        title="Oops!! No items found in the menu!!!"></BSLabel>
      <Image
        source={require('../../../../assets/images/closed.png')}
        style={{height: 210, marginVertical: themeGap.medium}}
        resizeMode="contain"
      />
      <BSButton
        title="CONFIGURE MENU ITEMS"
        onPress={redirectToMenuConfiguration}
      />
    </View>
  ) : (
    <ScrollView style={styles.menu}>
      <View onStartShouldSetResponder={() => true}>
        {Object.keys(categoryWiseItems)
          .sort((a, b) => (b > a ? -1 : 1))
          .map((category, key) => (
            <View key={key}>
              <BSLabel style={styles.category} title={category} />
              {categoryWiseItems[category]
                .sort((a: MenuType, b: MenuType) => {
                  return b.FoodName > a.FoodName ? -1 : 1;
                })
                .map((item: MenuType, key1: number) => (
                  <View key={key1} style={styles.menuCard}>
                    <View>
                      <BSLabel
                        style={styles.menuCardDetailsName}
                        title={item.FoodName}
                      />
                      <BSLabel
                        title={`${themeContants.currency + item.Price}`}
                      />
                    </View>
                    <BSAddButton
                      value={
                        cartOrders
                          ? cartOrders.find(r => r.FoodId === item.FoodId)
                              ?.Quantity || 0
                          : 0
                      }
                      onValueChange={value => updateCart(item, value)}
                    />
                  </View>
                ))}
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'column',
  },
  category: {
    fontSize: themeFontSize.big,
    padding: themeGap.base,
    paddingTop: themeGap.large,
    paddingBottom: 0,
  },
  menuCard: {
    paddingHorizontal: themeGap.medium,
    paddingVertical: themeGap.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: themeColors.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  menuCardDetailsName: {
    fontSize: themeFontSize.medium,
    color: themeColors.SECONDARY_COLOR,
    marginBottom: themeGap.xsmall,
  },
  noItems: {
    padding: themeGap.large,
    alignItems: 'center',
    marginVertical: themeGap.large,
  },
});

export default OrderItems;
