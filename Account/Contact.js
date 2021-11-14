import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  BackHandler,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HaatiText from '../../assets/hatti.png';
import image3 from '../../assets/product.png';
import NetInfo from '@react-native-community/netinfo';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      email: '',
      desc: '',
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

  submitForm() {
    if (
      this.state.name == '' ||
      this.state.name == null ||
      this.state.number == '' ||
      this.state.number == null ||
      this.state.email == '' ||
      this.state.name == null ||
      this.state.desc == '' ||
      this.state.name == null
    ) {
      Alert.alert('Alert', 'Please fill the full details.', [
        {
          text: 'OK',
          onPress: () => console.log('Cancelled'), //this.props.navigation.goBack(),
        },
      ]);
    }
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/contact/us?contactForm[name]=' +
          this.state.name +
          '&contactForm[email]=' +
          this.state.email +
          '&contactForm[telephone]=' +
          this.state.number +
          '&contactForm[comment]=' +
          this.state.desc,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          Alert.alert('Alert', data.message, [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('greet'), //this.props.navigation.goBack(),
            },
          ]);
        });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'BalooBhai2-Regular',
                textAlign: 'center',
              }}>
              Contact
            </Text>
          </View>
          <View
            style={{
              width: wp('40%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={HaatiText} style={{width: 100, height: 40}}></Image>
          </View>
          <View style={styles.w30}>
            <Text style={{color: 'transparent'}}>Hello</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{
            backgroundColor: '#FDF2F7',
            borderTopRightRadius: 44,
            width: wp('100%'), //height: "auto"
            height: hp('100%'),
          }}>
          <View style={{margin: 20, padding: 20}}>
            <View style={{marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    textAlign: 'center',
                    fontSize: 24,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  Contact Us
                </Text>
              </View>
              <View style={{textAlign: 'left'}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  Write Us
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  Jot us a note and we’ll get back to you as quickly as
                  possible.
                </Text>
              </View>
              <TextInput
                placeholder="Name"
                style={{
                  width: '100%',
                  borderColor: '#ccc',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                  marginBottom: 20,
                }}
                value={this.state.name}
                onChangeText={value => this.setState({name: value})}
              />
              <TextInput
                placeholder="Email"
                style={{
                  width: '100%',
                  borderColor: '#ccc',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                  marginBottom: 20,
                }}
                value={this.state.email}
                onChangeText={value => this.setState({email: value})}
              />
              <TextInput
                placeholder="Phone Number"
                style={{
                  width: '100%',
                  borderColor: '#ccc',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                  marginBottom: 20,
                }}
                value={this.state.number}
                onChangeText={value => this.setState({number: value})}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="What's on your mind?"
                multiline={true}
                numberOfLines={4}
                style={{
                  width: '100%',
                  borderColor: '#ccc',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                  marginBottom: 20,
                }}
                value={this.state.desc}
                onChangeText={value => this.setState({desc: value})}
              />
              <TouchableOpacity
                onPress={() => {
                  this.submitForm();
                }}
                style={{
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#EF80B1',
                  borderRadius: 4,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>SUBMIT</Text>
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
});
export default Contact;
