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
  Alert,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HaatiText from '../../assets/hatti.png';
const {height, width} = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';

class ForgotPassword extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    global.reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    global.pass = /^(?=.*[A-Z])(?=.*[0-9])/;
    super(props);
    this.state = {
      emailaddress: '',
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

  ForgetPwdPage() {
    NetInfo.fetch().then(state => {
      if (this.state.emailaddress === '') {
        ToastAndroid.show('Enter Email Address', ToastAndroid.SHORT);
      } else {
        fetch(
          'https://haati.serverguy.cloud/rest/V1/customers/password?email=' +
            this.state.emailaddress +
            '&template=' +
            'email_reset' +
            '&websiteId=' +
            1,
          {
            method: 'PUT',
            // headers: {
            //   Accept: 'application/json',
            //   'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            //   email: this.state.emailaddress,
            //   template: 'email_reset',
            //   websiteId: 1,
            // }),
          },
        )
          .then(response => response.json())
          .then(JsonResponse => {
            console.log(JsonResponse);
            if (JsonResponse == true) {
              ToastAndroid.show('Email Sent Successfully', ToastAndroid.SHORT);
              //   setTimeout(() => {
              //     this.props.navigation.navigate('ForgotPassVerification');
              //   }, 400);
              Alert.alert(
                'Alert',
                'Password change link has been sent to your registered email.',
                [{text: 'OK', onPress: () => this.props.navigation.goBack()}],
              );
            } else {
              ToastAndroid.show(
                'Enter your correct email address',
                ToastAndroid.SHORT,
              );
            }
          });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* re */}
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Forgot Password</Text>
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
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Image
              source={require('../../assets/key.png')}
              style={{
                height: 146,
                width: 189,
              }}></Image>
            <Text
              style={{
                fontWeight: '600',
                marginTop: 20,
                fontSize: 24,
                fontFamily: 'BalooBhai2-SemiBold',
              }}>
              Forgotten your password?
            </Text>
            <Text
              style={{
                fontWeight: '400',
                marginTop: 10,
                fontSize: 12,
                fontFamily: 'BalooBhai2-Regular',
              }}>
              Simply enter your email address below and
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                fontFamily: 'BalooBhai2-Regular',
              }}>
              we will email you a link to reset your password
            </Text>
          </View>

          <View style={{position: 'relative', marginTop: 30}}>
            <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
              Email
            </Text>
            <TextInput
              style={styles.inputBtn}
              placeholder="Email address"
              onChangeText={emailaddress => this.setState({emailaddress})}
              value={this.state.emailaddress}
            />
          </View>
          <View style={styles.logBtnContainer}>
            <TouchableOpacity
              onPress={() => this.ForgetPwdPage()}
              style={[styles.logBtn, {width: '70%', marginBottom: 10}]}>
              <Text
                style={{
                  color: '#ffffff',
                  fontFamily: 'baloobhai2-bold',
                  fontSize: 16,
                }}>
                Send email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[
                styles.logBtn,
                {width: '70%', backgroundColor: '#E0E0E0'},
              ]}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'baloobhai2-bold',
                  fontSize: 16,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}
              style={[
                styles.logBtn,
                {width: '85%', backgroundColor: '#1693db', marginBottom: 50},
              ]}>
              <Text
                style={{
                  color: '#ffffff',
                  fontFamily: 'baloobhai2-bold',
                  fontSize: 16,
                }}>
                Create account
              </Text>
            </TouchableOpacity>
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
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center',
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
  logBtnContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logBtn: {
    padding: 10,
    width: '80%',
    backgroundColor: '#E73A5E',
    borderRadius: 44,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ForgotPassword;
