import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  BackHandler,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HaatiText from '../../assets/hatti.png';

class ViewWishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relation: '',
      wishItems: [],
      isLoading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      if (this.props.needToReload == true) {
        //do the stuff
      }
    });
    console.log('Token ::::: ', global.token);
    console.log(global.customer_id_new);
    if (global.token == undefined) {
      this.setState({isLoading: false});
      Alert.alert('Alert', 'Please Login Before Select Card', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
      ]);
    } else {
      this.wishDetails();
    }
    // this.wishDetails();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // Remove the event listener
    if (this.focusListener != null && this.focusListener.remove)
      this.focusListener.remove();
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  _onRefresh() {
    NetInfo.fetch().then(state => {
      if (state == false) {
        this.setState({refreshing: false});
      } else {
        this.wishDetails();
      }
    });
  }

  wishDetails() {
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/wishlist/product?customer_id=' +
          global.customer_id_new,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
            // 'Authorization': 'Bearer d500k92wam2fk5yzqwarmokcurpnfj8p',
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          var obj = JSON.parse(data);
          var result = Object.keys(obj).map(key => [Number(key), obj[key]]);
          var dataArr = [];
          result.forEach(element => {
            // element["arrId"] = element[0];
            dataArr.push(element[1]);
          });
          console.log('Wishlist data', dataArr);
          this.setState(
            {
              wishItems: dataArr,
              isLoading: false,
            },
            () => {},
          );
        })
        .catch(err => {
          if (err) {
            this.setState({
              isLoading: false,
            });
          }
        });
      // }
    });
  }

  removeWish(p_id) {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/wishlist/remove?customer_id=' +
          global.customer_id_new +
          '&product_id=' +
          p_id,
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
          console.log(data);
          this.wishDetails();
        });
    });
  }

  addCart = pName => {
    console.log(pName);
    global.skuCName = pName;
    this.props.navigation.navigate('Customization');
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={hp('6%')} color={'red'} />
      </View>
    ) : (
      // if data is available then displaying the data
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Wishlist</Text>
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
          {/* <Text>{JSON.stringify(this.state.wishItems[0])}</Text> */}
          {this.state.wishItems.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#A1C8F6',
                  marginBottom: 20,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  width: '100%',
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '20%'}}>
                    <Image
                      // source={image3}
                      source={{uri: `${item.productImage}`}}
                      style={{
                        // margin: 10,
                        width: '100%',
                        height: 75,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                  <View style={{width: '75%'}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: 'BalooBhai2-SemiBold',
                        color: 'grey',
                      }}>
                      {' '}
                      Product ID : {item.productId}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        fontFamily: 'BalooBhai2-SemiBold',
                      }}>
                      {' '}
                      Name : {item.productName}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.addCart(item.productName);
                    }}
                    style={{
                      width: '45%',
                      backgroundColor: '#D47EAC',
                      elevation: 5,
                      borderRadius: 44,
                      padding: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        fontFamily: 'baloobhai2-bold',
                        textAlign: 'center',
                      }}>
                      Add To Cart
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.removeWish(item.productId);
                    }}
                    style={{
                      width: '45%',
                      backgroundColor: '#D47EAC',
                      elevation: 5,
                      borderRadius: 44,
                      padding: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        fontFamily: 'baloobhai2-bold',
                        textAlign: 'center',
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
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
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: wp('100%'),
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ViewWishlist;
