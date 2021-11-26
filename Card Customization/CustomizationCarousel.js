import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
  BackHandler,
  ScrollView,
  ToastAndroid,
  Keyboard,
} from 'react-native';
const {height, width} = Dimensions.get('window');
// import RNMinimizeApp from 'react-native-minimize';

import HaatiText from '../../assets/hatti.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Carousel, {Pagination} from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckPreviewModal from '../Modals/CheckPreviewModal';
import Front from './Front';
import Left from './Left';
import Right from './Right';
import Back from './Back';
import KeyboardInput from '../demo/demoScreen';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]).then(result => {
      console.log(result);
      if (
        'granted' === result['android.permission.CAMERA'] &&
        'granted' === result['android.permission.READ_EXTERNAL_STORAGE']
      ) {
        global.isPermission = true;
      } else {
        console.log('Camera permission denied');
        // Alert.alert('Please enable camera permission in device settings.');
      }
    });
  } catch (err) {
    console.warn(err);
  }
};

class CustomizationCarousel extends Component {
  constructor(props) {
    super(props);
    global.pdc_data = '';
    global.pdc_actual_data = [];
    global.isPreview = true;
    global.pdc_response = null;
    global.pdc_layout_ids = null;
    global.gcanvas_height = 1536;
    global.gcanvas_width = 1080;
    this.backChild = React.createRef();
    this.leftChild = React.createRef();
    this.rightChild = React.createRef();
    this.state = {
      show1: false,
      sliders: [
        <Front loadingContainer={styles.loadingContainer} />,
        <Left keyboardHandler={this.keyboardHandler} ref={this.leftChild} />,
        <Right keyboardHandler={this.keyboardHandler} ref={this.rightChild} />,
        <Back ref={this.backChild} />,
      ],
      activeSlide: 0,
      showKeyboard: false,
      keyboardState: false,
    };
    this.closePreviewModal = this.closePreviewModal.bind(this);
  }

  componentDidMount() {
    requestCameraPermission();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this._keyboadDidshowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   () => {
    //     this.setState({
    //       showKeyboard: true,
    //     });
    //   },
    // );
    // this._keyboadDidhideListener = Keyboard.addListener(
    //   'keyboardDidHide',
    //   () => {
    //     this.setState({
    //       showKeyboard: false,
    //     });
    //   },
    // );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // this._keyboadDidshowListener.remove();
    // this._keyboadDidhideListener.remove();
  }

  keyboardHandler = boolVal => {
    this.setState({
      showKeyboard: boolVal,
    });
  };

  handleBackButton = () => {
    // this.sendMessageToWebFront();
    ToastAndroid.show('Progress Saved Successfully.', ToastAndroid.SHORT);
    this.props.navigation.goBack();
    return true;
  };

  keyboardState = keyState => {
    this.setState({keyboardState: keyState});
    console.log(keyState, 'jjdjfhfhf');
  };

  checkPreview = () => {
    global.isPreview
      ? this.props.navigation.navigate('CardPreview', {
          cheight: global.gcanvas_height,
          cwidth: global.gcanvas_width,
          skuCName: global.skuCName,
        })
      : this.setState({show1: true});
  };

  closePreviewModal() {
    this.setState({
      show1: false,
    });
  }

  cardimageRenderItem({item, index}) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          // backgroundColor: 'black',
          // height: hp('100%'),
          // width: wp('100%'),
          elevation: 5,
          paddingRight: 30,
          paddingLeft: 30,
        }}>
        {item}
      </TouchableOpacity>
    );
  }

  get pagination() {
    const {sliders} = this.state;
    return (
      <Pagination
        dotsLength={sliders.length}
        activeDotIndex={this.state.activeSlide}
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

  changePage = () => {
    const {activeSlide} = this.state;
    if (activeSlide < 3) {
      this.setState({
        activeSlide: activeSlide + 1,
      });
      this._carousel.snapToItem(activeSlide + 1);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => this.checkPreview()}>
              <Text style={[styles.backText, {color: '#E280AA'}]}>Preview</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Check Preview Modal */}
        <CheckPreviewModal
          visibility={this.state.show1}
          closePreviewModal={this.closePreviewModal}
        />
        {/* backgroundcolor */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}
          contentContainerStyle={styles.innerContainer}>
          <View style={styles.customizeContainer}>
            <Carousel
              layout={'default'}
              ref={c => {
                this._carousel = c;
              }}
              data={
                this.state.sliders !== null &&
                this.state.sliders.length > 0 &&
                this.state.sliders
              }
              renderItem={this.cardimageRenderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={SLIDER_WIDTH}
              inactiveSlideShift={0}
              containerCustomStyle={{flex: 1}}
              slideStyle={{flex: 1}}
              onSnapToItem={index => this.setState({activeSlide: index})}
            />
          </View>
        </ScrollView>
        {(this.state.activeSlide == 1 || this.state.activeSlide == 2) &&
        (this.state.showKeyboard || this.state.keyboardState) ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <KeyboardInput
              FuncInstance={
                this.state.activeSlide == 1
                  ? this.leftChild.current
                  : this.state.activeSlide == 2
                  ? this.rightChild.current
                  : null
              }
              activeIndex={this.state.activeSlide}
              keyboardState={this.keyboardState}
            />
          </View>
        ) : this.state.activeSlide == 3 ? (
          <View
            style={{
              height: hp('10%'),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                global.isPreview
                  ? this.backChild.current.getAlert()
                  : this.setState({show1: true});
              }}
              style={styles.addBtn}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'BalooBhai2-SemiBold',
                }}>
                Add To Basket
              </Text>
            </TouchableOpacity>
          </View>
        ) : this.state.showKeyboard ? null : (
          <View
            style={{
              height: hp('10%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '25%'}}></View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              {this.pagination}
            </View>
            <View style={{width: '25%'}}>
              <TouchableOpacity onPress={() => this.changePage()}>
                <Text style={[styles.backText, {color: '#E280AA'}]}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  backText: {
    fontSize: hp('2.4%'),
    fontFamily: 'baloobhai2-bold',
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
    height: hp('100%'), //height / 100 * 100
    // padding: 20,
    // justifyContent: 'center'
  },
  mainText: {
    fontSize: hp('3.1%'),
    fontFamily: 'BalooBhai2-SemiBold',
    textAlign: 'center',
  },
  innerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgShow: {
    width: wp('7%'),
    height: hp('5.5%'),
  },
  imgText: {
    fontSize: hp('2.1%'),
    fontFamily: 'baloobhai2-bold',
  },
  customizeContainer: {
    // width: '100%',
    // height: hp('65%'),
    flex: 1,
    marginVertical: hp('10%'),
    // paddingRight: 30,
    // paddingLeft: 30,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingRight: 30,
    paddingLeft: 30,
    // paddingLeft: 10,
    // marginBottom: 20,
  },
  saveText: {
    fontSize: 25,
    fontFamily: 'baloobhai2-bold',
    color: '#407BFF',
  },
  addBtn: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E73A5E',
    borderRadius: 50,
  },
});
export default CustomizationCarousel;
