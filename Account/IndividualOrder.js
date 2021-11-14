import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  BackHandler,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HaatiText from '../../assets/hatti.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tick from '../../assets/ctick.png';
import rec from '../../assets/rec.png';
import van from '../../assets/van.png';

import image3 from '../../assets/product.png';

class IndividualOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetails: [],
      isLoading: true,
      order_id: 0,
    };
  }

  componentDidMount() {
    global.order_id = this.props.route.params.oid;
    this.setState({order_id: order_id});
    this.individualOrderDetails(order_id);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  individualOrderDetails(order_id) {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/customer/order/get?id=' +
          order_id,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(data => {
          var jsonObj = JSON.parse(data);
          this.setState({
            orderDetails: jsonObj,
            isLoading: false,
          });
        })
        .catch(err => {
          if (err) {
            this.setState({
              isLoading: false,
            });
          }
        });
    });
  }

  render() {
    var subtotal = 0;
    return (
      // whole screen
      Array.isArray(this.state.orderDetails) &&
      this.state.orderDetails.map((data, index) => {
        return (
          <View style={styles.container} key={index}>
            <View style={styles.headerContainer}>
              <View style={styles.w30}>
                <Text style={styles.mainText}>{data.IncrementId}</Text>
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
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              style={styles.mainContainer}>
              {/* order number */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 30,
                  paddingBottom: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'BalooBhai2-SemiBold',
                    width: '50%',
                  }}>
                  Order Number
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'BalooBhai2-Regular',
                    width: '50%',
                  }}>
                  {data.IncrementId}
                </Text>
              </View>
              {/* order date */}
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#EF80B1',
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'BalooBhai2-SemiBold',
                    color: 'white',
                  }}>
                  Order Date: 19/17/20
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'BalooBhai2-Regular',
                    color: 'white',
                  }}>
                  Delivery: 1 of 1
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 30,
                    paddingTop: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '70%',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'BalooBhai2-SemiBold',
                      }}>
                      Iterm 1
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      width: '30%',
                    }}>
                    <Image source={van} />
                  </View> */}
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '70%'}}>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 10,
                      }}>
                      <Image source={rec} />
                      <Image source={tick} style={{marginHorizontal: 20}} />
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-SemiBold',
                        }}>
                        Order Received
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 10,
                      }}>
                      <Image source={rec} />
                      <Image source={tick} style={{marginHorizontal: 20}} />
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-SemiBold',
                        }}>
                        Order Processing
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image source={rec} />
                      <Image source={tick} style={{marginHorizontal: 20}} />
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-SemiBold',
                        }}>
                        Order Sent
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '30%'}}>
                    <Image source={van} />
                  </View>
                </View>
              </View>
              {/* order history */}
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 30,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'BalooBhai2-SemiBold',
                    marginBottom: 10,
                  }}>
                  Order History
                </Text>
                {data.Product_list.map((card, id) => {
                  subtotal += Math.round(card.Price * 100) / 100;
                  return (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                      key={id}>
                      <View style={{width: '20%'}}>
                        <Image
                          source={{uri: card.image}}
                          style={{width: '100%', height: 100}}
                          // resizeMode={'cover'}
                        />
                      </View>
                      <View
                        style={{
                          marginLeft: 20,
                          width: '80%',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: 'BalooBhai2-SemiBold',
                            marginBottom: 10,
                          }}>
                          Product ID : {' ' + card.ID}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 15,
                            fontFamily: 'BalooBhai2-SemiBold',
                            marginBottom: 10,
                            paddingRight: 20,
                          }}>
                          Name : {' ' + card.Product_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: 'BalooBhai2-SemiBold',
                            color: '#577AFA',
                          }}>
                          {Math.round(card.Price * 100) / 100 + '  '} INR
                        </Text>
                      </View>
                    </View>
                  );
                })}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'column',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'BalooBhai2-SemiBold',
                    }}>
                    Recipient
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BalooBhai2-Regular',
                      color: 'grey',
                    }}>
                    {data.Firstname + ' ' + data.Lastname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-Regular',
                      color: 'grey',
                      marginBottom: 10,
                    }}>
                    {data.Billing_Street + ', '}
                    {data.Billing_City +
                      ', ' +
                      data.Billing_RegionCode +
                      ' - ' +
                      data.Billing_Postcode}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'BalooBhai2-SemiBold',
                      marginTop: 5,
                    }}>
                    Postage Type:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-Regular',
                      color: 'grey',
                    }}>
                    {data.shipping_method}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderTopWidth: 1,
                  borderTopColor: '#EF80B1',
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                }}>
                <View
                  style={{
                    width: '100%',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: 'grey',
                    }}>
                    Order Summary
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: 'grey',
                    }}>
                    Sub Total ({Math.round(data.TotalQty)} Items)
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: '#EF80B1',
                    }}>
                    {Math.round(subtotal)} INR
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: 'grey',
                    }}>
                    P & P
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: '#EF80B1',
                    }}>
                    {Math.round(data.shipping_amount * 100) / 100} INR
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: 'grey',
                    }}>
                    Order Total
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: '#EF80B1',
                    }}>
                    {Math.round(data.GrandTotal * 100) / 100} INR
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderTopWidth: 1,
                  borderTopColor: '#EF80B1',
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                }}>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: 'grey',
                    }}>
                    Amount Paid
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      color: '#EF80B1',
                    }}>
                    {Math.round(data.GrandTotal * 100) / 100} INR
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderTopWidth: 1,
                  borderTopColor: '#EF80B1',
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Contact');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        fontFamily: 'BalooBhai2-SemiBold',
                        color: '#EF80B1',
                      }}>
                      Did You Spot a Problem?
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'BalooBhai2-SemiBold',
                        color: 'grey',
                      }}>
                      Email us
                    </Text>
                  </View>
                  <View>
                    <Icon name="chevron-right" size={40} color={'#EF80B1'} />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Faqs');
                }}
                style={{
                  width: '100%',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: '#EF80B1',
                  borderTopColor: '#EF80B1',
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  marginBottom: 30,
                }}>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        fontFamily: 'BalooBhai2-SemiBold',
                        color: 'grey',
                      }}>
                      View our FAQs
                    </Text>
                  </View>
                  <View>
                    <Icon name="chevron-right" size={40} color={'#EF80B1'} />
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
      })
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
  headText: {
    fontSize: 24,
    fontFamily: 'BalooBhai2-SemiBold',
    textAlign: 'center',
  },
  title: {
    width: 100,
    height: 40,
  },
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: wp('100'),
    height: '100%',
    paddingTop: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default IndividualOrder;
