import React, {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking,
  ToastAndroid,
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
// import { WebView } from 'react-native-webview';
var firebaseanalytics = require('react-native-firebase-analytics');
class Checkout extends Component {
  constructor(props) {
    super(props);
    global.skuCName = '';
    this.state = {
      relation: '',
      payMethods: [],
      searchresult: [],
      isLoading: true,
      selectedMethod: null,
      selectedItem: null,
      selectedbillItem: null,
      isSelected: true,
      selectedID: null,
      selectedAID: null,
      shipItems: [],
      estimatedshipItems: [],
      cartItems: [],
      payDetails: [],
      paymentResult: [],
      orderIds: '',
      shipAddress: null,grandTotal:'',subTotal:'',shippingAmount:'',Tax_Amount:''
      // aid: 38,
      // method_code: '',
      // carrier_code: '',
    };
  }

  componentDidMount() {
    global.skuCName = this.props.route.params.skuName;
    // this.setState({
    global.aid = this.props.route.params.aid;
    global.carrier_code = this.props.route.params.carrier_code;
    global.method_code = this.props.route.params.method_code;
    // });
    console.log(skuCName);
    console.log(global.aid);
    console.log(global.carrier_code);
    console.log(global.method_code);
    console.log('Check out page new ::::', global.customer_id_new);
    console.log('Token ::::: ', global.token);
    // this.cartDetails();
    // this.AddressDetails();
    this.BillingDetails();
  }

  BillingDetails() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/carts/mine/billing-address',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
          },
          body: JSON.stringify({
            address: {
              customer_address_id: global.aid,
            },
            useForShipping: true,
          }),
        },
      )
        .then(response => response.json())
        .then(res => {
          console.log(res, 'Billing Details');
          this.AddressDetails();
        });
    });
  }

  AddressDetails() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/custom_api/index/getaddress/' +
          global.customer_id_new,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          console.log(' Newwwwwwwwww >>>> ', JsonResponse);
          console.log(' ::::::: >>>> ', JsonResponse[0]);
          for (let index = 0; index < JsonResponse.length; index++) {
            const address_id = JsonResponse[index]['address_id'];
            console.log(
              'Selected Address Shipping ::::: ',
              JsonResponse[index]['address_id'],
            );
            // if (parseInt(address_id) == parseInt(this.state.aid)) {
            if (parseInt(address_id) == parseInt(global.aid)) {
              this.shippingDetails(JsonResponse[index]);
              console.log('Logic ::::: ', JsonResponse[index]);
              this.setState(
                {shipAddress: JsonResponse[index]},
                this.cartDetails(),
              );
            }
          }
          this.setState({
            searchresult: JsonResponse,
          });
        });
    });
  }
  cartDetails() {
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/carts/mine/payment-information',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Cart Details', data);
          if ('message' in data) {
            Alert.alert(
              'Alert',
              'Your session has expired. Please login back to continue.',
              [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.navigate('AddAccount'), //this.props.navigation.goBack(),
                },
              ],
            );
          } else {
            var obj = data;
            var result = Object.keys(obj).map(key => [Number(key), obj[key]]);
            var dataArr = [];
            result.forEach(element => {
              // element["arrId"] = element[0];
              dataArr.push(element[1]);
            });
            console.log('Pay data', data['totals']['total_segments'][0]);
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
          }
        });
      // }
    });
  }

  placeOrder() {



    firebaseanalytics.logEvent('Place_Order', {
      'Delivery_Method':this.state.payMethods,
      'Delivery_Amount':this.state.shippingAmount,
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

    



    NetInfo.fetch().then(state => {
      let validate;
      if (this.state.isSelected) {
        validate = true;
      } else {
        if (this.state.selectedID == null) {
          validate = false;
        } else {
          validate = true;
        }
      }
      if (validate) {
        fetch('https://haati.serverguy.cloud/rest/V1/carts/mine/order', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
          },
          body: JSON.stringify({
            paymentMethod: {method: this.state.selectedMethod},
            shippingMethod: {
              method_code: global.method_code,
              carrier_code: global.carrier_code,
              additionalProperties: {},
            },
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Caurosel New', data);
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
          })
          .catch(err => {
            console.log(err, 'werffj');
          });
      } else {
        Alert.alert('Please select billing address to continue.');
      }
    });
  }

  addValidation() {
    let validate;
    if (this.state.isSelected) {
      validate = true;
    } else {
      if (this.state.selectedID == null) {
        validate = false;
      } else {
        const billAddress = this.state.searchresult.find(
          x => x.address_id === this.state.selectedID.toString(),
        );
        console.log(billAddress.city);
        NetInfo.fetch().then(state => {
          fetch(
            'https://haati.serverguy.cloud/rest/V1/carts/mine/shipping-information',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + global.token,
              },
              body: JSON.stringify({
                addressInformation: {
                  billingAddress: {
                    city: billAddress.city,
                    company: billAddress.company,
                    email: global.customer_email,
                    firstname: billAddress.first_name,
                    lastname: billAddress.last_name,
                    postcode: billAddress.postcode,
                    region: billAddress.region,
                    street: [billAddress.street],
                    telephone: billAddress.telephone,
                    country_id: billAddress.country,
                  },
                  shippingAddress: {
                    city: this.state.shipAddress.city,
                    company: this.state.shipAddress.company,
                    email: global.customer_email,
                    firstname: this.state.shipAddress.first_name,
                    lastname: this.state.shipAddress.last_name,
                    postcode: this.state.shipAddress.postcode,
                    region: this.state.shipAddress.region,
                    street: [this.state.shipAddress.street],
                    telephone: this.state.shipAddress.telephone,
                    country_id: this.state.shipAddress.country,
                  },
                  shippingCarrierCode: global.carrier_code,
                  shippingMethodCode: global.method_code,
                },
              }),
            },
          )
            .then(response => response.json())
            .then(data => {
              console.log('Shipping Details', data);
              if ('message' in data) {
                Alert.alert(
                  'Alert',
                  'Your session has expired. Please login back to continue.',
                  [
                    {
                      text: 'OK',
                      onPress: () =>
                        this.props.navigation.navigate('AddAccount'), //this.props.navigation.goBack(),
                    },
                  ],
                );
              } else {
                this.setState(
                  {
                    shipItems: data,
                  },
                  () => {},
                );
              }
              validate = true;
            });
          // }
        });
        console.log(this.state.shipAddress);
      }
    }
    return validate;
  }

  SuccessPopup() {



    this.props.navigation.navigate('PaymentGateway', {
      oid: this.state.orderIds,
    });
  }

  paymentWebUrl() {
    console.log('Payment Method ::::: ', global.OrderIDNew);
    Linking.openURL(
      'https://haati.serverguy.cloud/custom_api/index/test?id=' +
        global.OrderIDNew,
    );
  }

  paymentStatusCheck() {
    console.log('Payment Check Status ::::: ', global.OrderIDNew);
    fetch(
      'https://haati.serverguy.cloud/rest/V1/customer/order/status?id=' +
        global.OrderIDNew,
      {
        method: 'POST',
      },
    )
      .then(response => response.json())
      .then(JsonResponse => {
        JsonResponse = JSON.parse(JsonResponse);
        console.log('Payment Response :::: ', JsonResponse);
        ToastAndroid.show(JsonResponse.Order_status, ToastAndroid.SHORT);
        // this.setState({
        //     paymentResult: JsonResponse,
        // })
      });
  }
  // https://haati.serverguy.cloud/ccavenue/index/index/
  // paymentDetailsPage() {
  //     console.log(global.OrderIDNew)

  //     return (
  //         <WebView
  //             source={'https://haati.serverguy.cloud/custom_api/index/test?id=00000006'}
  //         />
  //     );
  //     fetch('https://haati.serverguy.cloud/custom_api/index/test?id=000000075', {
  //         method: 'GET',
  //     }).then((response) => response.json())
  //         .then((JsonResponse) => {
  //             JsonResponse = JSON.parse(JsonResponse)
  //             console.log("Payment Response :::: ", JsonResponse)
  //             this.setState({
  //                 paymentResult: JsonResponse,
  //             })
  //         })
  // }

  // Order SUmmary
  shippingDetails(address) {
    console.log('add', address.city);
    console.log('add', address.company);
    console.log('add', address.first_name);
    console.log('add', address.last_name);
    console.log('add', address.postcode);
    console.log('add', address.region);
    console.log('add', address.street);
    console.log('add', address.telephone);
    console.log('add', address.country);
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/carts/mine/shipping-information',
        {
          //+ this.props.navigation.getParam("aid"), {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
          },
          body: JSON.stringify({
            addressInformation: {
              billingAddress: {
                city: address.city,
                company: address.company,
                email: global.customer_email,
                firstname: address.first_name,
                lastname: address.last_name,
                postcode: address.postcode,
                region: address.region,
                street: [address.street],
                telephone: address.telephone,
                country_id: address.country,
              },
              shippingAddress: {
                city: address.city,
                company: address.company,
                email: global.customer_email,
                firstname: address.first_name,
                lastname: address.last_name,
                postcode: address.postcode,
                region: address.region,
                street: [address.street],
                telephone: address.telephone,
                country_id: address.country,
              },
              shippingCarrierCode: global.carrier_code,
              shippingMethodCode: global.method_code,
            },
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Shipping Details', data);
          this.setState(
            {
              shipItems: data,
            },
            () => {},
          );
        });
      // }
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
          {/* <View
            style={{
              backgroundColor: '#FDF2F7',
              borderTopRightRadius: 44,
              width: (width / 100) * 100,
              height: 'auto',
              // height: height / 100 * 86
            }}> */}
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
                        {/* <View style={{ width: "15%", textAlign: "center" }}>
                                                            <TouchableOpacity style={{ textAlign: "center" }} onPress={() => { removefromCart(index) }}>
                                                                <Text style={{
                                                                    textAlign: "center", position: "relative", left: 10,
                                                                    borderRadius: 20, width: 40, height: 40, backgroundColor: "#D47EAC", color: "#fff",
                                                                    padding: 8, fontSize: 17, fontWeight: "bold",
                                                                }}>X</Text>
                                                            </TouchableOpacity>

                                                        </View> */}
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
                    {!this.state.isSelected ? (
                      // <View style={{ backgroundColor: "#A1C8F6", margin: 10, borderRadius: 8, height: 120 }}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1}}
                        data={this.state.searchresult}
                        renderItem={({item, index}) => (
                          <View
                            style={{
                              height: 125,
                              borderBottomWidth: 1,
                              borderColor: '#000000',
                            }}
                            key={index}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <View
                                style={{
                                  flex: 0.2,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.setState({
                                      selectedAID: index,
                                      selectedID: item.address_id,
                                    })
                                  }>
                                  {this.state.selectedAID === index ? (
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
                              <View
                                style={{
                                  flex: 0.8,
                                  flexDirection: 'column',
                                }}>
                                <Text
                                  style={{
                                    marginTop: 10,
                                    fontSize: 14,
                                    fontFamily: 'baloobhai2-bold',
                                  }}>
                                  {' '}
                                  {item.first_name + ' ' + item.last_name}
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: 'BalooBhai2-Regular',
                                  }}>
                                  {' '}
                                  {item.company
                                    ? item.company + ','.trim()
                                    : 'Vaishali Shopping Center,'}{' '}
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: 'BalooBhai2-Regular',
                                  }}>
                                  {item.street}
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: 'BalooBhai2-Regular',
                                  }}>
                                  {item.city}, {item.region} {item.postcode}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      />
                    ) : // </View>
                    null}
                    <View>
                      <TouchableOpacity
                        onPress={() => this.placeOrder()}
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
          {/* </View> */}
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
    paddingBottom: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default Checkout;
