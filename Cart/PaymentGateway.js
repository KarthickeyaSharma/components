import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {Alert} from 'react-native';

class PaymentGateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentUri: '',
      order_id: '',
    };
  }

  componentDidMount() {
    var oid = this.props.route.params.oid;
    global.payUri =
      'https://haati.serverguy.cloud/custom_api/index/test?id=0000000' + oid;
    this.setState({
      paymentUri: global.payUri,
      order_id: '0000000' + oid,
    });
    const payment_uri = global.payUri;
  }

  handleResponse = request => {
    const {url, canGoForward, canGoBack} = request;
    const {navigation, theme, dispatch, currency} = this.props;
    console.log('Suganyas', 'checkout page calledd' + url);

    var result = url.split('&')[1];
    console.log(result);
    if (result == 'res=2') {
      console.log('Vidhu newww', 'thank you neww');
      Alert.alert('Alert', 'Payment Cancelled.', [
        {
          text: 'OK',
          onPress: () =>
            this.props.navigation.navigate('Thanks', {
              res: 'cancelled',
              oid: this.state.order_id,
            }),
        },
      ]);

      setTimeout(() => {
        // this.props.navigation.goBack();
      }, 10000);
    } else if (result == 'res=3') {
      Alert.alert('Alert', 'Payment Declined.', [
        {
          text: 'OK',
          onPress: () =>
            this.props.navigation.navigate('Thanks', {
              res: 'declined',
              oid: this.state.order_id,
            }),
        },
      ]);

      setTimeout(() => {
        // this.props.navigation.goBack();
      }, 10000);
    } else if (result == 'res=1') {
      Alert.alert('Alert', 'Payment Successfull.', [
        {
          text: 'OK',
          onPress: () =>
            this.props.navigation.navigate('Thanks', {
              res: 'successfull',
              oid: this.state.order_id,
            }),
        },
      ]);

      setTimeout(() => {
        // this.props.navigation.goBack();
      }, 10000);
    }
  };

  //payment_uri = https://haati.serverguy.cloud/ccavenue/index/index/
  render() {
    return (
      <WebView
        source={{
          uri: global.payUri,
          // uri: 'https://haati.serverguy.cloud/ccavenue/?Billing_City=Nagari&Billing_Postcode=517590&Billing_RegionCode=AP&Billing_Street%5B0%5D=Middle+Street&Billing_Telephone=9600207184&Shipping_City=Nagari&Shipping_Postcode=517590&Shipping_RegionCode=AP&Shipping_Street%5B0%5D=Middle+Street&Shipping_Telephone=9600207184&currency_code=INR&email=mohannkit%40gmail.com&firstname=Mohan&grand_total=1.00&lastname=NK&order_id=000000088'
        }}
        onNavigationStateChange={this.handleResponse}
        style={{flex: 1, backgroundColor: 'transparent'}}
        // onLoad={() => this.setState({loading: false})}
        javaScriptEnabledAndroid={true}
        javaScriptEnabled={true}
      />
    );
  }
}
export default PaymentGateway;
