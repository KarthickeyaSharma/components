import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Pressable,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import HaatiText from '../../assets/hatti.png';

class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchresult: [],
      checked: 'first',
      selectedshipItem: null,
      relation: '',
      country: '',
      city: '',
      address: '',
      phonenumber: '',
      postcode: '',
      region: '',
      ID: '',
      selectedItem: null,
      isLoading: true,
      fname: '',
      lname: '',
      compname: '',
      selectedID: null,
      modalVisible: false,
      shipItems: [],
      method_code: '',
      carrier_code: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('Customer ID ::::', global.customer_id_new);
      this.AddressDetails();
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    this._unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  AddressDetails() {
    this.setState({isLoading: true});
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
          console.log(JsonResponse);
          this.setState({
            searchresult: JsonResponse,
            isLoading: false,
          });
        });
    });
  }

  openpopup(item) {
    this.props.navigation.navigate('EditAddress', {
      firstname: item.first_name,
      lastname: item.last_name,
      compname: item.company,
      country: item.country,
      phonenumber: item.telephone,
      postcode: item.postcode,
      city: item.city,
      region: item.region,
      address: item.street,
      ID: item.address_id,
    });
  }
  openModal() {
    console.log(this.state.selectedID);
    if (this.state.selectedID == null || this.state.selectedID == '') {
      Alert.alert('Please select an address to continue.');
    } else {
      this.shipCostDetails();
      this.setModalVisible(true);
    }
  }

  sendCards() {
    console.log(this.state.selectedshipItem, 'si');
    if (this.state.selectedshipItem == null) {
      Alert.alert('Please select an shipping method to continue.');
    } else {
      this.setModalVisible(false);
      this.props.navigation.navigate('Checkout', {
        aid: this.state.selectedID,
        carrier_code: this.state.carrier_code,
        method_code: this.state.method_code,
      });
    }
  }

  shipCostDetails() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/carts/mine/estimate-shipping-methods-by-address-id?addressId=' +
          this.state.selectedID,
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
          if ('message' in data) {
            if (
              data.message ==
              "The consumer isn't authorized to access %resources."
            ) {
              Alert.alert(
                'Alert',
                'Your session has expired. Please login back to continue.',
                [
                  {
                    text: 'OK',
                    onPress: () => this.signOut(), //this.props.navigation.goBack(),
                  },
                ],
              );
            } else {
              Alert.alert('Alert', data.message, [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.goBack(), //this.props.navigation.goBack(),
                },
              ]);
            }
          } else {
            this.setState(
              {
                shipItems: data,
              },
              () => {},
            );
          }
        });
      // }
    });
  }

  billingAddress() {
    var billData = {
      address: {
        customer_address_id: this.state.selectedID,
      },
      useForShipping: true,
    };

    // https://haati.app/demo1/rest/V1/carts/mine/billing-address
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
          body: JSON.stringify(billData),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Billing Address details ::::::  ', data);
          this.setModalVisible(false);
          this.props.navigation.navigate('Checkout', {
            aid: this.state.selectedID,
            carrier_code: this.state.carrier_code,
            method_code: this.state.method_code,
          });
        });
      // }
    });
  }

  render() {
    const {checked} = this.state;
    const {modalVisible} = this.state;
    const {checkedship} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText}>Shipping Methods</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 10,
                }}>
                <View style={{width: '30%', alignItems: 'flex-start'}}>
                  <Text
                    style={{fontSize: 16, fontFamily: 'BalooBhai2-Regular'}}>
                    Select Method
                  </Text>
                </View>
                <View style={{width: '20%', alignItems: 'flex-start'}}>
                  <Text
                    style={{fontSize: 16, fontFamily: 'BalooBhai2-Regular'}}>
                    Price
                  </Text>
                </View>
                <View style={{width: '40%', alignItems: 'flex-start'}}>
                  <Text
                    style={{fontSize: 16, fontFamily: 'BalooBhai2-Regular'}}>
                    Method Title
                  </Text>
                </View>
              </View>
              <View style={{paddingBottom: 20}}>
                {this.state.shipItems &&
                  this.state.shipItems.map((sitem, si) => {
                    return (
                      <View
                        key={si}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingBottom: 10,
                        }}>
                        <View style={{width: '30%', alignItems: 'flex-start'}}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                selectedshipItem: si,
                                carrier_code: sitem.carrier_code,
                                method_code: sitem.method_code,
                              })
                            }>
                            {this.state.selectedshipItem === si ? (
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
                        <View style={{width: '20%', alignItems: 'flex-start'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'BalooBhai2-Regular',
                            }}>
                            {sitem.amount} INR
                          </Text>
                        </View>
                        <View style={{width: '40%', alignItems: 'flex-start'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'BalooBhai2-Regular',
                            }}>
                            {sitem.method_title}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => this.sendCards()}>
                  <Text style={styles.textStyle}>Next</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Address</Text>
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
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => this.openModal()}
                style={{
                  width: '48%',
                  borderRadius: 44,
                  padding: 10,
                  backgroundColor: '#D47EAC',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: 'baloobhai2-bold',
                  }}>
                  Send it to them
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.openModal()}
                style={{
                  width: '48%',
                  borderRadius: 44,
                  padding: 10,
                  backgroundColor: '#A1C8F6',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: 'baloobhai2-bold',
                  }}>
                  Send it to me
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              borderBottomWidth: 1,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontFamily: 'BalooBhai2-SemiBold',
              }}>
              We’ll send it straight to their door
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: '5%'}}
            data={this.state.searchresult}
            renderItem={({item, index}) => (
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: '#000000',
                }}
                key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View style={{width: '20%'}}>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        this.setState({
                          selectedItem: index,
                          selectedID: item.address_id,
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
                  <View style={{width: '60%'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'baloobhai2-bold',
                      }}>
                      {' '}
                      {item.first_name + ' ' + item.last_name}
                    </Text>

                    {/* <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BalooBhai2-Regular',
                      }}>
                      {' '}
                      {item.company
                        ? item.company + ','.trim()
                        : 'Vaishali Shopping Center,'}{' '}
                    </Text> */}

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
                  <View style={{width: '20%'}}>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.openpopup(item)}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'baloobhai2-bold',
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AddAddress');
            }}
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              marginBottom: 20
            }}>
            <Icon name="plus-a" color="#000" size={18} />
            <Text
              style={{
                color: '#000',
                fontSize: 24,
                fontFamily: 'BalooBhai2-Regular',
                marginLeft: 10,
              }}>
              Add an address
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.isLoading ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size={hp('6%')} color={'red'} />
          </View>
        ) : null}
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
    height: '100%',
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    paddingBottom: 20,
    paddingTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: '45%',
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#D47EAC',
  },
  buttonClose: {
    backgroundColor: '#A1C8F6',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'BalooBhai2-Regular',
  },
});
export default ShippingAddress;
