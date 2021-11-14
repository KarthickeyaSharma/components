import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logoimage from '../../assets/haatilogo.png';
import HaatiText from '../../assets/hatti.png';

class ThankYou extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    // this.props.navigation.navigate('Cart');
    return true;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Thank You</Text>
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
          style={{
            width: wp('100%'),
            backgroundColor: '#FDF2F7',
            borderTopRightRadius: 44,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 40,
            }}>
            <Image
              source={logoimage}
              style={{width: wp('27%'), height: hp('17%'), marginTop: '10%'}}
            />
            <Text
              style={{
                fontSize: hp('3%'),
                fontFamily: 'baloobhai2-bold',
                marginTop: '5%',
                textAlign: 'center',
              }}>
              Your transaction is {this.props.route.params.res}
            </Text>
            <Text
              style={{
                fontSize: hp('2.5%'),
                fontFamily: 'BalooBhai2-Regular',
                marginTop: '10%',
                textAlign: 'center',
              }}>
              {this.props.route.params.res == 'successfull'
                ? `Congratulations! Your order has been booked. \n Your order number is ${this.props.route.params.oid}`
                : 'Oops! Your order cannot be booked.'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('HomeMain');
              }}
              style={{
                width: wp('80%'),
                padding: 15,
                backgroundColor: '#E73A5E',
                borderRadius: 30,
                marginTop: '10%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  fontFamily: 'baloobhai2-bold',
                  color: '#FFFFFF',
                }}>
                Go To Home
              </Text>
            </TouchableOpacity>
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
});
export default ThankYou;
