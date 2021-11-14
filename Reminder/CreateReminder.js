import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Image,
  BackHandler,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import DropDownPicker from 'react-native-dropdown-picker';
const {width, height} = Dimensions.get('window');
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import HaatiText from '../../assets/hatti.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Occassions = [
  {label: 'Select', value: ''},
  {label: 'Birthday', value: 'Birthday'},
  {label: 'Anniversary', value: 'Anniversary'},
  {label: 'Christmas', value: 'Christmas'},
  {label: 'Fathers day', value: 'Fathers day'},
  {label: 'Just a note', value: 'Just a note'},
  {label: 'Mothers day', value: 'Mothers day'},
  {label: 'New born', value: 'New born'},
  {label: 'Special occasion', value: 'Special occasion'},
  {label: 'valentines day', value: 'valentines day'},
  {label: 'Wedding', value: 'Wedding'},
];

const Relationship = [
  {label: 'Select', value: ''},
  {label: 'Auntie ', value: 'Auntie'},
  {label: 'Boyfriend', value: 'Boyfriend'},
  {label: 'Brother', value: 'Brother'},
  {label: 'Dad', value: 'Dad'},
  {label: 'Daughter', value: 'Daughter'},
  {label: 'Female - Friend', value: 'Female - Friend'},
  {label: 'Girlfriend', value: 'Girlfriend'},
  {label: 'Grandad', value: 'Grandad'},
  {label: 'Granddaughter ', value: 'Granddaughter '},
  {label: 'Grandson', value: 'Grandson'},
  {label: 'Granny', value: 'Granny'},
  {label: 'Husband ', value: 'Husband '},
  {label: 'Male - Friend ', value: 'Male - Friend '},
  {label: 'Nephew', value: 'Mum'},
  {label: 'Niece', value: 'Niece'},
  {label: 'Other', value: 'Other'},
  {label: 'Sister ', value: 'Sister '},
  {label: 'Son', value: 'Son'},
  {label: 'Uncle', value: 'Uncle'},
  {label: 'Wife ', value: 'Wife  '},
];
class CreateReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      status: '',
      relation: '',
      remindernotification: false,
      date: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('ReminderNotification', (error, result) => {
      console.log('ASdasdsadasd2', result);

      this.setState({remindernotification: result});
    });
    console.log(global.customer_id_new);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  saveReminder() {
    if (global.token == undefined) {
      ToastAndroid.show(
        'Please login to create a reminder.',
        ToastAndroid.LONG,
      );
    } else {
      NetInfo.fetch().then(state => {
        if (this.state.firstName === '') {
          ToastAndroid.show('Enter First Name', ToastAndroid.SHORT);
        } else if (this.state.lastName === '') {
          ToastAndroid.show('Enter Last Name', ToastAndroid.SHORT);
        } else if (this.state.status === '') {
          ToastAndroid.show('Enter Occation', ToastAndroid.SHORT);
        } else if (this.state.relation === '') {
          ToastAndroid.show('Enter Relationship', ToastAndroid.SHORT);
        } else if (this.state.date === '') {
          ToastAndroid.show('Enter Your Date', ToastAndroid.SHORT);
        } else {
          fetch('https://haati.serverguy.cloud/rest/V1/addreminder/post?', {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              //"userName": this.state.username,
              customer_id: global.customer_id_new,
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              relationship: this.state.status,
              occasion: this.state.relation,
              event_date: this.state.date,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              var result = JSON.parse(data);
              console.log('Message', result.message);
              if (result.message == 'Reminder Added succesfully') {
                ToastAndroid.show(
                  'Reminder Added succesfully',
                  ToastAndroid.SHORT,
                );
                this.setState({
                  firstName: '',
                  lastName: '',
                  date: '',
                });
                setTimeout(() => {
                  this.props.navigation.goBack();
                }, 500);
              } else {
                ToastAndroid.show('Check the all details', ToastAndroid.SHORT);
              }
            });
        }
      });
    }
  }

  render() {
    return (
      // whole screen
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Add Reminder</Text>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <Text style={[styles.semiBold, {fontSize: 24, marginBottom: 20}]}>
            Add A Reminder
          </Text>
          <View style={{position: 'relative'}}>
            <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
              First Name
            </Text>
            <TextInput
              style={styles.inputBtn}
              placeholder="First Name"
              onChangeText={firstName => this.setState({firstName})}
              value={this.state.firstName}
            />
          </View>
          <View style={{position: 'relative'}}>
            <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
              Last Name
            </Text>
            <TextInput
              style={styles.inputBtn}
              placeholder="Last Name"
              onChangeText={lastName => this.setState({lastName})}
              value={this.state.lastName}
            />
          </View>
          <View style={{position: 'relative'}}>
            <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
              Occassion
            </Text>
            <Picker
              selectedValue={this.state.status}
              style={styles.inputBtn}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  status: itemValue,
                })
              }>
              {Occassions.map(item => {
                return <Picker.Item label={item.label} value={item.value} />;
              })}
            </Picker>
          </View>
          <View style={{position: 'relative'}}>
            <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
              Relationship
            </Text>
            <Picker
              selectedValue={this.state.relation}
              style={styles.inputBtn}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  relation: itemValue,
                })
              }>
              {Relationship.map(item => {
                return <Picker.Item label={item.label} value={item.value} />;
              })}
            </Picker>
          </View>
          <View style={{position: 'relative'}}>
            <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
              Date
            </Text>
            <DatePicker
              style={[styles.inputBtn, {width: '100%', padding: 8}]}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="01-01-2000"
              maxDate="31-12-2035"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  // marginLeft: -100,
                  paddingRight: 70,
                },
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
              value={this.state.date}
            />
          </View>

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BalooBhai2-Regular',
              textAlign: 'center',
              marginTop: 5,
              marginBottom: 10,
            }}>
            We’ll remind you in advance of the big day
          </Text>

          {!this.state.remindernotification ? (
            <View
              style={{
                width: '100%',
                padding: 15,
                backgroundColor: '#E0E0E0',
                marginBottom: 20,
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'BalooBhai2-Regular',
                  }}>
                  Enable Reminder Notifications?
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'BalooBhai2-Regular',
                  }}>
                  Update settings to receive reminders
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={
                    () => console.log('Pressed')
                    //this.props.navigation.navigate('HaatiStart7')
                  }>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'baloobhai2-bold',
                      color: '#E8505B',
                    }}>
                    Enable
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              this.saveReminder();
            }}>
            <View style={styles.btn}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'baloobhai2-bold',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                Save Reminder
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <View style={[styles.btn, {marginTop: 10}]}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'baloobhai2-bold',
                    fontSize: 16,
                  }}>
                  Save & Add Another Reminder
                </Text>
              </View>
            </TouchableOpacity> */}
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'baloobhai2-bold',
              marginTop: 20,
              textAlign: 'center',
            }}>
            By setting up a reminder, you are consenting to receive emails and
            mobile app notifications about this reminder.
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BalooBhai2-Regular',
              marginBottom: 40,
              textAlign: 'center',
            }}>
            View our Privacy Notice page for more details
          </Text>
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
  title: {
    width: 100,
    height: 40,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center'
  },
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
    height: '100%',
  },
  semiBold: {
    fontFamily: 'BalooBhai2-SemiBold',
    marginBottom: 10,
  },
  inputBtn: {
    padding: 10,
    fontSize: 17,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DEDEDE',
    fontFamily: 'BalooBhai2-Regular',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  btn: {
    width: '100%',
    padding: 10,
    backgroundColor: '#E73A5E',
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CreateReminder;
