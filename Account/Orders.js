import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'gray',
      pressed: false,
      backgroundColor: '#FDF2F7',
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(global.isLoggedIn);
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    if (global.isLoggedIn) {
      this.setState({isLoading: false});
    } else {
      this.setState({isLoading: false});
      ToastAndroid.show('Please login to continue.', ToastAndroid.SHORT);
      global.pageType = 'Exit';
      this.props.navigation.navigate('AddAccount');
    }
    // });
  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  changeColor() {
    console.log('Touch');
    if (!this.state.pressed) {
      this.setState({pressed: true, backgroundColor: '#EF80B1'});
      this.props.navigation.navigate('OrderHistory');
    }
  }

  signOut() {
    let keys = [
      'token',
      'isLoggedin',
      'customer_id_new',
      'default_shipping',
      'customer_email',
      'isLoggedIn',
      'customer_pass',
      'customer_name',
    ];
    AsyncStorage.multiRemove(keys, err => {
      global.token = undefined;
      global.customer_id_new = null;
      global.default_shipping = null;
      global.customer_email = null;
      global.isLoggedIn = false;
      console.log('Local storage user info removed!');
      ToastAndroid.show('Please login to continue.', ToastAndroid.SHORT);
      global.pageType = 'Exit';
      this.props.navigation.navigate('AddAccount');
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={hp('6%')} color={'red'} />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/hatti.png')}
            style={{width: 100, height: 40}}></Image>
        </View>
        {/* box flex  */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <Text style={styles.titleText}>My Order</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('OrderHistory');
            }}
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
                borderTopWidth: 1,
              },
            ]}>
            <View>
              <Text style={styles.mainText}>Order History</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ViewWishlist');
            }}
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
              },
            ]}>
            <View>
              <Text style={styles.mainText}>Wish List</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
              },
            ]}>
            <View>
              <Text style={styles.mainText}>Notification Preferences</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Terms');
            }}
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
              },
            ]}>
            <View>
              <Text style={styles.mainText}>Terms & Conditions</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Privacy');
            }}
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
              },
            ]}>
            <View>
              <Text style={styles.mainText}>Privacy Notice</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Contact');
            }}
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
              },
            ]}>
            <View>
              <Text style={styles.mainText}>Get Help</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
              },
            ]}>
            <View>
              <Text style={styles.mainText}>Feedback</Text>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontSize: 12,
                  },
                ]}>
                We try hard to improve your experience.
              </Text>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontSize: 12,
                  },
                ]}>
                Help us make caring great again
              </Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardContainer,
              {
                backgroundColor: this.state.backgroundColor,
                //   borderTopWidth: 0.5,
              },
            ]}
            onPress={() => {
              this.signOut();
            }}>
            <View>
              <Text style={styles.mainText}>Sign Out</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/arrow_right.png')}
                style={styles.imgShow}></Image>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'center',
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
  backText: {
    fontSize: hp('2.4%'),
    fontFamily: 'baloobhai2-bold',
    textAlign: 'center',
  },
  title: {
    width: 100,
    height: 40,
  },
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: (width / 100) * 100,
    height: '100%', //height / 100 * 100
    // padding: 20,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    padding: 30,
    fontSize: 24,
    fontFamily: 'BalooBhai2-SemiBold',
  },
  cardContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
  },
  mainText: {
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'BalooBhai2-SemiBold',
    marginLeft: 34,
  },
  imgShow: {
    height: 21,
    width: 12,
  },
});
export default Orders;
