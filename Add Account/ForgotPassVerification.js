import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import backgroundImage from '../../assets/hatti.png';

class ForgotPassVerification extends Component {
  constructor(props) {
    super(props);
    global.CardsID = '';
    this.state = {};
  }

  render() {
    return (
      // whole screen
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
        <View
          style={{
            height: (height / 100) * 12,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={backgroundImage} style={{width: 100, height: 40}} />
        </View>

        <View
          style={{
            height: (height / 100) * 88,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FDF2F7',
          }}>
          <Text style={{fontSize: 25, fontFamily: 'baloobhai2-bold'}}>
            Check your Email Address
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('account');
            }}
            style={{
              width: wp('70%'),
              height: hp('7%'),
              backgroundColor: '#EF80B1',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'baloobhai2-bold',
                color: 'white',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export default ForgotPassVerification;
