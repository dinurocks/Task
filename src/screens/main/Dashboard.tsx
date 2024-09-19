import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors} from '../../constants/colors';
import {getUsers} from '../../services/DatabaseService';
import CustomText from '../../components/CustomText';
import {scale} from 'react-native-size-matters';

const monthCounts: any = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0,
};

const Dashboard = () => {
  const [barData, setBarData] = useState<any>(null);

  useEffect(() => {
    getUsers((data: any) => {
      console.log({data});
      if (data?.length) {
        data?.forEach((user: any) => {
          const month = moment(user.SignupDate, ['DD-MM-YYYY']).format('MMM');
          console.log({month});
          if (monthCounts[month] !== undefined) {
            monthCounts[month] += 1;
          }
        });

        const temp = Object.keys(monthCounts).map(month => ({
          value: monthCounts[month],
          label: month,
        }));

        setBarData(temp);
      }
    });
  }, []);

  if (!barData) return null;

  return (
    <View style={styles.container}>
      <CustomText textStyle={styles.heading}>User List Month Wise</CustomText>
      <BarChart
        data={barData}
        barWidth={30}
        barBorderRadius={5}
        frontColor={colors.blue}
        spacing={15}
        xAxisColor={colors.black}
        xAxisLabelTextStyle={{
          color: colors.black,
        }}
        yAxisColor={colors.black}
        color={colors.black}
        yAxisTextStyle={{
          color: colors.black,
        }}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: scale(18),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: scale(30),
  },
});
