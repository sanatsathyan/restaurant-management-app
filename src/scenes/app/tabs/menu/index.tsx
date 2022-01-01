import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {BSHeader, BSModal, BSTextBox} from '../../../../components';
import {MenuState, MenuType} from '../../../../redux/menu/reducer';
import CartSummary from './cartSummary';
import {ICart, ICartOrder} from './interfaces';
import OrderItems from './orderItems';
import VerifyOrder from './verifyOrder';
import {AddOrder} from '../../../../redux/orders/actions';
import {OrderType} from '../../../../redux/orders/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {ReducerType} from '../../../../redux/store';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
};

const Menu: React.FC<Props> = ({navigation}) => {
  const [showVerify, setShowVerify] = useState<boolean>(false);
  const [cart, setCart] = useState<ICart>({
    MemberId: '',
    KOTId: '',
    Orders: [],
  } as ICart);
  const state = useSelector<ReducerType>(state => state.menu) as MenuState;

  const dispatch = useDispatch();

  const setMemberIdInCart = (memberId: string) => {
    setCart({...cart, MemberId: memberId});
  };

  const setKOTIdInCart = (kotId: string) => {
    setCart({...cart, KOTId: kotId});
  };

  const updateCart = (item: MenuType, quantity: number) => {
    var cartCopy = cart.Orders ? [...cart.Orders] : [];
    const index = cartCopy.findIndex(r => r.FoodId === item.FoodId);
    if (index >= 0) {
      cartCopy[index].Quantity = quantity;
    } else {
      const newFood: ICartOrder = {
        FoodId: item.FoodId,
        FoodName: item.FoodName,
        Price: item.Price,
        Quantity: quantity,
      };
      cartCopy = [...cartCopy, newFood];
    }
    setCart({...cart, Orders: cartCopy.filter(item => item.Quantity > 0)});
  };

  const verifyOrder = () => {
    Keyboard.dismiss();
    if (!cart.MemberId) {
      Toast.show({
        type: 'error',
        text1: 'Oops 😟',
        text2: 'You forgot to enter the Member ID!',
      });
    } else if (!cart.KOTId) {
      Toast.show({
        type: 'error',
        text1: 'Oops 😟',
        text2: 'You forgot to enter the KOT ID!',
      });
    } else {
      setShowVerify(true);
      //setCart({} as ICart);
    }
  };

  const confirmOrder = (order: OrderType) => {
    dispatch(AddOrder(order));
    Toast.show({
      type: 'success',
      text1: 'Great! 😃',
      text2: 'Order has been added!',
    });
    setShowVerify(false);
    setCart({} as ICart);
    navigation.navigate('Orders');
  };

  return !showVerify ? (
    <>
      <BSHeader title="Menu" hideBackButton />
      <View style={styles.container}>
        {state.items && state.items.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <BSTextBox
              label="Enter Member ID"
              style={{flex: 1, marginRight: 6}}
              value={cart.MemberId}
              onChangeText={text => setMemberIdInCart(text)}
            />
            <BSTextBox
              label="Enter KOT ID"
              style={{flex: 1, marginLeft: 6}}
              value={cart.KOTId}
              onChangeText={text => setKOTIdInCart(text)}
            />
          </View>
        )}

        <OrderItems
          cartOrders={cart.Orders}
          redirectToMenuConfiguration={() => navigation.navigate('Menu')}
          updateCart={updateCart}
        />
        {cart.Orders && cart.Orders.length > 0 && (
          <CartSummary cart={cart} verifyOrder={verifyOrder} />
        )}
      </View>
    </>
  ) : (
    <VerifyOrder
      cart={cart}
      confirmOrder={confirmOrder}
      onBack={() => setShowVerify(false)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Menu;
