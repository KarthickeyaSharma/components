import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Image1 from '../../assets/day.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class NewReminder extends Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.mainContainer}>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={Image1} />
          </View>
          <View
            style={{
              padding: '10%',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 36,
                fontFamily: 'BalooBhai2-SemiBold',
                textAlign: 'center',
                lineHeight: 40,
              }}>
              Make a special day even more special
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.helpText}>Say goodbye to</Text>
            <Text style={styles.helpText}>'sorry I forget'</Text>
            <Text style={styles.helpText}>with your reminders service!</Text>
          </View>
          {/* add flex  */}
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CreateReminder');
              }}
              style={{
                width: '75%',
                padding: 10,
                backgroundColor: '#E73A5E',
                borderRadius: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'BalooBhai2-SemiBold',
                  textAlign: 'center',
                }}>
                + Add a Reminder
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ImportCalendar');
              }}
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <Icon name="calendar-month-outline" size={24} color="#ccc" />
              <Text
                style={{
                  color: '#577AFA',
                  fontSize: 14,
                  fontFamily: 'BalooBhai2-SemiBold',
                  marginLeft: 10,
                }}>
                Import from calendar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 10,
    width: wp('100%'),
    // height: hp('100%'),
  },
  helpText: {
    fontSize: 17,
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center',
  },
});
export default NewReminder;
