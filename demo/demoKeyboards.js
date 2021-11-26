import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Image,
  FlatList,
} from 'react-native';
import {KeyboardRegistry} from 'react-native-keyboard-input';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import right from '../../assets/right1.png';
import center from '../../assets/centre.png';
import left from '../../assets/left1.png';

class KeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
    getAlert: PropTypes.func,
  };

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: 'purple'},
        ]}>
        <Text style={{color: 'white'}}>HELOOOO!!!</Text>
        <Text style={{color: 'white'}}>{this.props.title}</Text>
        <TouchableOpacity
          testID={'click-me'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}>
          <Text>Click Me!</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

class Layout extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectLayouts: [],
      layoutSelected: 1,
    };
  }

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  componentDidMount() {
    parseInt(this.props.activeSlideIndex) == 1
      ? this.InnerLeftLayouts()
      : this.InnerRightLayouts();
    // this.props.func.getAlert('Hello');
    console.log(this.props);
  }

  InnerLeftLayouts() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/product/pdp/innerleft/post?sku=' +
          global.skuCName,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          console.log(JsonResponse);
          var LayoutsResponse = JSON.parse(JsonResponse);
          console.log('layoutssss', LayoutsResponse[4].sample_item);
          this.setState({
            selectLayouts: LayoutsResponse,
          });
        });
    });
  }

  InnerRightLayouts() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/product/pdp/innerright/post?sku=' +
          global.skuCName,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          console.log(JsonResponse);
          var LayoutsResponse = JSON.parse(JsonResponse);
          console.log('layoutssss', LayoutsResponse[4].sample_item);
          this.setState({
            selectLayouts: LayoutsResponse,
          });
        });
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: '#F5FCFF'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          {this.state.selectLayouts.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      layoutSelected: index,
                    },
                    () => {
                      this.props.func.layoutDesign(index);
                    },
                  );
                }}
                style={{
                  width: wp('25%'),
                  height: hp('10%'),
                  borderRadius: 8,
                  backgroundColor: '#FFFFFF',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderColor:
                    index === this.state.layoutSelected ? '#E280AA' : '#FDF2F7',
                  borderWidth: index === this.state.layoutSelected ? 2 : 0,
                }}>
                <Image
                  resizeMode={'stretch'}
                  source={{uri: item.image}}
                  style={{width: '46%', height: '74%', marginTop: 10}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

class Inspiration extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      languageArr: [],
      selectlanguage: [],
      languageSelected: 'English',
    };
  }

  componentDidMount() {
    this.inspirationMethod();
  }

  inspirationMethod() {
    console.log('Ins');
    NetInfo.fetch().then(state => {
      fetch('https://haati.serverguy.cloud/rest/V1/all/languages/post?id=1', {
        method: 'POST',
      })
        .then(response => response.json())
        .then(JsonResponse => {
          console.log(JsonResponse);
          var LanguageResponse = JSON.parse(JsonResponse);
          console.log('languaaaaaaaaaa', LanguageResponse);
          this.languageServices('English');
          this.setState({
            languageArr: LanguageResponse,
          });
        });
    });
  }

  languageServices(language) {
    console.log(language);
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/languages/post?id=' + language,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          console.log(JsonResponse);
          var LanguageSelect = JSON.parse(JsonResponse);
          console.log('Select', LanguageSelect);
          this.setState({
            selectlanguage: LanguageSelect,
            languageSelected: language,
          });
        });
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: '#F5FCFF'},
        ]}>
        <View style={{width: '100%', flexDirection: 'column'}}>
          {this.state.languageArr !== null ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.languageArr}
              style={{width: '100%'}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => this.languageServices(item.language)}
                  style={{
                    width: 'auto',
                    paddingVertical: 8,
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#F1F2F2',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:
                      item.language === this.state.languageSelected
                        ? '#E280AA'
                        : '#FDF2F7',
                    borderWidth:
                      item.language === this.state.languageSelected ? 2 : 0,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    {item.language}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : null}
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 60,
          }}>
          <FlatList
            // horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.selectlanguage}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.func.languageMessages(
                    item.message,
                    this.state.languageSelected,
                  )
                }
                style={{
                  width: '100%',
                  backgroundColor: '#F1F2F2',
                  paddingHorizontal: 10,
                  marginBottom: 15,
                }}>
                <Text style={{textAlign: 'center', paddingHorizontal: 10}}>
                  {item.message}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

class Font extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontSelected: null,
    };
  }

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  render() {
    const fontArr = [
      {label: 'OldStandardTT-Regular', value: 'Old Standard TT'},
      {label: 'Playball-Regular', value: 'Playball'},
      {label: 'Courier_New', value: 'Courier New'},
      {label: 'impact', value: 'Impact'},
      {label: 'comici', value: 'Comic Sans MS'},
      {label: 'trebuc', value: 'Trebuchet MS'},
      {label: 'CopyofMistral2', value: 'Mistral'},
      {label: 'Corbel Bold', value: 'Corbel Bold'},
      {label: 'Arial', value: 'Arial'},
    ];
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: '#F5FCFF'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
          }}>
          {fontArr.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  width: '30%',
                }}
                onPress={() =>
                  this.setState({fontSelected: index}, () => {
                    this.props.func.fontWebText(item.value);
                  })
                }>
                <View
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    borderColor:
                      this.state.fontSelected === index ? '#E280AA' : '#000000',
                    borderWidth: this.state.fontSelected === index ? 2 : 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: item.label,
                      textAlign: 'center',
                      color:
                        this.state.fontSelected === index
                          ? '#E280AA'
                          : '#000000',
                    }}>
                    ABC
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

class Size extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      sizeSelected: 20,
    };
  }

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  render() {
    const sizeArr = [
      {label: '12', value: 12},
      {label: '14', value: 14},
      {label: '18', value: 18},
      {label: '20', value: 20},
      {label: '25', value: 25},
      {label: '30', value: 30},
      {label: '35', value: 35},
      {label: '40', value: 40},
      {label: '45', value: 45},
      {label: '50', value: 50},
      {label: '55', value: 55},
      {label: '60', value: 60},
    ];
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: '#F5FCFF'},
        ]}>
        <FlatList
          numColumns={4}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={sizeArr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                this.setState({sizeSelected: item.value}, () => {
                  this.props.func.fontSizeText(item.value);
                })
              }
              style={{
                paddingHorizontal: 20,
                width: '25%',
              }}>
              <Text
                style={{
                  fontSize: 32,
                  fontFamily: 'baloobhai2-bold',
                  textAlign: 'center',
                  color:
                    this.state.sizeSelected == item.value ? 'red' : 'black',
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

class Color extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      viewBGColor: '#fff',
      colorsArr: [],
      positionID: null,
    };
  }

  componentDidMount() {
    this.fontColorsMethod();
  }

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  fontColorsMethod() {
    console.log('Colors',parseInt(this.props.activeSlideIndex)-1);
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/product/pdp/colors/post?colors='+(parseInt(this.props.activeSlideIndex)-1),
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          console.log(JsonResponse);
          var ColorsResponse = JSON.parse(JsonResponse);
          console.log('languaaaaaaaaaa', ColorsResponse);
          this.setState({
            colorsArr: ColorsResponse,
          });
        });
    });
  }

  colorCodeSelection = item => {
    this.setState(
      {
        viewBGColor: `#${item.color_code}`,
        positionID: item.position,
      },
      () => {
        this.props.func.colorWebText(`#${item.color_code}`);
      },
    );
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: '#F5FCFF'},
        ]}>
        <FlatList
          numColumns={5}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={this.state.colorsArr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => this.colorCodeSelection(item)}
              style={{
                height: wp('13.5%'),
                width: wp('13.5%'),
                borderRadius: 100,
                margin: 8,
                padding: wp('1%'),
                borderWidth: this.state.positionID === item.position ? 3 : null,
                borderColor:
                  this.state.positionID === item.position ? 'red' : 'black',
              }}>
              <View
                style={{
                  height: wp('10%'),
                  width: wp('10%'),
                  borderRadius: 100,
                  backgroundColor: `#${item.color_code}`,
                  elevation: 5,
                }}></View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

class TextStyle extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      alignSelected: null,
      pressed: true,
    };
  }

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  changealign = type => {
    if (!this.state.pressed) {
      this.setState({pressed: true, textAlign: type}, () => {
        this.props.func.alignWebText(type);
      });
    } else {
      this.setState({pressed: false, textAlign: type}, () => {
        this.props.func.alignWebText(type);
      });
    }
  };

  render() {
    const styleArr = [
      {label: 'Left', value: 'left'},
      {label: 'Center', value: 'center'},
      {label: 'Right', value: 'right'},
      {label: 'Vertical Left', value: 'v-left'},
      {label: 'Vertical Center', value: 'v-center'},
      {label: 'Vertical Right', value: 'v-right'},
    ];
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: '#F5FCFF'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          {styleArr.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  width: '26%',
                }}
                onPress={() =>
                  this.setState({alignSelected: item.value}, () => {
                    this.changealign(item.value);
                  })
                }>
                <View
                  style={{
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    marginBottom:
                      index == 0 || index == 1 || index == 2 ? 20 : 0,
                    borderRadius: 10,
                    borderColor:
                      this.state.alignSelected === item.value
                        ? '#E280AA'
                        : '#000000',
                    borderWidth:
                      this.state.alignSelected === item.value ? 2 : 1,
                  }}>
                  <Image
                    source={
                      item.value == 'left'
                        ? left
                        : item.value == 'right'
                        ? right
                        : center
                    }
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}></Image>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

class AnotherKeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.toggleExpandedKeyboard('AnotherKeyboardView');
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.keyboardContainer,
          {backgroundColor: 'orange'},
        ]}>
        <Text>*** ANOTHER ONE ***</Text>
        <Text>{this.props.title}</Text>
        <TouchableOpacity
          testID={'toggle-fs'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}>
          <Text>Toggle Full-Screen!</Text>
        </TouchableOpacity>
        <Text>*** ANOTHER ONE ***</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardContainer: {
    // flex: 1,
    flexGrow: 1,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

KeyboardRegistry.registerKeyboard('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerKeyboard('Layout', () => Layout);
KeyboardRegistry.registerKeyboard('Inspiration', () => Inspiration);
KeyboardRegistry.registerKeyboard('Font', () => Font);
KeyboardRegistry.registerKeyboard('Size', () => Size);
KeyboardRegistry.registerKeyboard('Color', () => Color);
KeyboardRegistry.registerKeyboard('TextStyle', () => TextStyle);
KeyboardRegistry.registerKeyboard(
  'AnotherKeyboardView',
  () => AnotherKeyboardView,
);
