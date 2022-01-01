import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {themeColors, themeContants, themeGap} from '../../../../theme';
import {IAdditionalCharges, ICart} from './interfaces';
import {useSelector} from 'react-redux';
import {BSButton, BSHeader, BSLabel, BSModal} from '../../../../components';
import {DataTable} from 'react-native-paper';
import AdditionalCharges from './additionalCharges';
import Icon from 'react-native-vector-icons/Ionicons';
import {ReducerType} from '../../../../redux/store';
import {SettingsState} from '../../../../redux/settings/reducer';
import {OrderStatusEnum} from '../../../../helpers/enum';
import uuid from 'react-native-uuid';
import {OrderType} from '../../../../redux/orders/reducer';

import * as Animatable from 'react-native-animatable';

type Props = {
  cart: ICart;
  confirmOrder(order: OrderType): void;
  onBack(): void;
};

const AnimatedTouchableOpacity =
  Animatable.createAnimatableComponent(TouchableOpacity);

const VerifyOrder: React.FC<Props> = ({cart, confirmOrder, onBack}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [additionalCharges, setAdditionalCharges] = useState<
    IAdditionalCharges[]
  >([]);

  const settings = useSelector<ReducerType>(
    state => state.settings,
  ) as SettingsState;
  const taxValue = settings.taxPercentage;

  const totalCost = cart.Orders.reduce((prev, curr) => {
    return prev + curr.Price * curr.Quantity;
  }, 0);

  const taxApplicable = Math.round((totalCost * taxValue) / 100);

  const overallTotal = useMemo(() => {
    return (
      totalCost +
      taxApplicable +
      additionalCharges.reduce((prev, current) => {
        return prev + current.ChargeValue;
      }, 0)
    );
  }, [totalCost, taxApplicable, additionalCharges]);

  const charges = ['Discount', 'Breakage'].filter(item => {
    return additionalCharges.length === 0
      ? true
      : !additionalCharges.map(add => add.ChargeName).includes(item);
  });

  const handleAdditionalCharges = (newAdditionalCharge: IAdditionalCharges) => {
    setAdditionalCharges([...additionalCharges, newAdditionalCharge]);
  };

  const deleteAdditionalCharge = (newAdditionalCharge: IAdditionalCharges) => {
    setAdditionalCharges([
      ...additionalCharges.filter(item => item !== newAdditionalCharge),
    ]);
  };

  return (
    <>
      <BSHeader title="Verify Order" onBack={onBack}></BSHeader>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <BSLabel style={styles.member} title={`Member ID: ${cart.MemberId}`} />
        <BSLabel style={styles.member} title={`KOT ID: ${cart.KOTId}`} />
      </View>
      <ScrollView style={{flex: 1}}>
        <View onStartShouldSetResponder={() => true}>
          <DataTable>
            {cart.Orders &&
              cart.Orders.map((item, key) => (
                <DataTable.Row key={key}>
                  <DataTable.Cell>
                    <View>
                      <BSLabel
                        style={styles.menuName}
                        title={item.FoodName}></BSLabel>
                      <View style={styles.orderPriceQuantity}>
                        <BSLabel
                          style={styles.small}
                          title={`${
                            themeContants.currency + item.Price
                          }`}></BSLabel>
                        <BSLabel
                          style={styles.small}
                          title={` - ${item.Quantity} No(s)`}></BSLabel>
                      </View>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {`${themeContants.currency + item.Price * item.Quantity}`}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            <DataTable.Row>
              <DataTable.Cell>TOTAL</DataTable.Cell>
              <DataTable.Cell numeric>{`${
                themeContants.currency + totalCost
              }`}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>{`Tax (${taxValue}%)`}</DataTable.Cell>
              <DataTable.Cell numeric>{`${
                themeContants.currency + taxApplicable
              }`}</DataTable.Cell>
            </DataTable.Row>
            {additionalCharges &&
              additionalCharges.map((item: IAdditionalCharges, key) => (
                <DataTable.Row key={key}>
                  <DataTable.Cell>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <BSLabel
                        title={item.ChargeDisplayName}
                        style={{marginRight: themeGap.small}}
                      />
                      <TouchableOpacity
                        onPress={() => deleteAdditionalCharge(item)}>
                        <BSLabel
                          style={{color: themeColors.PRIMARY_COLOR}}
                          title="(Delete)"
                        />
                      </TouchableOpacity>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{`${
                    themeContants.currency + item.ChargeValue
                  }`}</DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
          <View style={styles.additionalChargesSection}>
            {charges.length > 0 && (
              <BSButton
                mode="text"
                title="Add. Charges"
                onPress={() => setModalVisible(true)}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <AnimatedTouchableOpacity
        useNativeDriver
        animation="bounceIn"
        duration={1000}
        onPress={() =>
          confirmOrder({
            Date: new Date(),
            MemberId: cart.MemberId,
            KOTId: cart.KOTId,
            OrderId: uuid.v4().toString(),
            Orders: cart.Orders,
            AdditionalCharges: additionalCharges,
            BillAmount: totalCost,
            TotalBillAmount: overallTotal,
            Status: OrderStatusEnum.STARTED,
            Tax: taxApplicable,
          })
        }>
        <DataTable.Row
          style={{
            backgroundColor: themeColors.PRIMARY_COLOR,
            padding: themeGap.base,
            borderRadius: themeGap.xlarge,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: themeGap.small,
          }}>
          <DataTable.Cell>
            <BSLabel
              style={styles.total}
              title={`Grand Total | ${themeContants.currency}${
                overallTotal || 0
              }`}></BSLabel>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <BSLabel style={styles.total} title={'Confirm Order '} />
            <Icon
              name="ios-fast-food-outline"
              color={themeColors.WHITE}
              size={18}
            />
          </DataTable.Cell>
        </DataTable.Row>
      </AnimatedTouchableOpacity>
      <BSModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        dismissable>
        <AdditionalCharges
          charges={charges}
          total={totalCost + taxApplicable}
          onClose={() => setModalVisible(false)}
          handleAdditionalCharges={item => handleAdditionalCharges(item)}
        />
      </BSModal>
    </>
  );
};

const styles = StyleSheet.create({
  member: {
    padding: themeGap.base,
    paddingTop: themeGap.base,
    color: themeColors.SECONDARY_COLOR,
  },
  menuName: {
    color: themeColors.SECONDARY_COLOR,
  },
  orderPriceQuantity: {
    flexDirection: 'row',
  },
  small: {
    fontSize: themeGap.base,
  },
  total: {
    color: themeColors.WHITE,
  },
  additionalChargesSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: themeGap.base,
  },
});

export default VerifyOrder;
