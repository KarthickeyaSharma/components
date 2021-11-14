import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  StyleSheet,
} from 'react-native';
import backgroundImage from '../../assets/haatilogo.png';
import Image1 from '../../assets/goodmorning.png';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
var firebaseanalytics = require('react-native-firebase-analytics');
class HaatiStart extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      status: '',
      daysession: '',
      isBlinking: false,
      layoutTouch: false,
    }),
      (this.inputRef = React.createRef());
  }


  componentWillMount() {
    firebaseanalytics.setUserId('11111');
    firebaseanalytics.setUserProperty('propertyName', 'propertyValue');
    firebaseanalytics.logEvent('view_item', {
      'item_id': 'login'
    });
  }


  
  componentDidMount() {
    var now = new Date(),
      hour = now.getHours();
    var morning = hour >= 4 && hour <= 11,
      afternoon = hour >= 12 && hour <= 16,
      evening = hour >= 17 && hour <= 20,
      night = hour >= 21 || hour <= 3;
    if (morning) {
      this.setState({daysession: 'Good Morning'});
    } else if (afternoon) {
      this.setState({daysession: 'Good Afternoon'});
    } else if (evening) {
      this.setState({daysession: 'Good Evening'});
    } else if (night) {
      this.setState({daysession: 'Good Evening'});
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={backgroundImage}
            style={{
              width: 120,
              height: 150,
            }}
          />
        </View>
        <View style={styles.mainContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Image1}
              style={{
                width: 150,
                height: 150,
                marginTop: -50,
              }}
            />
            <Text
              style={{
                fontSize: 40,
                marginTop: 40,
                marginBottom: 40,
                fontFamily: 'BalooBhai2-Regular',
              }}>
              {this.state.daysession}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('HaatiStart2');
              }}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 25,
                marginBottom: 40,
                backgroundColor: '#EF80B1',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 18,
                  fontFamily: 'BalooBhai2-SemiBold',
                }}>
                Get Started
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
                // marginBottom: 5,
                fontFamily: 'BalooBhai2-SemiBold',
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                global.pageType = 'Back';
                this.props.navigation.navigate('AddAccount');
              }}>
              <Text
                style={{
                  color: '#EF80B1',
                  fontSize: 16,
                  fontFamily: 'BalooBhai2-SemiBold',
                }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
    height: '100%',
  },
  logoContainer: {
    padding: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: '100%',
    height: '100%',
  },
});
export default HaatiStart;
