import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {BSButton, BSHeader, BSLabel} from '../../../components';
import {ReducerType} from '../../../redux/store';
import {OrderState, OrderType} from '../../../redux/orders/reducer';
import {OrderStatusEnum} from '../../../helpers/enum';
import OrdersCard from '../tabs/orders/ordersCard';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {themeColors, themeFontSize, themeGap} from '../../../theme';
import moment from 'moment';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
};

const AllOrders: React.FC<Props> = ({navigation}) => {
  const state = useSelector<ReducerType>(state => state.orders) as OrderState;

  const orders = state.orders.filter(
    order => order.Status !== OrderStatusEnum.STARTED,
  );

  return (
    <View style={styles.container}>
      <BSHeader title="Past Orders" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.ordersSection}>
        <View onStartShouldSetResponder={() => true}>
          {orders.length > 0 ? (
            orders
              .sort((a, b) =>
                moment(a.Date).format('YYMMDDHmmss') >
                moment(b.Date).format('YYMMDDHmmss')
                  ? -1
                  : 1,
              )
              .map((order: OrderType, key: number) => (
                <OrdersCard
                  key={key}
                  isShowingOpenOrders={false}
                  order={order}
                />
              ))
          ) : (
            <View style={styles.noItems}>
              <BSLabel
                style={{
                  fontSize: themeFontSize.big,
                  color: themeColors.SECONDARY_COLOR,
                }}
                title="Oops!! No orders made so far!!!"></BSLabel>
              <Image
                source={require('../../../assets/images/pastorders.png')}
                style={{height: 210, marginVertical: themeGap.medium}}
                resizeMode="contain"
              />
              <BSButton
                title="TAKE ORDERS"
                onPress={() => navigation.navigate('OrderMenu')}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ordersSection: {padding: themeGap.base},
  noItems: {
    padding: themeGap.large,
    alignItems: 'center',
  },
});

export default AllOrders;
