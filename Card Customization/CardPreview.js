import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
const {height, width} = Dimensions.get('window');
// import RNMinimizeApp from 'react-native-minimize';
import NetInfo from '@react-native-community/netinfo';

import HaatiText from '../../assets/hatti.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import bookw from '../../assets/Frame1.png';
import openbook from '../../assets/openbook.png';
import back from '../../assets/book1.png';
import InsideDark from '../../assets/Inside_L_Frame.png';
import closebook from '../../assets/Back_Frame.png';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCustomizationItem} from '../Realm DB/realm';

class CardPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      svgData: [], //JSON.stringify(test2)
      online_pdc: [],
      local_pdc: [],
      canvas_width: 1080,
      canvas_height: 1536,
    };
  }

  componentDidMount() {
    const canvas_height = this.props.route.params.cheight;
    const canvas_width = this.props.route.params.cwidth;
    this.setState({canvas_height, canvas_width});
    // globalskuCName
    console.log('Front Page :::: Preview ', skuCName);
    console.log('Token ::::: ', global.token);
    this.setsvgData('frontPage', skuCName);
  }

  setsvgData = (type, skuCName) => {
    if (getCustomizationItem(skuCName).isEmpty()) {
      this.showMsg('No Preview Available.');
    } else {
      const skuData = getCustomizationItem(skuCName)[0];
      if (type === 'frontPage') {
        console.log(JSON.parse(JSON.parse(skuData.frontPage)[1].pdc_svg));
        this.setState({
          local_pdc: JSON.parse(JSON.parse(skuData.frontPage)[1].pdc_svg),
          svgData: JSON.parse(JSON.parse(skuData.frontPage)[1].pdc_svg),
          type: type,
        });
      } else if (type === 'leftPage') {
        this.setState({
          local_pdc: JSON.parse(JSON.parse(skuData.leftPage)[1].pdc_svg),
          svgData: JSON.parse(JSON.parse(skuData.leftPage)[1].pdc_svg),
          type: type,
        });
      } else if (type === 'rightPage') {
        this.setState({
          local_pdc: JSON.parse(JSON.parse(skuData.rightPage)[1].pdc_svg),
          svgData: JSON.parse(JSON.parse(skuData.rightPage)[1].pdc_svg),
          type: type,
        });
      } else if (type === 'backPage') {
        this.setState({
          local_pdc: JSON.parse(JSON.parse(skuData.frontPage)[1].pdc_svg),
          svgData: JSON.parse(JSON.parse(skuData.frontPage)[1].pdc_svg),
          type: type,
        });
      } else {
        Alert.alert('Alert', 'No Preview Available for selected page.');
      }
    }
  };

  showMsg = msg => {
    Alert.alert('Alert', msg, [
      {
        text: 'Ok',
        onPress: this.props.navigation.navigate('FrontPage'),
      },
    ]);
  };

  ComponentWillMount() {
    // RNMinimizeApp.minimizeApp();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"> */}
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: wp('40%')}}>
            <Image source={HaatiText} style={styles.title}></Image>
          </View>
          <View style={styles.w30}>
            <Text style={{color: 'transparent'}}>Preview</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <View>
            <Text style={styles.mainText}>Card Preview</Text>
          </View>

          <View style={styles.textContainer}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setsvgData('frontPage', skuCName);
                }}>
                <Image
                  source={this.state.type == 'frontPage' ? bookw : back}
                  resizeMode={'stretch'}
                  style={styles.imgShow}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: hp('2.1%'),
                  fontFamily:
                    this.state.type == 'frontPage'
                      ? 'baloobhai2-bold'
                      : 'BalooBhai2-Regular',
                }}>
                Front
              </Text>
            </View>

            {CategoryName == 'Invitations' ? null : (
              <>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setsvgData('leftPage', skuCName);
                    }}>
                    <Image
                      source={
                        this.state.type == 'leftPage' ? InsideDark : openbook
                      }
                      resizeMode={'stretch'}
                      style={{width: wp('15%'), height: hp('5.5%')}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: hp('2.1%'),
                      fontFamily:
                        this.state.type == 'leftPage'
                          ? 'baloobhai2-bold'
                          : 'BalooBhai2-Regular',
                      textAlign: 'center',
                    }}>
                    Left
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setsvgData('rightPage', skuCName);
                    }}>
                    <Image
                      source={
                        this.state.type == 'rightPage' ? InsideDark : openbook
                      }
                      resizeMode={'stretch'}
                      style={{width: wp('15%'), height: hp('5.5%')}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: hp('2.1%'),
                      fontFamily:
                        this.state.type == 'rightPage'
                          ? 'baloobhai2-bold'
                          : 'BalooBhai2-Regular',
                      textAlign: 'center',
                    }}>
                    Right
                  </Text>
                </View>
              </>
            )}
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setsvgData('backPage', skuCName);
                }}>
                <Image
                  source={this.state.type == 'backPage' ? closebook : back}
                  resizeMode={'stretch'}
                  style={styles.imgShow}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: hp('2.1%'),
                  fontFamily:
                    this.state.type == 'backPage'
                      ? 'baloobhai2-bold'
                      : 'BalooBhai2-Regular',
                }}>
                Back
              </Text>
            </View>
          </View>
          {/* 1stbox */}
          <View style={styles.customizeContainer}>
            {
              this.state.type == 'backPage' ? (
                <Image
                  resizeMode={'stretch'}
                  source={{
                    uri: 'https://haati.serverguy.cloud/pub/media/pdp/images/file1620487378.png',
                  }}
                  style={{flex: 1}}
                />
              ) : // {
              this.state.svgData !== null ? (
                <WebView
                  onLoadStart={() => {
                    console.log('Start');
                  }}
                  onLoadEnd={() => console.log('end')}
                  userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
                  startInLoadingState={true}
                  source={{
                    html: `<!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta charset="utf-8">
                                            <title>SVG</title>
                                            <style type="text/css">
                                                    svg {
                                                        width: 100%;
                                                        height: 100%;
                                                    }
                                                </style>
                                        </head>
                                        <body>
                                            ${this.state.svgData}
                                        </body>
                                        </html>`,
                  }}
                  ref={webview => {
                    this.myWebview = webview;
                  }}
                  renderLoading={() => {
                    return (
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          position: 'absolute',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <ActivityIndicator size={hp('6%')} color={'red'} />
                      </View>
                    );
                  }}
                  originWhitelist={['*']}
                  allowsInlineMediaPlayback
                  javaScriptEnabled
                  // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                  scalesPageToFit={true}
                  allowInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                  startInLoadingState
                  onNavigationStateChange={val => {
                    console.log(val);
                  }}
                  javaScriptEnabledAndroid
                  geolocationEnabled={true}
                  useWebkit
                  onMessage={this.onMessage}
                />
              ) : null
              // }
            }
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
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
  backText: {
    fontSize: hp('2.4%'),
    fontFamily: 'baloobhai2-bold',
  },
  title: {
    width: 100,
    height: 40,
  },
  mainContainer: {
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    width: '100%', //(width / 100) * 100,
    height: '100%', //hp('100%'), //height / 100 * 100
    padding: 20,
  },
  mainText: {
    fontSize: hp('3.1%'),
    fontFamily: 'BalooBhai2-SemiBold',
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
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
    width: '100%',
    height: hp('55%'),
    marginTop: hp('2%'),
    paddingRight: 30,
    paddingLeft: 30,
  },
});
export default CardPreview;
