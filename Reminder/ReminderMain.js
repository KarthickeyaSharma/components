import React, {Component} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import image1 from '../../assets/people.png';
import KindImage from '../../assets/kind.png';
import ForeverImage from '../../assets/Cards_forever.png';
import OnGoHaati from '../../assets/Haati_On_Go.png';
import HaatiText from '../../assets/hatti.png';
import DeliveryHaati from '../../assets/Delivery_Haati.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class ReminderMain extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Reminder Mains');
  }

  checkLogin = () => {
    if (global.isLoggedIn) {
      this.props.navigation.navigate('ReminderDetails');
    } else {
      ToastAndroid.show('Please login to continue.', ToastAndroid.SHORT);
      global.pageType = 'Back';
      this.props.navigation.navigate('AddAccount');
    }
  };
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                padding: 10,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={image1}
                  style={{width: 150, height: 90, marginTop: 10}}
                  resizeMode={'center'}></Image>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 10,
                    fontFamily: 'BalooBhai2-SemiBold',
                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  Import Reminders From Your Calendar
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    fontFamily: 'BalooBhai2-SemiBold',
                    textAlign: 'center',
                  }}>
                  Add all your important occasions from your calendars
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.checkLogin();
                  }}
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    backgroundColor: '#E73A5E',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 44,
                    padding: 10,
                    width: '60%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'baloobhai2-bold',
                      color: '#FFFFFF',
                      fontStyle: 'normal',
                    }}>
                    Import Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'BalooBhai2-SemiBold',
                color: '#000000',
                fontStyle: 'normal',
                marginTop: 10,
              }}>
              Make it Memorable with HAATI
            </Text>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 20,
              }}>
              <View style={styles.flowImg}>
                <Image
                  resizeMode={'contain'}
                  source={KindImage}
                  style={{marginBottom: 20}}
                />
                <Text style={styles.headText}>One-of-a-Kind Designs</Text>
                <Text style={styles.subText}>
                  Adding a personal touch makes a HAATI totally unique to your
                  relationship
                </Text>
              </View>
              <View style={styles.flowImg}>
                <Image
                  resizeMode={'contain'}
                  source={ForeverImage}
                  style={{
                    marginBottom: 20,
                  }}
                />
                <Text style={styles.headText}>Cards They’ll Keep Forever</Text>
                <Text style={styles.subText}>
                  Sharing your memories in a HAATI turns it from a card to a
                  keepsake
                </Text>
              </View>
              <View style={styles.flowImg}>
                <Image
                  resizeMode={'contain'}
                  source={OnGoHaati}
                  style={{
                    marginBottom: 20,
                  }}
                />
                <Text style={styles.headText}>HAATI On-The-Go</Text>
                <Text style={styles.subText}>
                  Anytime, anywhere - with HAATI in the palm of your hand. It’s
                  easy to show you care. And even easier on our app!
                </Text>
              </View>
              <View style={styles.flowImg}>
                <Image
                  resizeMode={'contain'}
                  source={DeliveryHaati}
                  style={{
                    marginBottom: 20,
                  }}
                />
                <Text style={styles.headText}>Delivery on Your Terms</Text>
                <Text style={styles.subText}>
                  Select your delivery date to ensure it arrives at the perfect
                  time. Please note, due to increased demand, Orders can take up
                  to 3 days longer to be delivered.
                </Text>
              </View>
            </View>
          </View>
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
    textAlign: 'center',
  },
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
  flowImg: {
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  headText: {
    fontSize: 11,
    fontFamily: 'BalooBhai2-SemiBold',
    color: '#000000',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  subText: {
    fontSize: 11,
    fontFamily: 'BalooBhai2-Regular',
    color: '#000000',
    fontStyle: 'normal',
    textAlign: 'center',
  },
});
export default ReminderMain;
