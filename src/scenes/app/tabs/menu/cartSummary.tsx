import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BSLabel} from '../../../../components';

import Icon from 'react-native-vector-icons/Ionicons';
import {themeColors, themeContants, themeGap} from '../../../../theme';
import {ICart} from './interfaces';

import * as Animatable from 'react-native-animatable';

type Props = {
  cart: ICart;
  verifyOrder(): void;
};

const AnimatedTouchableOpacity =
  Animatable.createAnimatableComponent(TouchableOpacity);

const CartSummary: React.FC<Props> = ({cart, verifyOrder}) => {
  const totalQuantity = cart.Orders.reduce((prev, curr) => {
    return prev + curr.Quantity;
  }, 0);

  const totalCost = cart.Orders.reduce((prev, curr) => {
    return prev + curr.Price * curr.Quantity;
  }, 0);

  return (
    <AnimatedTouchableOpacity
      useNativeDriver
      animation="bounceIn"
      duration={1000}
      style={styles.selection}
      onPress={verifyOrder}>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', marginBottom: 2}}>
          <BSLabel
            style={[styles.selectionText]}
            title={`${totalQuantity} item(s)`}
          />
          <BSLabel style={[styles.selectionText]} title=" | " />
          <BSLabel
            style={[styles.selectionText]}
            title={`${themeContants.currency + totalCost}`}
          />
        </View>
        {/* <BSLabel
          style={[styles.selectionText, {fontSize: 12}]}
          title="Some text comes here"></BSLabel> */}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BSLabel
          style={[styles.selectionText, {marginRight: themeGap.small}]}
          title="Verify Order"
        />
        <Icon
          name="ios-fast-food-outline"
          color={themeColors.WHITE}
          size={18}
        />
      </View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selection: {
    backgroundColor: themeColors.PRIMARY_COLOR,
    paddingVertical: themeGap.base,
    paddingHorizontal: themeGap.medium,
    borderRadius: themeGap.xlarge,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: themeGap.small,
  },
  selectionText: {
    color: themeColors.WHITE,
  },
});

export default CartSummary;
