import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import HaatiText from '../../assets/hatti.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NewReminder from './NewReminder';
import ReminderList from '../KarthiBackup/ReminderList';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

class ReminderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      searchresult: [],
      isLoading: true,
      remindernotification: false,
    };
    this.Reminders = this.Reminders.bind(this);
  }

  componentDidMount() {
    this.Reminders();
    AsyncStorage.getItem('ReminderNotification', (error, result) => {
      console.log('ASdasdsadasd2', result);
      this.setState({remindernotification: result});
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  Reminders() {
    this.setState({isLoading: true});
    console.log(global.token);
    if (global.token == undefined) {
    } else {
      NetInfo.fetch().then(state => {
        fetch(
          'https://haati.serverguy.cloud/rest/V1/getreminder/post?customer_id=' +
            global.customer_id_new,
          {
            method: 'POST',
          },
        )
          .then(response => response.json())
          .then(JsonResponse => {
            JsonResponse = JSON.parse(JsonResponse);
            console.log(JsonResponse);
            this.setState(
              {
                searchresult: JsonResponse,
                isLoading: false,
              },
              () => {
                console.log('Reminder:::::::::', this.state.searchresult);
              },
            );
          });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Reminder</Text>
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
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={hp('6%')} color={'red'} />
          </View>
        ) : this.state.searchresult == null ||
          this.state.searchresult.length == 0 ? (
          <NewReminder navigation={this.props.navigation} />
        ) : (
          <ReminderList
            data={this.state.searchresult}
            navigation={this.props.navigation}
            notification={this.state.remindernotification}
          />
        )}
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
  title: {
    width: 100,
    height: 40,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 10,
    width: wp('100%'),
    // height: hp('100%'),
  },
  helpText: {
    fontSize: 17,
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center',
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default ReminderDetails;
