import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BSButton, BSHeader, BSLabel} from '../../../../components';
import {OrderStatusEnum} from '../../../../helpers/enum';
import {UpdateOrderStatus} from '../../../../redux/orders/actions';
import {OrderState, OrderType} from '../../../../redux/orders/reducer';
import {ReducerType} from '../../../../redux/store';
import {themeColors, themeFontSize, themeGap} from '../../../../theme';
import OpenOrdersCard from './ordersCard';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
};

const Orders: React.FC<Props> = ({navigation}) => {
  const state = useSelector<ReducerType>(state => state.orders) as OrderState;
  const orders = state.orders
    .filter(order => order.Status === OrderStatusEnum.STARTED)
    .sort((a: OrderType, b: OrderType) => {
      return a.Date <= b.Date ? 1 : -1;
    });
  const dispatch = useDispatch();

  const onComplete = (id: string) => {
    const order = orders.find(order => order.OrderId === id) as OrderType;
    order.Status = OrderStatusEnum.COMPLETED;
    statusUpdate(order);
  };

  const onCancel = (id: string) => {
    const order = orders.find(order => order.OrderId === id) as OrderType;
    order.Status = OrderStatusEnum.CANCELLED;
    statusUpdate(order);
  };

  const statusUpdate = (order: OrderType) => {
    dispatch(UpdateOrderStatus(order));
  };

  return (
    <View style={styles.container}>
      <BSHeader title="Open Orders" hideBackButton />
      <ScrollView style={styles.openOrdersSection}>
        <View onStartShouldSetResponder={() => true}>
          {orders.length === 0 ? (
            <View style={styles.noItems}>
              <BSLabel
                style={{
                  fontSize: themeFontSize.big,
                  color: themeColors.SECONDARY_COLOR,
                }}
                title="Oops!! No open orders!!!"></BSLabel>
              <Image
                source={require('../../../../assets/images/orders.png')}
                style={{height: 210, marginVertical: themeGap.medium}}
                resizeMode="contain"
              />
              <BSButton
                title="TAKE ORDERS"
                onPress={() => navigation.navigate('OrderMenu')}
              />
              <BSButton
                style={{marginTop: themeGap.base}}
                title="View past orders"
                onPress={() => navigation.navigate('AllOrders')}
              />
            </View>
          ) : (
            orders.map((item, key) => (
              <OpenOrdersCard
                key={key}
                order={item}
                onComplete={onComplete}
                onCancel={onCancel}
              />
            ))
          )}
        </View>
      </ScrollView>
      {orders.length > 0 && (
        <BSButton
          style={{marginVertical: themeGap.base}}
          title="View past orders"
          onPress={() => navigation.navigate('AllOrders')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openOrdersSection: {
    padding: themeGap.base,
  },
  noItems: {
    padding: themeGap.large,
    alignItems: 'center',
  },
});

export default Orders;
