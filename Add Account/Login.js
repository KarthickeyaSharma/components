import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  NativeModules,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {ScrollView} from 'react-native-gesture-handler';
import {LoginManager} from 'react-native-fbsdk'; 
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';
const {width, height} = Dimensions.get('window');
import HaatiText from '../../assets/hatti.png';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
var firebaseanalytics = require('react-native-firebase-analytics');
const {RNTwitterSignIn} = NativeModules;
const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: 'yI7LJ7yPeN7hQgqHsF1UTXUrw',
  TWITTER_CONSUMER_SECRET: 'FjUZtlbeIjjsfh41R6pviCcPCMK3A3KMKaAMauPhLYb9ZnCOq8',
};
global.reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: 'mohanhds2010@gmail.com',
      password: 'MOHANNk1@',
      hidePassword: true,
      secured: true,
      tokenResponse: '',
    };
  }

  componentDidMount() {
    console.log(global.pageType, this.props.route);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (global.pageType == 'Exit') {
      BackHandler.exitApp();
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  twitterLogin = async () => {
    try {
      await RNTwitterSignIn.init(
        Constants.TWITTER_COMSUMER_KEY,
        Constants.TWITTER_CONSUMER_SECRET,
      );
      const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn();
      // const user = firebase.auth().currentUser;
      const credential = firebase.auth.TwitterAuthProvider.credential(
        authToken,
        authTokenSecret,
      );

      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      if (firebaseUserCredential) {
        this.setState({
          isLoggedIn: true,
        });
      }
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

      firebaseanalytics.logEvent('Twitter', {
        'result': JSON.stringify(firebaseUserCredential.user.toJSON())
      });
    } catch (e) {
      console.error(e);
    }
  };

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  setIgToken = data => {
    console.log('data', data);
    firebaseanalytics.logEvent('Instagram', {
      'result': data
    });
    this.setState({token: data.access_token});
  };

  onClear() {
    CookieManager.clearAll(true).then(res => {
      this.setState({token: null});
    });
  }

  HaatiLogin() {
    console.log('Haati');
    NetInfo.fetch().then(state => {

      firebaseanalytics.logEvent('LogIn', {
        'email': this.state.email
      });

      if (this.state.email === '') {
        ToastAndroid.show('Enter Email Address', ToastAndroid.SHORT);
      } else if (reg.test(this.state.email) === false) {
        ToastAndroid.show('Email is Invalid', ToastAndroid.SHORT);
      } else if (this.state.password === '') {
        ToastAndroid.show('Enter Password', ToastAndroid.SHORT);
      } else {

        fetch(
          'https://haati.serverguy.cloud/rest/V1/integration/customer/token?username=' +
            this.state.email +
            '&password=' +
            this.state.password,
          {
            method: 'POST',
          },
        )
          .then(response => response.json())
          .then(JsonResponse => {
            if (
              JsonResponse.message != null &&
              JsonResponse.message != undefined
            ) {
              ToastAndroid.show(JsonResponse.message, ToastAndroid.SHORT);
            } else {
              global.token = JsonResponse;
              console.log(global.token);
              ToastAndroid.show('Login Successful. ', ToastAndroid.SHORT);
              this.tokenMethod();
              setTimeout(() => {
                this.props.navigation.navigate('HomeTabs');
              }, 500);
            }
          });
      }
    });
  }

  tokenMethod() {
    NetInfo.fetch().then(state => {
      fetch('https://haati.serverguy.cloud/rest/V1/customers/me', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${global.token}`,
        },
      })
        .then(response => response.json())
        .then(JsonResponse => {
          //  JsonResponse = JSON.parse(JsonResponse)
          console.log(JsonResponse);
          global.customer_id_new = JsonResponse.addresses[0].customer_id;
          console.log(global.customer_id_new);
          global.default_shipping = JsonResponse.default_shipping;
          console.log(global.default_shipping);
          global.customer_email = JsonResponse.email;
          console.log(global.customer_email);
          global.isLoggedIn = true;
          AsyncStorage.multiSet([
            ['token', JSON.stringify(global.token)],
            ['isLoggedin', JSON.stringify(true)],
            ['customer_id_new', JSON.stringify(customer_id_new)],
            ['default_shipping', JSON.stringify(default_shipping)],
            ['customer_email', JSON.stringify(customer_email)],
            ['customer_pass', JSON.stringify(this.state.password)],
            [
              'customer_name',
              JSON.stringify(
                JsonResponse.firstname + ' ' + JsonResponse.lastname,
              ),
            ],
          ]);
        });
    });
  }

  handleFacebookLogin() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          firebaseanalytics.logEvent('FaceBookLogIn', {
            'result': result
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* re */}
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Login</Text>
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
            <Text style={[styles.semiBold, {fontSize: 24}]}>
              Have an account?
            </Text>
            <Text style={[styles.semiBold, {fontSize: 18, marginBottom: 20}]}>
              Sign in to continue
            </Text>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Email
              </Text>
              <TextInput
                style={styles.inputBtn}
                placeholder="Email address"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
            </View>
            <View style={{position: 'relative'}}>
              <Text style={[styles.semiBold, {fontSize: 16, marginBottom: 5}]}>
                Password
              </Text>
              <View style={{position: 'relative'}}>
                <TextInput
                  style={styles.inputBtn}
                  secureTextEntry={this.state.hidePassword}
                  placeholder="Password"
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
              </View>
            </View>
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ForgotPassword');
                }}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.logBtnContainer}>
              <TouchableOpacity
                onPress={() => this.HaatiLogin()}
                style={styles.logBtn}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'baloobhai2-bold',
                    fontSize: 16,
                  }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 30}}>
              <Text
                style={{
                  color: 'grey',
                  fontFamily: 'BalooBhai2-Regular',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                By signing in you agree to accept our term,
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontFamily: 'BalooBhai2-Regular',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                and conditions and that you have read our Privacy notice
              </Text>
            </View>
          </View>

          <View style={styles.registerContainer}>
            <Text style={[styles.semiBold, {fontSize: 24}]}>New to HAATI?</Text>
            <Text style={[styles.semiBold, {fontSize: 18}]}>
              Create an account to continue
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}
              style={styles.btnContainer}>
              <Icons name={'email'} color={'#000000'} size={28} />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-Regular',
                  marginTop: 1,
                }}>
                Create Account with Email
              </Text>
              <Text
                style={{
                  color: 'transparent',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.handleFacebookLogin}
              style={[
                styles.btnContainer,
                {backgroundColor: '#1693db', borderColor: '#1693db'},
              ]}>
              <Icons name={'facebook'} color={'#ffffff'} size={28} />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-Regular',
                  marginTop: 1,
                  color: '#ffffff',
                }}>
                Login With Facebook
              </Text>
              <Text
                style={{
                  color: 'transparent',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.twitterLogin()}
              style={[
                styles.btnContainer,
                {backgroundColor: '#00ffff', borderColor: '#00ffff'},
              ]}>
              <Icons name={'twitter'} color={'#ffffff'} size={28} />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-Regular',
                  marginTop: 1,
                  color: '#ffffff',
                }}>
                Login With Twitter
              </Text>
              <Text
                style={{
                  color: 'transparent',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.instagramLogin.show()}
              style={[
                styles.btnContainer,
                {
                  backgroundColor: '#cd486b',
                  borderColor: '#cd486b',
                  marginBottom: 30,
                },
              ]}>
              <Icons name={'instagram'} color={'#ffffff'} size={28} />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-Regular',
                  marginTop: 1,
                  color: '#ffffff',
                }}>
                Login With Instagram
              </Text>
              <Text
                style={{
                  color: 'transparent',
                }}>
                Sign in
              </Text>
              <InstagramLogin
                ref={ref => (this.instagramLogin = ref)}
                appId="1514812005576081"
                appSecret="8e7eba6bec9a3c9dc480b7c2cb1cbb68"
                redirectUrl="https://instagram.com"
                scopes={['user_profile', 'user_media']}
                onLoginSuccess={this.setIgToken}
                onLoginFailure={data => console.log(data)}
              />
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
    paddingBottom: 20,
    paddingTop: 20,
  },
  loginForm: {
    paddingRight: 30,
    paddingLeft: 30,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
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

export default Login;
