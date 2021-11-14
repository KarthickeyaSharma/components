import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logoimage from '../../assets/haatilogo.png';
import BasketLogo from '../../assets/BasketImage.png';
import HaatiText from '../../assets/hatti.png';

class EmptyBasket extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Empty Cart</Text>
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
            height: '100%',
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
            <Image
              source={BasketLogo}
              style={{width: wp('23%'), height: hp('11%'), marginTop: '7%'}}
            />
            <Text
              style={{
                fontSize: hp('3%'),
                fontFamily: 'baloobhai2-bold',
                marginTop: '5%',
              }}>
              Your basket is empty
            </Text>
            <Text
              style={{
                fontSize: hp('3%'),
                fontFamily: 'BalooBhai2-Regular',
                marginTop: '10%',
              }}>
              Who do you have in mind?
            </Text>
            <Text
              style={{
                fontSize: hp('3%'),
                fontFamily: 'BalooBhai2-Regular',
                marginTop: '-2%',
              }}>
              Let’s find a card to match
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
                Start Shopping
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
export default EmptyBasket;
