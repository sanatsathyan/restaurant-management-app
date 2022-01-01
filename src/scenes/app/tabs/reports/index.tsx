import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {BSButton, BSHeader, BSLabel} from '../../../../components';
import {ConvertToCsvJson} from '../../../../helpers/csv';
import {OrderState} from '../../../../redux/orders/reducer';
import {ReducerType} from '../../../../redux/store';
import {
  themeColors,
  themeContants,
  themeFontSize,
  themeGap,
} from '../../../../theme';
import Toast from 'react-native-toast-message';
import {CreateFile} from '../../../../helpers/file';

interface ISelectedDays {
  [key: string]: any;
}

const Dashboard: React.FC = () => {
  const today = moment().format().split('T')[0];
  const [markedDates, setMarkedDates] = useState<ISelectedDays>({});
  const [selectionType, setSelectionType] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>(today);
  const [toDate, setToDate] = useState<string>(today);

  const state = useSelector<ReducerType>(state => state.orders) as OrderState;

  useEffect(() => {
    getSelectedDates();
  }, [fromDate, toDate]);

  const getSelectedDates = () => {
    var dates = [];
    const _markedDates = {} as ISelectedDays;

    var currDate = moment(fromDate).add(-1).startOf('day');
    var lastDate = moment(toDate).startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
      dates.push(currDate.clone().toDate());
    }
    if (dates.length === 0) {
      setFromDate(fromDate);
      setToDate(fromDate);
    } else {
      dates.map((date, index) => {
        _markedDates[moment(date).format().split('T')[0]] = {
          selected: true,
          startingDay: index === 0,
          endingDay: index === dates.length - 1,
          color: themeColors.PRIMARY_COLOR,
        };
      });
      setMarkedDates(_markedDates);
    }
  };

  const exportReport = async (fileContent: string) => {
    try {
      const fileName =
        'report_' + moment().format('l_h_mm_ss').replace(/\//g, '_') + '.csv';
      CreateFile(fileName, fileContent)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'File Downloaded!',
            text2:
              'Check for a ' + fileName + ' file in your Downloads folder!',
          });
        })
        .catch(err => {
          if (JSON.stringify(err).includes('EACCES')) {
            Toast.show({
              type: 'error',
              text1: 'Export Failed!',
              text2:
                'Delete if there is a ' +
                fileName +
                ' file in your Downloads folder!',
            });
          }
        });
    } catch (err) {}
  };

  const generateReport = () => {
    const orders = state.orders
      .filter(
        order =>
          moment(order.Date, 'YYYY-MM-DD').toDate() >=
            moment(fromDate).startOf('day').toDate() &&
          moment(order.Date, 'YYYY-MM-DD').toDate() <=
            moment(toDate).endOf('day').toDate(),
      )
      .map(item => ({
        BillNo: moment(item.Date).format('YYMMDDHmmss'),
        Date: moment(item.Date).format('lll'),
        MemberId: item.MemberId,
        KOTId: item.KOTId,
        BillAmount: item.BillAmount,
        AdditionalCharges: item.AdditionalCharges,
        Tax: item.Tax,
        TotalBillAmount: item.TotalBillAmount,
        Status: item.Status,
        Orders: item.Orders.map(orderItem => ({
          FoodName: orderItem.FoodName,
          Price: orderItem.Price,
          Quantity: orderItem.Quantity,
        })),
      }));
    const reportContent = ConvertToCsvJson(orders);
    if (!reportContent) {
      Toast.show({
        type: 'error',
        text1: 'No Data!',
        text2: 'There is no data to export!',
      });
    } else {
      exportReport(reportContent);
    }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <BSHeader title="Reports" hideBackButton />
        <View style={styles.dateSection}>
          <TouchableOpacity onPress={() => setSelectionType('FROM_DATE')}>
            <BSLabel title={'From'} />
            <BSLabel
              style={[
                styles.dateSelectorLabel,
                selectionType === 'FROM_DATE' && styles.selectionInProgress,
              ]}
              title={
                moment(fromDate).format('MMM Do') === 'Invalid date'
                  ? '-'
                  : moment(fromDate).format('MMM Do')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectionType('TO_DATE')}>
            <BSLabel title={'To'} style={{alignSelf: 'flex-end'}} />
            <BSLabel
              style={[
                styles.dateSelectorLabel,
                selectionType === 'TO_DATE' && styles.selectionInProgress,
              ]}
              title={
                moment(toDate).format('MMM Do') === 'Invalid date'
                  ? '-'
                  : moment(toDate).format('MMM Do')
              }
            />
          </TouchableOpacity>
        </View>
        <Calendar
          theme={calendarTheme}
          allowSelectionOutOfRange={false}
          maxDate={today}
          onDayPress={date => {
            if (selectionType === 'FROM_DATE') {
              setFromDate(date.dateString);
            } else if (selectionType === 'TO_DATE') {
              setToDate(date.dateString);
            }
            setSelectionType('');
          }}
          markingType="period"
          markedDates={markedDates}
        />
      </View>
      <BSButton
        title="GENERATE"
        style={{marginVertical: themeGap.base}}
        onPress={generateReport}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: themeGap.base,
    borderWidth: 1,
    borderColor: themeColors.PRIMARY_COLOR,
    backgroundColor: themeColors.LIGHT_PRIMARY_COLOR,
  },
  dateSelectorLabel: {
    fontSize: themeFontSize.large,
    color: themeColors.PRIMARY_COLOR,
  },
  selectionInProgress: {
    color: themeColors.SECONDARY_COLOR,
  },
});

const calendarTheme = {
  backgroundColor: themeColors.TRANSPARENT,
  calendarBackground: themeColors.TRANSPARENT,
  textDayFontFamily: themeContants.fontFamily,
  textMonthFontFamily: themeContants.fontFamily,
  todayButtonFontFamily: themeContants.fontFamily,
  textDayHeaderFontFamily: themeContants.fontFamily,
  dayTextColor: themeColors.PRIMARY_COLOR,
  monthTextColor: themeColors.SECONDARY_COLOR,
  textInactiveColor: themeColors.LIGHT_GRAY,
  textDisabledColor: themeColors.LIGHT_GRAY,
  textSecondaryColor: themeColors.LIGHT_PRIMARY_COLOR,
  textSectionTitleColor: themeColors.SECONDARY_COLOR,
  arrowColor: themeColors.PRIMARY_COLOR,
  todayTextColor: themeColors.PRIMARY_COLOR,
  todayBackgroundColor: themeColors.LIGHT_PRIMARY_COLOR,
};

export default Dashboard;
