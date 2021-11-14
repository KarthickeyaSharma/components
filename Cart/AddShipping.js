import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
  BackHandler
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import {Picker} from '@react-native-picker/picker';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Fontisto';
import HaatiText from '../../assets/hatti.png';
import States from '../../states.json';

class AddShipping extends Component {
  constructor(props) {
    global.userId = '';
    super(props);
    this.state = {
      status: '',
      country: 'IN',
      city: '',
      address: '',
      phonenumber: '',
      postcode: '',
      region: '',
      ID: '',
      company: '',
      email: '',
      fname: '',
      lname: '',
      modalVisible: false,
      shipItems: [],
      method_code: '',
      carrier_code: '',
      status: false,
      selectedshipItem: null,
    };
  }

  componentDidMount() {
    console.log('Add Shipping Address');
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  handleguestShipping() {
    var regionData = States.find(item => {
      return item.default_name == this.state.region;
    });

    const guestShip = {
      address: {
        city: this.state.city,
        company: this.state.company,
        email: this.state.email,
        firstname: this.state.fname,
        lastname: this.state.lname,
        postcode: this.state.postcode,
        region: this.state.region,
        street: [this.state.address],
        telephone: this.state.phonenumber,
        country_id: this.state.country,
        same_as_billing: '1',
      },
    };

    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/guest-carts/' +
          global.cartToken +
          '/estimate-shipping-methods',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.guestToken,
          },
          body: JSON.stringify(guestShip),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({
            status: true,
            shipItems: data,
          });
          this.openModal();
        });
    });
  }

  openModal() {
    console.log(this.state.selectedID);
    if (!this.state.status) {
      Alert.alert('Please select an address to continue.');
    } else {
      this.setModalVisible(true);
    }
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  sendCards() {

    var regionData = States.find(item => {
      return item.default_name == this.state.region;
    });

    const shipInform = {
      addressInformation: {
        billingAddress: {
          city: this.state.city,
          countryId: this.state.country,
          company: this.state.company,
          email: this.state.email,
          firstname: this.state.fname,
          lastname: this.state.lname,
          postcode: this.state.postcode,
          region: this.state.region,
          street: [this.state.address],
          telephone: this.state.phonenumber,
        },
        shippingAddress: {
          city: this.state.city,
          countryId: this.state.country,
          company: this.state.company,
          email: this.state.email,
          firstname: this.state.fname,
          lastname: this.state.lname,
          postcode: this.state.postcode,
          region: this.state.region,
          street: [this.state.address],
          telephone: this.state.phonenumber,
        },
        shippingCarrierCode: this.state.carrier_code,
        shippingMethodCode: this.state.method_code,
      },
    };
    console.log(this.state.selectedshipItem, 'si');
    if (this.state.selectedshipItem == null) {
      Alert.alert('Please select an shipping method to continue.');
    } else {
      this.setModalVisible(false);
      this.props.navigation.navigate('GuestCheckout', {
        shipInfo: shipInform,
        carrier_code: this.state.carrier_code,
        method_code: this.state.method_code,
      });
    }
  }

  render() {
    const {modalVisible} = this.state;
    return (
      // whole screen
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
        {/* scroll */}

        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Edit Address</Text>
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
        {/* pink box */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <View style={styles.addressForm}>
            <Text style={[styles.semiBold, {fontSize: 24, marginBottom: 20}]}>
              Contact Details
            </Text>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                First Name
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="First Name"
                onChangeText={fname => this.setState({fname})}
                value={this.state.fname}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Last Name
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="Last Name"
                onChangeText={lname => this.setState({lname})}
                value={this.state.lname}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Company (Optional)
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="Company"
                onChangeText={company => this.setState({company})}
                value={this.state.company}
              />
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#E280AA',
              marginTop: 15,
              marginBottom: 25,
            }}></View>
          <View style={styles.addressForm}>
            {/* address */}
            <Text style={[styles.semiBold, {fontSize: 24, marginBottom: 20}]}>
              Address Details
            </Text>
            {/* country */}
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Country
              </Text>
              <Picker
                selectedValue={this.state.country}
                style={styles.inputBtn}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    country: itemValue,
                  })
                }>
                <Picker.Item label="India" value="IN" />
              </Picker>
            </View>

            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Phone number
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="+91"
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={phonenumber => this.setState({phonenumber})}
                value={this.state.phonenumber}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Email
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="e.g demo@haati.com"
                keyboardType="email-address"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Postal code
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="600000"
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={postcode => this.setState({postcode})}
                value={this.state.postcode}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                City
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="e.g Chennai"
                onChangeText={city => this.setState({city})}
                value={this.state.city}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Region
              </Text>
              <Picker
                selectedValue={this.state.region}
                style={styles.inputBtn}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    region: itemValue,
                  })
                }>
                {States.map(region => {
                  return (
                    <Picker.Item
                      label={region.default_name}
                      value={region.code}
                      key={region.region_id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Address
              </Text>
              <TextInput
                multiline
                numberOfLines={3}
                style={styles.inputBtn}
                placeholder="Address"
                onChangeText={address => this.setState({address})}
                value={this.state.address}
              />
            </View>
            <View style={styles.addBtnContainer}>
              <TouchableOpacity
                onPress={() => this.handleguestShipping()}
                style={styles.addBtn}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'BalooBhai2-SemiBold',
                    fontSize: 16,
                  }}>
                  Proceed To Checkout
                </Text>
              </TouchableOpacity>
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
  addressForm: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  semiBold: {
    fontFamily: 'BalooBhai2-SemiBold',
    marginBottom: 10,
  },
  inputBtn: {
    padding: 10,
    fontSize: 17,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DEDEDE',
    fontFamily: 'BalooBhai2-Regular',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  addBtnContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    padding: 10,
    width: '100%',
    backgroundColor: '#E73A5E',
    borderRadius: 44,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
export default AddShipping;
