import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import NetInfo from '@react-native-community/netinfo';
const {width, height} = Dimensions.get('window');

import HaatiText from '../../assets/hatti.png';
import States from '../../states.json';

class EditAddress extends Component {
  constructor(props) {
    global.userId = '';
    super(props);

    this.state = {
      status: '',
      relation: '',
      country: '',
      city: '',
      address: '',
      phonenumber: '',
      postcode: '',
      region: '',
      ID: '',
      firstname: '',
      lastname: '',
      company: '',
    };
  }

  componentDidMount() {
    console.log('Edit Details');

    global.userId = this.props.route.params.ID;
    console.log(this.props.route.params.region);

    this.setState({
      firstname: this.props.route.params.firstname,
      lastname: this.props.route.params.lastname,
      country: this.props.route.params.country,
      phonenumber: this.props.route.params.phonenumber,
      postcode: this.props.route.params.postcode,
      city: this.props.route.params.city,
      region: this.props.route.params.region,
      address: this.props.route.params.address,
      ID: this.props.route.params.ID,
    });
  }

  EditDetails() {
    NetInfo.fetch().then(state => {
      if (this.state.city === '') {
        ToastAndroid.show('Enter City Name', ToastAndroid.SHORT);
      } else {
        var regionData = States.find(item => {
          return item.default_name == this.state.region;
        });
        console.log(regionData);
        // fetch('https://haati.serverguy.cloud/rest/V1/addnewaddress/post?customer_id=' + 19 + '&telephone=' + this.state.phonenumber + '&country=', + this.state.status + '&postcode=' + this.state.postcode + '&city=' + this.state.city + '&street=' + this.state.address + {

        fetch('https://haati.serverguy.cloud/rest/V1/updateaddress/post?', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address_id: this.state.ID,
            telephone: this.state.phonenumber,
            country: this.state.country,
            postcode: this.state.postcode,
            region:
              regionData.default_name +
              ',' +
              regionData.code +
              ',' +
              regionData.region_id,
            city: this.state.city,
            street: this.state.address,
          }),
        })
          .then(response => response.json())
          .then(JsonResponse => {
            console.log(JsonResponse);
            console.log(JsonResponse.massage);
            if (JsonResponse == true) {
              ToastAndroid.show(
                'Patient Details Saved Successfully',
                ToastAndroid.SHORT,
              );
            } else {
              ToastAndroid.show(
                'Address Updated succesfully',
                ToastAndroid.SHORT,
              );
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 500);
            }
          });
      }
    });
  }

  render() {
    return (
      // whole screen
      <View style={styles.container}>
        {/* basket */}
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
                onChangeText={firstname => this.setState({firstname})}
                value={this.state.firstname}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Last Name
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="Last Name"
                onChangeText={lastname => this.setState({lastname})}
                value={this.state.lastname}
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
              {/* <DropDownPicker
                  items={[
                    {label: 'India', value: 'IN'},
                    {label: 'Bangladesh', value: 'BN'},
                  ]}
                  defaultValue={this.state.country}
                  placeholder="India"
                  color="black"
                  arrowStyle="down"
                  containerStyle={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#DEDEDE',
                    borderRadius: 4,
                  }}
                  style={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#DEDEDE',
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: 'white'}}
                  onChangeItem={item =>
                    this.setState({
                      country: item.value,
                    })
                  }
                  labelStyle={{
                    color: 'black',
                    marginLeft: 53,
                    marginTop: 4,
                    fontFamily: 'BalooBhai2-Regular',
                  }}
                /> */}
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
                {/* <Picker.Item label="Pakistan" value="PK" /> */}
              </Picker>
            </View>

            {/* <View style={{position: 'relative'}}>
                <Text
                  style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                  Country
                </Text>
                <TextInput
                  style={styles.inputBtn}
                  placeholder="Country"
                  onChangeText={country => this.setState({country})}
                  value={this.state.country}
                />
              </View> */}

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
                      value={region.default_name}
                      key={region.region_id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                City
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="Chennai"
                onChangeText={city => this.setState({city})}
                value={this.state.city}
              />
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
                onPress={() => this.EditDetails()}
                style={styles.addBtn}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'BalooBhai2-SemiBold',
                    fontSize: 16,
                  }}>
                  Update Address
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
    height: '100%',
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
});
export default EditAddress;
