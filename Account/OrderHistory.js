import React, {Component} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
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
import image2 from '../../assets/van.png';
import image3 from '../../assets/product.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: [],
      isLoading: true,
      customer_name: null,
    };
  }

  componentDidMount() {
    this.orderDetails();
    AsyncStorage.multiGet(['customer_name']).then(data => {
      let customer_name = data[0][1];
      console.log(customer_name);
      this.setState({customer_name: customer_name.replace(/['"]+/g, '')});
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  orderDetails() {
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/customer/order?customer_id=' +
          global.customer_id_new,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          obj = JSON.parse(data);
          console.log(obj, 'order history');
          this.setState({
            orderItems: obj.reverse(),
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

  individualOrder(order_id) {
    this.props.navigation.navigate('IndividualOrder', {
      oid: order_id,
    });
  }

  // individualOrder(order_id) {
  //     NetInfo.fetch().then((state => {
  //         fetch('https://haati.serverguy.cloud/rest/V1/customer/order/get?id=' + order_id, {
  //             method: 'POST',
  //             headers: {
  //                 Accept: 'application/json',
  //                 'Content-Type': 'application/json'
  //             },
  //         }).then((response) => response.json())
  //             .then((data) => {
  //                 obj = JSON.parse(data);
  //                 console.log('Order data', obj);
  //                 this.setState({
  //                     isLoading: false
  //                 }, () => {
  //                 })
  //             }).catch((err) => {
  //                 if (err) {
  //                     this.setState({
  //                         isLoading: false
  //                     });
  //                 }
  //             })
  //     }))
  // }

  render() {
    return this.state.isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={hp('6%')} color={'red'} />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Order History</Text>
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
          {this.state.orderItems.map((data, index) => {
            return index == 0 ? (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.individualOrder(data.increment_id);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('100%'),
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: wp('50%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'baloobhai2-bold',
                        marginTop: 20,
                        color: '#272525',
                      }}>
                      Order Number
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: wp('50%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                        marginTop: 20,
                        color: '#272525',
                      }}>
                      {data.increment_id}
                    </Text>
                  </View>
                </View>
                {/* package1 */}
                <View
                  style={{
                    width: wp('100%'),
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BalooBhai2-SemiBold',
                      marginTop: 20,
                      marginBottom: 10,
                      color: '#272525',
                    }}>
                    Package 1 of 1
                  </Text>
                </View>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'column',
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-Regular',
                          color: '#272525',
                        }}>
                        It's on the way
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'BalooBhai2-Regular',
                          color: '#272525',
                        }}>
                        Your order has been sent
                      </Text>
                    </View>
                    <View>
                      <Image source={image2} style={{}}></Image>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        flexDirection: 'column',
                        width: '8%',
                        borderRadius: 3,
                        backgroundColor: '#EF80B1',
                      }}
                    />
                    <View
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        flexDirection: 'column',
                        width: '16%',
                        borderRadius: 3,
                        backgroundColor: '#EF80B1',
                      }}
                    />
                    <View
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        flexDirection: 'column',
                        width: '24%',
                        borderRadius: 3,
                        backgroundColor: '#EF80B1',
                      }}
                    />
                    <View
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        flexDirection: 'column',
                        width: '32%',
                        borderRadius: 3,
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.individualOrder(data.increment_id);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '100%',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      key={index}>
                      {/* <View style={{width: '30%'}}>
                        <Image
                          source={image3}
                          // source={{uri: `${item.template_thumbnail}`}}
                          style={{
                            margin: 10,
                            height: 90,
                            resizeMode: 'cover',
                          }}></Image>
                      </View> */}
                      <View style={{width: '100%', paddingVertical: 10, paddingHorizontal: 20}}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontFamily: 'BalooBhai2-SemiBold',
                            color: 'grey',
                          }}>
                          {' '}
                          Order Number : {data.increment_id}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#272525',
                            fontFamily: 'BalooBhai2-SemiBold',
                          }}>
                          {' '}
                          status :{' '}
                          <Text style={{color: '#577AFA', fontWeight: '500'}}>
                            {data.status}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#272525',
                            fontFamily: 'BalooBhai2-Regular',
                          }}>
                          {' '}
                          Recipient : {this.state.customer_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#272525',
                            fontFamily: 'BalooBhai2-Regular',
                          }}>
                          {' '}
                          Total : {Math.round(data.grand_total * 100) / 100} INR
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <View
            style={{
              marginBottom: 40,
            }}></View>
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
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default OrderHistory;
