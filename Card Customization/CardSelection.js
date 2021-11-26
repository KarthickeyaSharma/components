import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  BackHandler,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import HaatiText from '../../assets/hatti.png';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
import AsyncStorage from '@react-native-async-storage/async-storage';
var firebaseanalytics = require('react-native-firebase-analytics');

const options = {
  title: 'Pick an Image',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
};
class CardSelection extends Component {
  constructor(props) {
    super(props);
    // global.skuCName = '';
    this.state = {
      activeimageSlide: 0,
      imageSlider: [],
      avatarSource: null,
      searchresult: null,
      selectedItem: null,
      searchimages: null,
      selectedTitle: null,
      selectedoptionValue: null,
      selectedoptionId: null,
    };
  }

  componentDidMount() {
    // console.log(this.props.route.params);
    // skuCName = this.props.route.params.skuName;
    console.log(global.skuCName);
    console.log(skuCName);
    console.log('Token ::::: ', global.token);
    this.CardsDetailsAPI();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  CardsDetailsAPI() {
    NetInfo.fetch().then(state => {
      fetch('https://haati.serverguy.cloud/rest/V1/products/' + skuCName, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Caurosel New', data.custom_attributes);
          console.log('Caurosel Image', data.sku);
          console.log('Caurosel options', data.options[0].product_sku);
          global.selectedoptionId = data.options[0].option_id;

          firebaseanalytics.logEvent('Item_Detail', {
            Entry_Point: '',
            Item_Name: data.options[0].product_sku,
            Item_Category: '',
            Item_Cost: '',
            Item_Rating: '',
            'Suggested_Item?': '',
            'Discount%': '',
            'Sale_Item?': '',
            Item_Designer: '',
            Item_ID: '',
          });

          this.setState(
            {
              searchresult: data,
              searchimages: data,
              selectedoptionId: data.options[0].option_id,
            },
            () => {},
          );
        });
    });
  }

  selectedCards() {
    console.log(this.state.selectedTitle);
    if (this.state.selectedTitle == null || this.state.selectedTitle == '') {
      Alert.alert('Please select your cards Type.');
    } else {
      global.selectedoptionValue = this.state.selectedoptionValue;
      this.props.navigation.navigate('FrontPage');
    }
  }

  renderItem({item, index}) {
    return (
      <View style={{flex: 1}}>
        <Text style={{color: 'green'}}>{item.file}</Text>
      </View>
    );
  }

  cardimageRenderItem({item, index}) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          paddingHorizontal: 30,
          paddingTop: 30
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
          }}>
          <Image
            resizeMode={'contain'}
            style={{height: '100%', width: '100%'}}
            source={{
              uri:
                'https://haati.serverguy.cloud/pub/media/catalog/product/cache/2f5495530194a6c2c506712ad644ca4e' +
                item.file,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  handleCardtype() {
    console.log(this.state.selectedTitle);
    if (this.state.selectedTitle == null || this.state.selectedTitle == '') {
      Alert.alert('Please select your cards Type.');
    } else {
      this.handleQuoteid();
    }
  }

  handleQuoteid() {
    NetInfo.fetch().then(state => {
      if (global.token === undefined) {
        this.handleGuestlogin();
      } else {
        fetch('https://haati.serverguy.cloud/rest/V1/carts/mine', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.token,
          },
        })
          .then(response => response.json())
          .then(data => {
            this.handleaddTocart(data);
          });
      }
    });
  }

  // Guest User
  handleGuestlogin() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/integration/admin/token?username=haatiadm&password=DqrCjjMXT6Jku6WUH',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          if (global.guestToken === undefined) {
            global.guestToken = data;
            console.log(global.guestToken);
          }
          this.handleCartToken();
        });
    });
  }

  // Guest User
  handleCartToken() {
    NetInfo.fetch().then(state => {
      fetch('https://haati.serverguy.cloud/rest/V1/guest-carts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + global.guestToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (global.cartToken === undefined) {
            global.cartToken = data;
            console.log(global.cartToken);
          }
          this.handleCartId();
        });
    });
  }

  // Guest User
  handleCartId() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/guest-carts/' + global.cartToken,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.guestToken,
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          global.cartId = data.id;
          console.log(global.cartId);
          this.handleaddTocart(global.cartToken);
        });
    });
  }

  handleaddTocart(qid) {
    console.log(qid);
    console.log(skuCName);
    console.log(this.state.selectedoptionId);
    console.log(this.state.selectedoptionValue);
    console.log(global.token);
    var cartBody = {
      cart_item: {
        quote_id: qid,
        sku: skuCName,
        qty: 1,
        productOption: {
          extensionAttributes: {
            customOptions: [
              {
                optionId: this.state.selectedoptionId,
                optionValue: this.state.selectedoptionValue,
              },
            ],
          },
        },
      },
    };
    NetInfo.fetch().then(state => {
      if (global.token === undefined) {
        this.handleguestAddtocart(cartBody);
      } else {
        this.handleuserAddtocart(cartBody);
      }
    });
  }

  handleguestAddtocart(cartBody) {
    fetch(
      'https://haati.serverguy.cloud/rest/V1/guest-carts/' +
        global.cartId +
        '/items',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + global.guestToken,
        },
        body: JSON.stringify(cartBody),
      },
    )
      .then(response => response.json())
      .then(cartdata => {
        console.log(cartdata);
        if ('message' in cartdata) {
          Alert.alert('Alert', cartdata.message, [
            {
              text: 'OK',
              onPress: () => console.log('Cancelled'), //this.props.navigation.goBack(),
            },
          ]);
        } else {
          Alert.alert('Alert', 'Added to cart.', [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('Cart'), //this.props.navigation.goBack(),
            },
          ]);
        }
      });
  }

  handleuserAddtocart(cartBody) {
    fetch('https://haati.serverguy.cloud/rest/V1/carts/mine/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + global.token,
      },
      body: JSON.stringify(cartBody),
    })
      .then(response => response.json())
      .then(cartdata => {
        console.log(cartdata);
        if ('message' in cartdata) {
          if (
            data.message ==
            "The consumer isn't authorized to access %resources."
          ) {
            this.signOut();
            Alert.alert(
              'Alert',
              'Your session has expired. Please login back to continue.',
              [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.navigate('Account'), //this.props.navigation.goBack(),
                },
              ],
            );
          }
        } else {
          Alert.alert('Alert', 'Added to cart.', [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('Cart'), //this.props.navigation.goBack(),
            },
          ]);
        }
      });
  }

  signOut() {
    let keys = [
      'token',
      'isLoggedin',
      'customer_id_new',
      'default_shipping',
      'customer_email',
      'isLoggedIn',
      'customer_pass',
      'customer_name',
    ];
    AsyncStorage.multiRemove(keys, err => {
      global.token = undefined;
      global.customer_id_new = null;
      global.default_shipping = null;
      global.customer_email = null;
      global.isLoggedIn = false;
      console.log('Local storage user info removed!');
    });
  }

  get pagination() {
    const {searchimages} = this.state;
    return (
      <Pagination
        dotsLength={searchimages.media_gallery_entries.length}
        activeDotIndex={this.state.activeimageSlide}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 5,
          marginHorizontal: wp('0.5%'),
          backgroundColor: 'black',
        }}
        inactiveDotStyle={{
          width: 13,
          height: 13,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderRadius: 100,
          borderColor: 'black',
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.9}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>{global.CategoryName}</Text>
            {/* Birthday */}
          </View>
          <View style={{width: wp('40%')}}>
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
          {this.state.searchimages !== null ? (
            <View style={styles.carouselContainer}>
              <Carousel
                layout={'default'}
                ref={c => {
                  this._carousel = c;
                }}
                data={
                  this.state.searchimages.media_gallery_entries !== null &&
                  this.state.searchimages.media_gallery_entries.length > 0 &&
                  this.state.searchimages.media_gallery_entries
                }
                renderItem={this.cardimageRenderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                inactiveSlideShift={0}
                onSnapToItem={index => this.setState({activeimageSlide: index})}
              />
              {this.pagination}
            </View>
          ) : null}

          <View style={styles.typeContainer}>
            {this.state.searchresult != null ? (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={
                    this.state.searchresult.options.length > 0 &&
                    this.state.searchresult.options[0].values
                  }
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedItem: index,
                          selectedTitle: item.title,
                          selectedoptionValue: item.option_type_id,
                        })
                      }
                      style={styles.typeView}>
                      <View>
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
                      <View>
                        <Text style={styles.typeTitle}>{item.title}</Text>
                      </View>
                      <View>
                        <Text style={styles.typePrice}>INR {item.price}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  onPress={() => {
                    this.selectedCards();
                  }}
                  style={styles.btnContainer}>
                  <Text
                    style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
                    Personalize
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
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
  },
  headerContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
  },
  w30: {
    width: wp('30%'),
  },
  title: {
    width: 100,
    height: 40,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-Regular',
  },
  mainContainer: {
    // backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: wp('100%'),
    height: hp('100%'),
  },
  carouselContainer: {
    width: wp('100%'),
    height: hp('55%'),
    backgroundColor: '#DEEBF6',
    borderTopRightRadius: 44,
  },
  typeContainer: {
    margin: 10,
    width: 'auto',
    height: '100%',
  },
  typeView: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  typeTitle: {
    fontSize: 16,
    fontFamily: 'BalooBhai2-SemiBold',
    textAlign: 'left',
  },
  typePrice: {
    fontSize: 15,
    fontFamily: 'BalooBhai2-Regular',
    marginTop: 2,
    color: '#E280AA',
    textAlign: 'right',
  },
  btnContainer: {
    width: '100%',
    backgroundColor: '#E73A5E',
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default CardSelection;
