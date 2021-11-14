import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import HaatiText from '../../assets/hatti.png';
import image2 from '../../assets/people.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HaatiStart4 extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    (this.state = {
      status: '',
      searchresult: [],
      layoutTouch: false,
    }),
      (this.inputRef = React.createRef());
  }

  componentDidMount() {
    console.log(language_name);
    this.Language_change();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  Language_change() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest//V1/app/start/languages/post?id=' +
          language_name,
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
              searchresult: JsonResponse,
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

  skip_func = () => {
    AsyncStorage.setItem('getStarted', JSON.stringify(true));
    this.props.navigation.navigate('HomeTabs');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={{color: 'transparent'}}>Greeting</Text>
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
            <TouchableOpacity
              onPress={() => {
                this.skip_func();
              }}>
              <Text style={styles.mainText}>Skip for Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: '20%'}}
            data={this.state.searchresult}
            renderItem={({item}) => (
              <View>
                <View>
                  <Text
                    style={{
                      fontSize: 30,
                      fontFamily: 'BalooBhai2-Regular',
                      marginTop: 10,
                    }}>
                    {item.name3}
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      fontFamily: 'BalooBhai2-Regular',
                      // marginTop: 10,
                    }}>
                    {item.name3_e_part1}
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      fontFamily: 'BalooBhai2-Regular',
                      // marginTop: 10,
                    }}>
                    {item.name3_e_part2}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 20,
                    fontFamily: 'BalooBhai2-Regular',
                  }}>
                  {item.name4}
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <Image source={image2} style={{width: 220, height: 150}} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <View
                    style={{
                      height: 17,
                      width: 17,
                      backgroundColor: 'white',
                      borderWidth: 0.2,
                      borderRadius: 17,
                    }}
                  />
                  <View
                    style={{
                      height: 17,
                      width: 17,
                      borderWidth: 0.2,
                      borderRadius: 17,
                      backgroundColor: 'white',
                      left: 50,
                    }}
                  />
                  <View
                    style={{
                      height: 17,
                      width: 17,
                      backgroundColor: 'grey',
                      borderWidth: 0.2,
                      borderRadius: 17,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('HaatiStart5');
                  }}
                  style={{
                    width: '100%',
                    padding: 10,
                    backgroundColor: '#EF80B1',
                    borderRadius: 44,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      color: '#ffffff',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'BalooBhai2-SemiBold',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
    paddingBottom: 20,
    width: wp('100%'),
    height: hp('100%'),
  },
});
export default HaatiStart4;
