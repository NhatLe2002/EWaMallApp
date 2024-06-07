import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES} from '../../constant/theme';
interface TimeItem {
  time: string;
}
const TimeSale: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<TimeItem | null>(null);
  const [upcomingEvent, setUpcomingEvent] = useState<TimeItem | null>(null);
  const [expiredEvent, setExpiredEvent] = useState<TimeItem | null>(null);

  const allHours: TimeItem[] = [
    {time: '03:00'},
    {time: '06:00'},
    {time: '09:00'},
    {time: '12:00'},
    {time: '15:00'},
    {time: '18:00'},
    {time: '21:00'},
    {time: '00:00'},
  ];

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTimeString = `${
      currentHour < 10 ? '0' + currentHour : currentHour
    }:${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}`;

    let currentIndex = allHours.findIndex(
      item => item.time >= currentTimeString,
    );
    if (currentIndex === -1) currentIndex = 0;
    if (currentIndex === 0) {
      setCurrentEvent(allHours[allHours.length - 1]);
    } else {
      setCurrentEvent(allHours[currentIndex - 1]);
    }

    const upcomingIndex = currentIndex % allHours.length;
    setUpcomingEvent(allHours[upcomingIndex]);

    const expiredIndex = (currentIndex - 2 + allHours.length) % allHours.length;
    setExpiredEvent(allHours[expiredIndex]);
  }, []);

  return (
    <View style={styles.timeContainer}>
      {expiredEvent && (
        <View style={styles.time}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {expiredEvent.time}
          </Text>
          <Text style={{color: 'white'}}>Đã hết hạn</Text>
        </View>
      )}
      {currentEvent && (
        <View style={styles.time}>
          <Text style={{fontSize: 30, color: 'white'}}>
            {currentEvent.time}
          </Text>
          <Text style={{color: 'white'}}>Đang diễn ra</Text>
        </View>
      )}
      {upcomingEvent && (
        <View style={styles.time}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {upcomingEvent.time}
          </Text>
          <Text style={{color: 'white'}}>Sắp diễn ra</Text>
        </View>
      )}
    </View>
  );
};

export default TimeSale;

const styles = StyleSheet.create({
  timeContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    justifyContent: 'center',
    paddingTop: '28%',
  },
  time: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
});
