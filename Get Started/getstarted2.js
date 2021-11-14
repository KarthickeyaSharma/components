import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ToastAndroid,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HaatiText from '../../assets/hatti.png';
import Icon from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HaatiStart2 extends Component {
  constructor(props) {
    global.language_name = '';
    super(props);
    (this.state = {
      status: '',
      typeList: [],
      type: '',
      daysession: '',
      layoutTouch: false,
      selectedItem: null,
      isLoading: true,
    }),
      (this.inputRef = React.createRef());
  }

  componentDidMount() {
    this.LanguageDetails();
    console.log(language_name);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  LanguageDetails() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/app/all/languages/post?id=1',
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          JsonResponse = JSON.parse(JsonResponse);
          console.log(JsonResponse);
          this.setState(
            {
              typeList: JsonResponse,
              isLoading: false,
            },
            function () {},
          );
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  language_name1() {
    language_name = this.state.type;
    console.log(language_name);
    NetInfo.fetch().then(state => {
      language_name = this.state.type;
      console.log('g');
      console.log(language_name);
      if (this.state.type === '') {
        ToastAndroid.show('Please Select Your Language', ToastAndroid.SHORT);
      } else {
        AsyncStorage.multiSet([
          ['language', JSON.stringify(language_name)],
          ['greeting', JSON.stringify(true)],
        ]);
        this.props.navigation.navigate('HaatiStart3');
      }
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={hp('6%')} color={'red'} />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Language</Text>
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
        <View style={styles.mainContainer}>
          <Text
            style={{
              fontFamily: 'BalooBhai2-SemiBold',
              fontSize: 24,
            }}>
            Choose Language
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '50%'}}
            data={
              this.state.typeList !== null &&
              this.state.typeList.length > 0 &&
              this.state.typeList
            }
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  width: '100%',
                  padding: 15,
                  backgroundColor: '#FFFFFF',
                  marginTop: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onPress={() => {
                  this.setState({
                    selectedItem: index,
                    type: item.name,
                  });
                }}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
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
                </View>
                <View
                  style={{
                    width: '80%',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'BalooBhai2-SemiBold',
                      fontSize: 18,
                    }}>
                    {item.native_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'BalooBhai2-SemiBold',
                      fontSize: 14,
                      color: 'gray',
                    }}>
                    {item.name}
                  </Text>
                  <Image
                    resizeMode={'cover'}
                    source={{uri: item.native_image}}
                    style={{
                      width: 100,
                      height: '100%',
                      position: 'absolute',
                      bottom: -15,
                      right: 15,
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 117,
              right: 0,
              left: 0,
              backgroundColor: '#fff',
              padding: 10,
              boxWithShadow: {
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
              },
            }}>
            <TouchableOpacity
              onPress={() => this.language_name1()}
              disabled={this.state.selectedItem == null ? true : false}
              style={{
                width: '100%',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  this.state.selectedItem == null ? '#d3d3d3' : '#EF80B1',
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 16,
                  fontFamily: 'BalooBhai2-SemiBold',
                }}>
                Continue
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
    paddingRight: 10
  },
  title: {
    width: 100,
    height: 40,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 40,
    width: wp('100%'),
    // height: hp('100%'),
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default HaatiStart2;
