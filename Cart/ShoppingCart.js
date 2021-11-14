import React, {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import HaatiText from '../../assets/hatti.png';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var firebaseanalytics = require('react-native-firebase-analytics');

import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateSvg from '../Svg/CreateSvg';
import EmptyBasket from './EmptyBasket';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relation: '',
      shipCost: 0,
      totalCost: 0,
      totalQty: 0,
      cartItems: [],
      isLoading: true,
      item_id: 0,
      item_images: [],
    };
  }

  componentDidMount() {
    // if (global.token === undefined) {
    //   this.guestcartDetails();
    // } else {
    //   this.cartDetails();
    // }
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('Token ::::: ', global.token);
      if (global.token === undefined) {
        this.guestcartDetails();
      } else {
        this.cartDetails();
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // Guest User
  guestcartDetails() {
    // alert(1);
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/guest-carts/' + global.cartToken,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.guestToken,
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Caurosel New guestcartDetails :::>> ', data);
          console.log(data);
          if ('message' in data) {
            // Alert.alert('Alert', data.message, [
            //     {
            //       text: 'OK',
            //       onPress: () => this.setState({ isLoading: false }),//this.props.navigation.goBack(),
            //     },
            // ]);
            this.setState({isLoading: false, cartItems: []});
          } else {
            var qty = 0;
            var cost = 0;
            if ('items' in data) {
              data.items.forEach(element => {
                qty += element.qty;
                cost += element.price * element.qty;
                this.fetchProductImage(
                  element.item_id,
                  // element.product_option['extension_attributes'][
                  //   'custom_options'
                  // ][0].option_value,
                );
              });
              this.setState(
                {
                  cartItems: data.items,
                  totalCost: cost,
                  totalQty: qty,
                  isLoading: false,
                },
                () => {},
              );
            } else {
              this.setState({isLoading: false});
            }
          }
        });
      // }
    });
  }

  removefromguestCart(item_id) {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/guest-carts/' +
          global.cartToken +
          '/items/' +
          item_id,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.guestToken,
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          if (typeof data == 'object') {
            Alert.alert('Alert', data.message, [
              {
                text: 'OK',
                onPress: () => console.log('Cancelled'), //this.props.navigation.goBack(),
              },
            ]);
          } else {
            this.guestcartDetails();
          }
        });
    });
  }

  removeProduct(item_id) {
    if (global.token === undefined) {
      this.removefromguestCart(item_id);
    } else {
      this.removefromCart(item_id);
    }
  }

  handleselectAdd() {
    if (global.token === undefined) {
      this.props.navigation.navigate('AddShipping');
    } else {
      this.props.navigation.navigate('ShippingAddress');
    }
  }

  // Logged in User
  cartDetails() {
    // alert(global.token);
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      fetch('https://haati.serverguy.cloud/rest/V1/carts/mine/items', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + global.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Caurosel New cartDetails :::>> ', data);
          if ('message' in data) {
            if (
              data.message ==
              "The consumer isn't authorized to access %resources."
            ) {
              this.signOut();
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
              this.setState({
                cartItems: [],
              });
            }
            this.setState({isLoading: false});
          } else {
            this.shipCostDetails();
            var qty = 0;
            var cost = 0;
            data.forEach(element => {
              qty += element.qty;
              cost += element.price * element.qty;
              console.log(element.item_id);
              console.log(
                element.product_option['extension_attributes'][
                  'custom_options'
                ][0].option_value,
              );
              this.fetchProductImage(
                element.item_id,
                element.product_option['extension_attributes'][
                  'custom_options'
                ][0].option_value,
              );
            });
            this.setState(
              {
                cartItems: data,
                totalCost: cost,
                totalQty: qty,
                isLoading: false,
              },
              () => {},
            );
          }
        });
      // }
    });
  }

  fetchProductImage(item_id, option_value) {
    fetch(
      'https://haati.serverguy.cloud/rest/V1/view/cart/pdc/design/post?item_id=' +
        item_id +
        '&option_value=' +
        option_value,
      {
        method: 'POST',
      },
    )
      .then(response => response.json())
      .then(data => {
        var jsonData = JSON.parse(data);
        var image_arr = this.state.item_images;
        image_arr.push(jsonData[0]['image']);
        this.setState({
          item_images: image_arr,
        });
        console.log(jsonData[0]['image'], 'dataasssss');
      });
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
    });
  }

  shipCostDetails() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/carts/mine/estimate-shipping-methods-by-address-id?addressId=' +
          global.default_shipping,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Caurosel New', data);
          if ('message' in data) {
            Alert.alert('Alert', data.message, [
              {
                text: 'OK',
                onPress: () => console.log('ShipCost'), //this.props.navigation.goBack(),
              },
            ]);
          } else {
            var shipcost = 0;
            data.forEach(element => {
              shipcost += element.amount;
            });
            this.setState(
              {
                shipCost: shipcost,
              },
              () => {},
            );
          }
        });
      // }
    });
  }

  removefromCart(item_id) {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/carts/mine/items/' + item_id,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          if (typeof data == 'object') {
            Alert.alert('Alert', data.message, [
              {
                text: 'OK',
                onPress: () => console.log('Cancelled'), //this.props.navigation.goBack(),
              },
            ]);
          } else {
            this.cartDetails();
          }
        });
    });
  }

  render() {
    return this.state.isLoading && this.state.item_images.length == 0 ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={hp('6%')} color={'red'} />
      </View>
    ) : this.state.cartItems.length == 0 ? (
      // data is not available then showing empty cart
      <EmptyBasket navigation={this.props.navigation} />
    ) : (
      // </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Cart</Text>
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
          <View>
            {this.state.cartItems.map((item, index) => {
              firebaseanalytics.logEvent('Vew_Checkout_Page ', {
                Cart_Size: this.state.totalQty,
                Cart_Value: this.state.totalCost,
                Cart_Item: item.item_id,
                Cart_Item_Categories: '',
                Cart_Item_Names: item.sku,
                Estimated_Total_Amount: (
                  this.state.totalCost + this.state.shipCost
                ).toFixed(2),
                Tax_Amount: '',
                'Cart_Details_(All)': item,
              });
              return (
                // items.map((item, i) => {
                //     return (

                <View
                  key={index}
                  style={{
                    backgroundColor: '#A1C8F6',
                    margin: 10,
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
                    <View
                      style={{
                        width: '20%',
                        margin: 10,
                        height: 90,
                        resizeMode: 'cover',
                      }}>
                      <Image
                        source={{
                          uri: this.state.item_images[index],
                        }}
                        style={{
                          height: 90,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <View style={{width: '65%'}}>
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
                          fontSize: 16,
                          fontWeight: '500',
                          fontFamily: 'BalooBhai2-SemiBold',
                        }}>
                        {' '}
                        Name : {item.sku}
                      </Text>
                      {/* <Text numberOfLines={1} style={{
                                                        fontSize: 16, fontWeight: "500", fontFamily: 'BalooBhai2-Regular'
                                                    }}> Size : {item.size}</Text> */}
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          fontFamily: 'BalooBhai2-Regular',
                        }}>
                        {' '}
                        Qty : {item.qty}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'BalooBhai2-Regular',
                        }}>
                        {' '}
                        Price : {item.price * item.qty} INR
                      </Text>
                    </View>
                    <View style={{width: '15%', textAlign: 'center'}}>
                      <TouchableOpacity
                        style={{textAlign: 'center'}}
                        onPress={() => {
                          this.removeProduct(item.item_id);
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            position: 'relative',
                            left: 10,
                            borderRadius: 20,
                            width: 40,
                            height: 40,
                            backgroundColor: '#D47EAC',
                            color: '#fff',
                            padding: 8,
                            fontSize: 17,
                            fontWeight: 'bold',
                          }}>
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                //     )
                // })
              );
            })}
            <View
              style={{
                marginTop: 20,
                width: '100%',
                height: 'auto',
                backgroundColor: 'white',
                paddingBottom: 20,
              }}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.breakdown}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 20,
                      fontFamily: 'BalooBhai2-Regular',
                    }}>
                    Breakdown
                  </Text>
                  <View style={styles.breakContainer}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                      }}>
                      Cost of items ({this.state.totalQty})
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                      }}>
                      {this.state.shipCost.toFixed(2)} INR
                    </Text>
                  </View>
                  <View style={styles.breakContainer}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                      }}>
                      Shipping cost
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                      }}>
                      {this.state.totalCost} INR
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginTop: 5,
                  }}></View>
                <View style={styles.breakdown}>
                  <View style={styles.breakContainer}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                      }}>
                      Sub total
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                      }}>
                      {(this.state.totalCost + this.state.shipCost).toFixed(2)}{' '}
                      INR
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginTop: 5,
                  }}></View>
                <View style={styles.breakdown}>
                  <View style={styles.breakContainer}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'baloobhai2-bold',
                      }}>
                      Total to pay
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#e93df2',
                        fontFamily: 'baloobhai2-bold',
                      }}>
                      {(this.state.totalCost + this.state.shipCost).toFixed(2)}{' '}
                      INR
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginTop: 5,
                    marginBottom: 15,
                  }}></View>
                <View style={styles.breakdown}>
                  <TouchableOpacity
                    onPress={() => {
                      // props.navigation.navigate('ShippingAddress');
                    }}
                    style={{marginTop: 20}}>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: '#FDF2F7',
                        padding: 2,
                        borderRadius: 44,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-Regular',
                          textAlign: 'center',
                        }}>
                        Got a voucher code?
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'baloobhai2-bold',
                          color: '#e93df2',
                          textAlign: 'center',
                        }}>
                        Add now
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.handleselectAdd();
                    }}
                    style={{marginTop: 20, marginBottom: 20}}>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: '#D47EAC',
                        padding: 15,
                        borderRadius: 44,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: '#fff',
                          fontFamily: 'BalooBhai2-Regular',
                        }}>
                        Proceed To Pay
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
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
  breakdown: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  breakContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});
export default ShoppingCart;
