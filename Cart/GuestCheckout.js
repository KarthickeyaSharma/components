import React, {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Fontisto';
import HaatiText from '../../assets/hatti.png';
import image3 from '../../assets/product.png';
import CheckBox from '@react-native-community/checkbox';
var firebaseanalytics = require('react-native-firebase-analytics');
// import { WebView } from 'react-native-webview';

class GuestCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relation: '',
      payMethods: [],
      searchresult: [],
      isLoading: true,
      selectedMethod: null,
      selectedItem: null,
      selectedbillItem: null,
      isSelected: true,
      shipItems: [],
      estimatedshipItems: [],
      cartItems: [],
      payDetails: [],
      paymentResult: [],
      orderIds: '',
      shipAddress: null,grandTotal:'',subTotal:'',shippingAmount:'',Tax_Amount:''
    };
  }

  componentDidMount() {
    global.shipInfo = this.props.route.params.shipInfo;
    global.carrier_code = this.props.route.params.carrier_code;
    global.method_code = this.props.route.params.method_code;
    console.log(global.shipInfo);
    console.log(global.carrier_code);
    console.log(global.method_code);
    this.handleguestShippingInform();
  }

  // Guest User Checkout
  handleguestShippingInform() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/guest-carts/' +
          global.cartToken +
          '/shipping-information',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.guestToken,
          },
          body: JSON.stringify(global.shipInfo),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Cart Details', data['totals']['total_segments']);
          // var obj =
          var obj = data;
          var result = Object.keys(obj).map(key => [Number(key), obj[key]]);
          var dataArr = [];
          result.forEach(element => {
            // element["arrId"] = element[0];
            dataArr.push(element[1]);
          });
          console.log('Pay data', dataArr);
          this.setState(
            {
              shippingAmount:data['totals']['total_segments'][1].value,
              Tax_Amount:data['totals']['total_segments'][2].value,
              grandTotal:data['totals']['total_segments'][3].value,
              subTotal:data['totals']['total_segments'][0].value,
              payMethods: data['payment_methods'],
              payDetails: data['totals']['total_segments'],
              cartItems: data['totals']['items'],
              isLoading: false,
            },
            () => {},
          );
        });
    });
  }

  guestplaceOrder() {


    firebaseanalytics.logEvent('Guest_Place_Order', {
      'Delivery_Method':this.state.selectedMethod,
      'Delivery_Amount':this.state.Delivery_Amount,
      'Cart_Size':this.state.cartItems.length,
      'Cart_Value':this.state.subTotal,
      'Cart_Item_IDs':this.state.cartItems,
'Cart_Item_Categories':this.state.cartItems,
'Cart_Item_Names':this.state.cartItems,
'Cart_Details_(All)':this.state.cartItems,
'Total_Amount':this.state.grandTotal,
'Tax_Amount':this.state.Tax_Amount,
'Payment_Type':'',
'Credit_Card_Type':'',
'Offer_Name':'',
'Offer_Type':'',
'Offer_Code':'',
'Offer_Used?':'',
'Lifetime_Value':'',
    });


    const orderBody = {paymentMethod: {method: this.state.selectedMethod}};
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/guest-carts/' +
          global.cartToken +
          '/order',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.guestToken,
          },
          body: JSON.stringify(orderBody),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (typeof data == 'object') {
            Alert.alert('Alert', data.message, [
              {
                text: 'OK',
                onPress: () => console.log('Cancelled'), //this.props.navigation.goBack(),
              },
            ]);
          } else {
            global.OrderIDNew = data;
            console.log(global.OrderIDNew);
            // this.paymentDetailsPage()
            this.setState(
              {
                orderIds: data,
              },
              () => {
                console.log('Order ID ====', this.state.orderIds);
                this.SuccessPopup();
              },
            );
          }
        });
    });
  }

  SuccessPopup() {
    this.props.navigation.navigate('PaymentGateway', {
      oid: this.state.orderIds,
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
          <View style={styles.w30}>
            <Text style={styles.mainText}>Checkout</Text>
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
          <View style={{margin: 20, padding: 20}}>
            <View style={{marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    textAlign: 'left',
                    fontSize: 24,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  Order Summary
                </Text>
              </View>
              {this.state.payDetails.map((item, index) => {
                return (
                  // items.map((item, i) => {
                  //     return (
                  <View key={index}>
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 10,
                      }}>
                      <View style={{width: '75%'}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: 'BalooBhai2-Regular',
                            color: '#D47EAC',
                          }}>
                          {item.title}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: 'BalooBhai2-Regular',
                          }}>
                          {item.value} INR
                        </Text>
                      </View>
                    </View>
                  </View>
                  //     )
                  // })
                );
              })}
            </View>
            <View style={{marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    textAlign: 'left',
                    fontSize: 24,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  Order Details ({this.state.cartItems.length} Items)
                </Text>
              </View>
              {this.state.cartItems.map((item, index) => {
                return (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    key={index}>
                    <View
                      style={{
                        backgroundColor: '#A1C8F6',
                        marginBottom: 5,
                        borderRadius: 8,
                        height: 120,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          marginTop: 5,
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        key={index}>
                        <View style={{width: '20%'}}>
                          <Image
                            source={image3}
                            // source={{uri: `${item.template_thumbnail}`}}
                            style={{
                              margin: 10,
                              height: 90,
                              resizeMode: 'cover',
                            }}></Image>
                        </View>
                        <View style={{width: '70%'}}>
                          <Text
                            style={{
                              fontSize: 17,
                              fontFamily: 'BalooBhai2-SemiBold',
                              color: 'grey',
                            }}>
                            {' '}
                            Product ID : {item.item_id}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              fontFamily: 'BalooBhai2-SemiBold',
                            }}>
                            {' '}
                            Name : {item.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              fontFamily: 'BalooBhai2-Regular',
                            }}>
                            {' '}
                            Qty : {item.qty}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontFamily: 'BalooBhai2-Regular',
                            }}>
                            {' '}
                            Price : {item.price} INR
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                );
              })}
            </View>
            <View>
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: 'left',
                  fontSize: 24,
                  fontFamily: 'BalooBhai2-Regular',
                  fontWeight: '500',
                }}>
                Payment Information
              </Text>
              <Text
                style={{
                  marginBottom: 15,
                  textAlign: 'left',
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-Regular',
                }}>
                Payment Methods
              </Text>
            </View>
            {this.state.payMethods.map((item, index) => {
              return (
                // items.map((item, i) => {
                //     return (
                <View>
                  <View
                    key={index}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 10,
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            selectedItem: index,
                            selectedMethod: item.code,
                          })
                        }>
                        {this.state.selectedItem === index ? (
                          <Icon
                            name={'radio-btn-active'}
                            size={wp('5%')}
                            type={'fontisto'}
                            color={'#E280AA'}
                          />
                        ) : (
                          <Icon
                            name={'radio-btn-passive'}
                            size={wp('5%')}
                            type={'fontisto'}
                            color={'gray'}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 20}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'BalooBhai2-Regular',
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </View>
                //     )
                // })
              );
            })}
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View
                style={{
                  backgroundColor: '#FDF2F7',
                  borderTopRightRadius: 44,
                  width: (width / 100) * 100,
                  height: 'auto',
                  marginTop: 20,
                  // height: height / 100 * 150
                }}>
                {this.state.selectedMethod == null ? null : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">
                    {this.state.selectedMethod == 'ccavenue' ? (
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-Regular',
                        }}>
                        You will be redirected to the CCAvenue Gateway when you
                        place an order.
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-Regular',
                        }}>
                        You have selected cash on delivery.
                      </Text>
                    )}
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <CheckBox
                        tintColors={{true: '#E280AA', false: 'black'}}
                        value={this.state.isSelected}
                        onValueChange={() =>
                          this.setState({isSelected: !this.state.isSelected})
                        }
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          fontFamily: 'BalooBhai2-Regular',
                        }}>
                        My billing and shipping address are the same
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => this.guestplaceOrder()}
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          width: '45%',
                          backgroundColor: '#D47EAC',
                          marginTop: 20,
                          elevation: 2,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'BalooBhai2-Regular',
                            textAlign: 'center',
                            color: '#fff',
                          }}>
                          Place Order
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                )}
              </View>
            </ScrollView>
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
  mainContainer: {
    width: wp('100%'),
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    height: '100%',
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default GuestCheckout;
