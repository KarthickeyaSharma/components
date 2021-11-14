import React, {Component} from 'react';
import {View, Image} from 'react-native';
import HaatiLogo from '../../assets/haatilogo1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SplashHaati extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet([
      'token',
      'isLoggedin',
      'customer_id_new',
      'default_shipping',
      'customer_email',
      'customer_pass',
      'getStarted',
    ]).then(data => {
      let token = data[0][1];
      let isLoggedIn = data[1][1];
      let customer_id_new = data[2][1];
      let default_shipping = data[3][1];
      let customer_email = data[4][1];
      let customer_pass = data[5][1];
      let getStarted = data[6][1];
      console.log(data, 'token');
      global.token = token == null ? undefined : token.replace(/['"]+/g, '');
      global.customer_id_new =
        customer_id_new == null ? null : customer_id_new.replace(/['"]+/g, '');
      global.default_shipping =
        default_shipping == null
          ? null
          : default_shipping.replace(/['"]+/g, '');
      global.customer_email =
        customer_email == null ? null : customer_email.replace(/['"]+/g, '');
      global.isLoggedIn = isLoggedIn;

      // console.log('https://haati.serverguy.cloud/rest/V1/integration/customer/token?username=' + customer_email.replace(/['"]+/g, '') + '&password=' + customer_pass.replace(/['"]+/g, ''));
      isLoggedIn || getStarted
        ? this.props.navigation.navigate('HomeTabs')
        : this.props.navigation.navigate('HaatiStartStack');
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={HaatiLogo} style={{width: 170, height: 215}} />
      </View>
    );
  }
}
export default SplashHaati;
