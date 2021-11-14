import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HaatiText from '../../assets/hatti.png';
import RNCalendarEvents from 'react-native-calendar-events';
// import ApiCalendar from 'react-google-calendar-api';
// import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
// import ApiCalendar from 'react-google-calendar-api/ApiCalendar';
class ImportCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = async (e, name) => {
    if (name === 'sign-in') {
      let permissions = await RNCalendarEvents.checkPermissions();
      console.log(permissions);
      if (permissions !== 'authorized') {
        permissions = await RNCalendarEvents.requestPermissions();
      }

      if (permissions !== 'authorized') {
        throw 'Access calendar not authorized';
      }
      let calendar = await RNCalendarEvents.findCalendars();
      this.setState({calendars: calendar});
      console.log(calendar);
      //  var findCalendar = RNCalendarEvents.findCalendars();
      // console.log(findCalendar);
      //   ApiCalendar.onLoad(() => {
      //     ApiCalendar.handleAuthClick();
      // });
    } else if (name === 'sign-out') {
      //   ApiCalendar.onLoad(() => {
      //     ApiCalendar.handleSignoutClick();
      // });
    }
  };
  handleCalendarSelected = async c => {
    console.log(c);
    let findEvent = await RNCalendarEvents.findEventById(c.id);
    console.log(findEvent);
  };

  render() {
    return (
      <View style={styles.container}>
        {/* re */}
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Import Calendar</Text>
          </View>
          <View
            style={{
              width: wp('40%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={HaatiText} style={styles.title}></Image>
          </View>
          <View style={styles.w30}>
            <Text style={{color: 'transparent'}}>Hello</Text>
          </View>
        </View>
        {/* second */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <Button
            onPress={e => this.handleItemClick(e, 'sign-in')}
            title="sign in"
          />
          <View style={{marginTop: 10}}></View>
          <Button
            onPress={e => this.handleItemClick(e, 'sign-out')}
            title="sign-out"
          />
          <View style={{marginTop: 10}}></View>
          {this.state.calendars.map((calendar, i) =>
            calendar.allowsModifications ? (
              <TouchableOpacity
                key={i}
                onPress={() => this.handleCalendarSelected(calendar)}
                style={[{backgroundColor: calendar.color}]}>
                <Text key={i}>{calendar.title}</Text>
              </TouchableOpacity>
            ) : null,
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: hp('100%'),
  },
  headerContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
  },
  w30: {
    width: wp('30%'),
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center',
  },
  title: {
    width: 100,
    height: 40,
  },
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: wp('100%'),
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  backdrop: {
    flex: 1,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  agendaModalBody: {
    flexShrink: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  agendaList: {
    marginTop: 10,
  },
  calendarOption: {
    padding: 10,
  },
});

export default ImportCalendar;
