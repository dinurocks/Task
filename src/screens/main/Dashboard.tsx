import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {BarChart} from 'react-native-gifted-charts';
import {getUsers} from '../../services/DatabaseService';

const monthCounts = {
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
      // Iterate over the user data and count the number of signups per month
      if (data?.length) {
        data?.forEach(user => {
          const month = moment(user.SignupDate, ['DD-MM-YYYY']).format('MMM');
          console.log({month});
          if (monthCounts[month] !== undefined) {
            monthCounts[month] += 1;
          }
        });

        // Convert the monthCounts object to an array of {label, value} objects for the BarChart
        const temp = Object.keys(monthCounts).map(month => ({
          value: monthCounts[month],
          label: month,
        }));

        setBarData(temp);
      }
    });
  }, []);

  // Initialize an object to hold the count of users per month

  if (!barData) return null;

  return (
    <BarChart
      data={barData}
      barWidth={30}
      barBorderRadius={5}
      frontColor="#6a5acd"
      spacing={15}
    />
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
