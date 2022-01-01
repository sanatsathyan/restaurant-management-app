import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
import {BSButton, BSLabel} from '../../../../components';
import {OrderType} from '../../../../redux/orders/reducer';
import {
  themeColors,
  themeContants,
  themeFontSize,
  themeGap,
} from '../../../../theme';
import moment from 'moment';

type Props = {
  order: OrderType;
  onComplete?(id: string): void;
  onCancel?(id: string): void;
  isShowingOpenOrders?: boolean;
};

const OpenOrdersCard: React.FC<Props> = ({
  order,
  onComplete,
  onCancel,
  isShowingOpenOrders,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <BSLabel
            style={styles.member}
            title={`Member ID - ${order.MemberId}`}
          />
          <BSLabel style={styles.member} title={`KOT ID - ${order.KOTId}`} />
          <BSLabel
            style={{fontSize: themeFontSize.base}}
            title={`${themeContants.currency}${order.TotalBillAmount}`}
          />
        </View>
        <View>
          <BSLabel
            style={styles.status}
            title={`Bill #${moment(order.Date).format('YYMMDDHmmss')}`}
          />
          {!isShowingOpenOrders && (
            <BSLabel style={styles.status} title={`${order.Status}`} />
          )}
          <BSLabel
            title={
              isShowingOpenOrders
                ? moment(order.Date).fromNow()
                : moment(order.Date).calendar()
            }
          />
        </View>
      </View>
      <BSLabel
        style={styles.orders}
        title={
          order.Orders &&
          order.Orders.map(
            order => ' ' + order.FoodName + ' x ' + order.Quantity,
          )
            .join()
            .trimStart()
        }
      />
      {isShowingOpenOrders && (
        <View style={styles.buttonsSection}>
          <BSButton
            type="primary"
            style={styles.button}
            title="COMPLETE"
            onPress={() => onComplete && onComplete(order.OrderId)}
          />
          <BSButton
            mode="outlined"
            style={styles.button}
            title="CANCEL"
            onPress={() => onCancel && onCancel(order.OrderId)}
          />
        </View>
      )}
    </Card>
  );
};

OpenOrdersCard.defaultProps = {
  isShowingOpenOrders: true,
};

const styles = StyleSheet.create({
  card: {
    padding: themeGap.base,
    marginBottom: themeGap.base,
    elevation: 4,
  },
  member: {
    color: themeColors.SECONDARY_COLOR,
    marginBottom: themeGap.xsmall,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orders: {
    borderColor: themeColors.LIGHT_GRAY,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    marginTop: themeGap.small,
    paddingTop: themeGap.small,
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: themeGap.small,
  },
  button: {
    width: '46%',
    color: themeColors.WHITE,
  },
  status: {
    alignSelf: 'flex-end',
    color: themeColors.SECONDARY_COLOR,
    marginBottom: themeGap.xsmall,
  },
});

export default OpenOrdersCard;
