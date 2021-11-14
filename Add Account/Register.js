import React, {Component} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  ToastAndroid,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';

import DropDownPicker from 'react-native-dropdown-picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
const {height, width} = Dimensions.get('window');
import HaatiText from '../../assets/hatti.png';
const strengLevels = [
  {
    label: 'Weak',
    labelColor: '#fff',
    widthPercent: '33',
    innerBarColor: '#fe6c6c',
  },
  {
    label: 'Weak',
    labelColor: '#fff',
    widthPercent: '33',
    innerBarColor: '#fe6c6c',
  },
  {
    label: 'Fair',
    labelColor: '#fff',
    widthPercent: '67',
    innerBarColor: '#feb466',
  },
  {
    label: 'Fair',
    labelColor: '#fff',
    widthPercent: '67',
    innerBarColor: '#feb466',
  },
  {
    label: 'Strong',
    labelColor: '#fff',
    widthPercent: '100',
    innerBarColor: '#6cfeb5',
  },
];

// Define too short object
const tooShort = {
  enabled: true,
  label: 'Too short',
  labelColor: 'red',
};

class Register extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    global.reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    global.pass = /^(?=.*[A-Z])(?=.*[0-9])/;
    super(props);
    this.state = {
      status: '',
      reason: '',
      selectlanguage: '',
      check: false,
      check1: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      repassword: '',
      hidePassword: true,
      hidePassword1: true,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  checkBoxTest() {
    this.setState({
      check: !this.state.check,
    });
  }
  checkBoxTest1() {
    this.setState({
      check1: !this.state.check1,
    });
  }

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  setPasswordVisibility1 = () => {
    this.setState({hidePassword1: !this.state.hidePassword1});
  };

  RegisterPage() {
    console.log('Haati');

    NetInfo.fetch().then(state => {
      console.log('Haati Haati');

      if (this.state.firstname === '') {
        ToastAndroid.show('Enter User Name', ToastAndroid.SHORT);
      } else if (this.state.lastname === '') {
        ToastAndroid.show('Enter lastname', ToastAndroid.SHORT);
      } else if (this.state.email === '') {
        ToastAndroid.show('Enter EmailId', ToastAndroid.SHORT);
      } else if (reg.test(this.state.email) === false) {
        // console.log("Email is Not Correct");
        this.setState({
          email: this.state.email,
        });
        console.log('Email is Not Correct');
        ToastAndroid.show('Email is Not Correct', ToastAndroid.SHORT);
        return false;
      } else if (pass.test(this.state.password) === false) {
        // console.log("Email is Not Correct");
        this.setState({
          password: this.state.password,
        });
        //console.log("Email is Not Correct");
        ToastAndroid.show(
          'Minimum of 8 characters in password is %1. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.',
          ToastAndroid.SHORT,
        );
        return false;
      } else if (this.state.password === '') {
        ToastAndroid.show('Enter Password', ToastAndroid.SHORT);
      } else if (this.state.password != this.state.repassword) {
        ToastAndroid.show(
          'Your password and reenterpassword is Incorrect',
          ToastAndroid.SHORT,
        );
      } else if (
        //  (  this.state.firstname !== "" && this.state.lastname !== ""  && this.state.email === "" && this.state.password !== "" && this.state.repassword !== ""){
        // (this.state.password === this.state.repassword)
        this.state.password.length >= 8
      ) {
        //   ToastAndroid.show('Your password is correct',ToastAndroid.SHORT);
        console.log('Print');
        fetch('https://haati.serverguy.cloud/rest/V1/customers', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: {
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              email: this.state.email,
            },
            password: this.state.password,
          }),
        })
          .then(response => response.json())
          .then(JsonResponse => {
            console.log('JsonResponse');

            console.log(JsonResponse);

            if (JsonResponse == true) {
              ToastAndroid.show(
                'User Registered Successfully',
                ToastAndroid.SHORT,
              );
              this.textInput.clear();
              this.textInput1.clear();
              this.textInput2.clear();
              this.textInput3.clear();
            } else {
              ToastAndroid.show(
                'Haati Account Saved Successfully',
                ToastAndroid.SHORT,
              );
              setTimeout(() => {
                this.props.navigation.navigate('Login');
              }, 500);
            }
          });
      } else {
        ToastAndroid.show(
          'At least 8 character including  a letter and a number',
          ToastAndroid.SHORT,
        );
      }
    });
  }

  validate = emailadd => {
    console.log(emailadd);

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(emailadd) === false) {
      // console.log("Email is Not Correct");
      this.setState({
        email: emailadd,
      });
      console.log('Email is Not Correct');
      ToastAndroid.show('Email is Not Correct', ToastAndroid.SHORT);
      return false;
    } else {
      this.setState({
        email: emailadd,
      });
      console.log('Email is Correct');
      ToastAndroid.show('Email is Correct', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* re */}
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Register</Text>
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
        {/* second */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <View style={styles.loginForm}>
            <Text style={[styles.semiBold, {fontSize: 24, marginBottom: 20}]}>
              Create Account
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
                Phone Number
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="Phone Number"
                keyboardType="number-pad"
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Email
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="Email"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Password
              </Text>
              <View style={{position: 'relative', marginBottom: 15}}>
                <TextInput
                  style={styles.inputBtn}
                  placeholder="Password"
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                />
                <TouchableOpacity
                  onPress={() => this.setPasswordVisibility()}
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                  }}>
                  <Icons
                    name={this.state.hidePassword ? 'eye-off' : 'eye'}
                    size={18}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'BalooBhai2-Regular',
                    marginTop: -15,
                  }}>
                  At least 8 character including a letter and a number
                </Text>
              </View>
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Confirm Password
              </Text>
              <View style={{position: 'relative'}}>
                <TextInput
                  style={styles.inputBtn}
                  placeholder="Confirm Password"
                  secureTextEntry={this.state.hidePassword1}
                  onChangeText={repassword => this.setState({repassword})}
                  value={this.state.repassword}
                />
                <TouchableOpacity
                  onPress={() => this.setPasswordVisibility1()}
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                  }}>
                  <Icons
                    name={this.state.hidePassword ? 'eye-off' : 'eye'}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                style={{
                  width: 40,
                  height: 40,
                  borderColor: '#000000',
                }}
                value={this.state.check}
                onChange={() => this.checkBoxTest()}
                tintColors={{true: 'pink'}}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'BalooBhai2-Regular',
                }}>
                I agree to HAATI's terms and conditions and 16 years old and
                have here read the privacy notice.
              </Text>
            </View>
            <View
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                style={{
                  width: 40,
                  height: 40,
                  borderColor: '#000000',
                }}
                value={this.state.check1}
                onChange={() => this.checkBoxTest1()}
                tintColors={{true: 'pink'}}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'BalooBhai2-Regular',
                }}>
                Freebies, offers and news sounds good? Then tick here!
              </Text>
            </View>
            <View style={styles.logBtnContainer}>
              <TouchableOpacity
                onPress={() => this.RegisterPage()}
                style={styles.logBtn}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'baloobhai2-bold',
                    fontSize: 16,
                  }}>
                  Create Account
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
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: (width / 100) * 100,
    height: '100%',
    // paddingBottom: 20,
    paddingTop: 20,
  },
  loginForm: {
    paddingRight: 30,
    paddingLeft: 30,
    // borderBottomColor: '#000000',
    // borderBottomWidth: 1,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
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
  forgotText: {
    fontSize: 16,
    color: '#E8505B',
    fontFamily: 'BalooBhai2-SemiBold',
    marginBottom: 20,
  },
  logBtnContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logBtn: {
    padding: 10,
    width: '100%',
    backgroundColor: '#E73A5E',
    borderRadius: 44,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    marginTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },
  btnContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default Register;
