import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import add from '../../assets/Add.png';
import an from '../../assets/glass.png';
import cake from '../../assets/cake.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNCalendarEvents from 'react-native-calendar-events';

class ReminderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      show: false,message:'Calendar imported successfully',
      calendars: [],
      reminderOptions: [
        {
          index: 0,
          value: 'Add',
          label: 'Add Remainder',
          navigateOpt: 'CreateReminder',
        },
        {
          index: 1,
          value: 'Import',
          label: 'Import Calendar',
          navigateOpt: 'ImportCalendar',
        },
      ],
    };
  }

  importNow = async () => {
    
    if (global.customer_id_new != null) {
      let permissions = await RNCalendarEvents.checkPermissions();
      
      if (permissions !== 'authorized') {
        permissions = await RNCalendarEvents.requestPermissions();
      }

      if (permissions !== 'authorized') {
        throw 'Access calendar not authorized';
      }
      let calendar = await RNCalendarEvents.findCalendars();
      console.log(calendar);
      this.setState({calendars: calendar}); 

      if (calendar.length > 0) {
        var id=0;var source=''
        for (var i = 0; i < calendar.length; i++) {
          let findEvent = await RNCalendarEvents.findEventById(calendar[i].id);
          console.log(findEvent);
          if(findEvent==null)
          {
            id=0;
          }
          else if(findEvent.allowedAvailabilities.type=='com.google')
          {
              id=1;source=findEvent.allowedAvailabilities.source;
          }

          else if(findEvent.calendar.type=='com.google')
          {
            id=1;source=findEvent.calendar.source;
          }
          fetch('https://haati.serverguy.cloud/rest/V1/addreminder/post', {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer_id: global.customer_id_new,
              first_name: source,
              last_name: '',
              relationship: '',
              occasion: findEvent.title,
              event_date: findEvent.startDate,
            }),
          })
            .then(response => response.json())
            .then(JsonResponse => {
             
            });
        }

        if(id==0)
        {
          this.setState({show: true,message:'Please install google calander app'});
        }
        else
        {
          this.setState({show: true,message:"Calendar imported successfully"});
        }
      }
    } else {
      this.props.navigation.navigate('HomeMain');
    }
  };

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 20,
              fontFamily: 'BalooBhai2-SemiBold',
            }}>
            Reminders
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                visible: !this.state.visible,
              });
            }}>
            <Image source={add} style={{height: 30, width: 30}} />
          </TouchableOpacity>
        </View>
        {this.state.visible ? (
          <View
            style={{
              marginBottom: 30,
              padding: 15,
              borderWidth: 0.5,
              borderRadius: 10,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                marginBottom: 10,
                textAlign: 'center',
                fontFamily: 'BalooBhai2-SemiBold',
              }}>
              Reminder Options
            </Text>

            <TouchableOpacity
              style={{
                width: '70%',
                padding: 10,
                borderRadius: 44,
                backgroundColor: '#E73A5E',
                marginBottom: 10,
              }}
              onPress={() => this.props.navigation.navigate('CreateReminder')}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-SemiBold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Add Remainder
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '70%',
                padding: 10,
                borderRadius: 44,
                backgroundColor: '#E73A5E',
                marginBottom: 10,
              }}
              onPress={this.importNow}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-SemiBold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Import Calendar
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!this.props.notification ? (
          <View
            style={{
              padding: 15,
              borderWidth: 0.5,
              borderRadius: 10,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'BalooBhai2-SemiBold',
                textAlign: 'center',
              }}>
              {' '}
              You're Missing Reminders
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 20,
                marginBottom: 20,
                fontFamily: 'BalooBhai2-SemiBold',
                textAlign: 'center',
              }}>
              Make sure you've got notifications turned on so you can always
              receive your reminders
            </Text>
            <TouchableOpacity
              style={{
                width: '70%',
                padding: 10,
                borderRadius: 44,
                backgroundColor: '#E73A5E',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-SemiBold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Update Settings
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '14%'}}
          data={
            this.props.data !== null &&
            this.props.data.length > 0 &&
            this.props.data
          }
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',
                padding: 15,
                backgroundColor: '#FFFFFF',
                marginTop: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'lightgrey',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                {item.occasion == 'Birthday' ? (
                  <Image source={cake} style={{height: 36, width: 36}} />
                ) : item.occasion == 'Anniversary' ? (
                  <Image source={an} style={{height: 45, width: 32}} />
                ) : (
                  <Image source={cake} style={{height: 45, width: 32}} />
                )}
              </View>
              <View
                style={{
                  width: '80%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontFamily: 'BalooBhai2-SemiBold',
                    fontSize: 18,
                  }}>
                  {item.first_name} {item.last_name} {item.occasion}
                </Text>
                <Text
                  style={{
                    fontFamily: 'BalooBhai2-SemiBold',
                    fontSize: 14,
                    color: 'gray',
                  }}>
                  {item.event_date}
                </Text>
              </View>
            </View>
          )}
        />

        <Modal transparent={true} visible={this.state.show}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: wp('80%'),
                height: hp('19%'),
                borderRadius: 20,
                borderColor: '#D47EAC',
                borderWidth: 0.5,
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flex: 0.7,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderBottomWidth: 0.5,
                  alignItems: 'center',
                  borderBottomColor: '#D47EAC',
                }}>
                <Text style={{fontSize: 16, fontFamily: 'baloobhai2-bold'}}>
                  {this.state.message}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({show: false});
                  }}
                  style={{
                    flex: 0.5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderRightWidth: 0.5,
                    borderRightColor: '#D47EAC',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'baloobhai2-bold',
                      color: '#EF80B1',
                    }}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
    height: hp('100%'),
  },
  helpText: {
    fontSize: 17,
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: '45%',
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#D47EAC',
  },
  buttonClose: {
    backgroundColor: '#A1C8F6',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'BalooBhai2-Regular',
  },
});
export default ReminderList;
