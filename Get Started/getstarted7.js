import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  BackHandler,
} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import NetInfo from '@react-native-community/netinfo';
import backgroundImage from '../../assets/hatti.png';
const {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

class HaatiStart7 extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      refundSwitch: true,
      secondswitch: true,
      thirdswitch: true,
      searchresult: [],
      layoutTouch: false,
    }),
      (this.inputRef = React.createRef());
  }

  componentDidMount() {
    console.log(language_name);
    this.Language_change();

    AsyncStorage.getItem('ReminderNotification', (error, result) => {
      console.log('ASdasdsadasd2', result);
      this.setState({
        secondswitch: result === null ? true : JSON.parse(result),
      });
    });
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
      if (state.isConnected) {
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
      } else {
        alert('No internet connection');
      }
    });
  }

  reminder() {
    this.setState({secondswitch: !this.state.secondswitch}, () => {
      console.log('ASdasdsadasd', JSON.stringify(this.state.secondswitch));
      AsyncStorage.setItem(
        'ReminderNotification',
        JSON.stringify(this.state.secondswitch),
      );
    });
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.setState({layoutTouch: !this.state.layoutTouch})}
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('HaatiTabs');
            }}>
            <Text style={{fontSize: 14, fontFamily: 'BalooBhai2-SemiBold'}}>
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.06,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={backgroundImage} style={{width: 100, height: 40}} />
        </View>
        <View
          style={{
            flex: 0.9,
            flexDirection: 'column',
            backgroundColor: '#FDF2F7',
            borderTopRightRadius: 44,
            marginTop: 12,
          }}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              data={this.state.searchresult}
              renderItem={({item}) => (
                <View
                  style={{
                    flex: 0.9,
                    flexDirection: 'column',
                    marginTop: 10,
                  }}>
                  <View style={{flex: 0.05, flexDirection: 'column'}}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: 'BalooBhai2-Regular',
                        marginTop: 10,
                        marginLeft: 30,
                      }}>
                      {item.name5}
                    </Text>

                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: 'BalooBhai2-Regular',
                        marginTop: -15,
                        marginLeft: 30,
                      }}>
                      {item.name5_e_part1}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      marginLeft: 30,
                      fontFamily: 'BalooBhai2-Regular',
                    }}>
                    {item.name6}
                  </Text>
                  <View
                    style={{
                      flex: 0.3,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        height: 180,
                        width: 310,
                        borderColor: '#D47EAC',
                        borderWidth: 1,
                        borderRadius: 25,
                      }}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        {/* 1st  */}
                        <View
                          style={{
                            flex: 0.33,
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#D47EAC',
                          }}>
                          <View
                            style={{
                              flex: 0.55,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'BalooBhai2-Regular',
                              }}>
                              {' '}
                              Offers & New Products
                            </Text>
                            <Text
                              style={{
                                left: -10,
                                fontSize: 12,
                                fontFamily: 'BalooBhai2-Regular',
                              }}>
                              {' '}
                              Never miss a sale
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.15,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          />
                          <View
                            style={{
                              flex: 0.3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <SwitchToggle
                              containerStyle={{
                                width: 45,
                                height: 25,
                                borderRadius: 50,
                                // borderColor: 'black',
                                // borderWidth: 1,
                                padding: 5,
                              }}
                              backgroundColorOn="palegreen"
                              backgroundColorOff="lightgrey"
                              circleStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 26,
                                // borderColor: 'black',
                                // borderWidth: 1,
                              }}
                              switchOn={this.state.refundSwitch}
                              onPress={() =>
                                this.setState({
                                  refundSwitch: !this.state.refundSwitch,
                                })
                              }
                              circleColorOff="#EF80B1"
                              circleColorOn="#EF80B1"
                              duration={250}
                            />
                          </View>
                        </View>
                        {/* 2nd  */}
                        <View
                          style={{
                            flex: 0.33,
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#D47EAC',
                          }}>
                          <View
                            style={{
                              flex: 0.55,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'BalooBhai2-Regular',
                              }}>
                              {' '}
                              Reminder Notifications
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'BalooBhai2-Regular',
                              }}>
                              {' '}
                              Never forget an accaion
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.15,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          />
                          <View
                            style={{
                              flex: 0.3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <SwitchToggle
                              containerStyle={{
                                width: 45,
                                height: 25,
                                borderRadius: 50,
                                // borderColor: 'black',
                                // borderWidth: 1,
                                padding: 5,
                              }}
                              backgroundColorOn="palegreen"
                              backgroundColorOff="lightgrey"
                              circleStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 26,
                                // borderColor: 'black',
                                // borderWidth: 1,
                              }}
                              switchOn={this.state.secondswitch}
                              onPress={() => this.reminder()}
                              circleColorOff="#EF80B1"
                              circleColorOn="#EF80B1"
                              duration={250}
                            />
                          </View>
                        </View>
                        {/* 3rd  */}

                        <View style={{flex: 0.33, flexDirection: 'row'}}>
                          <View
                            style={{
                              flex: 0.55,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                left: -7,
                                fontSize: 14,
                                fontFamily: 'BalooBhai2-Regular',
                              }}>
                              {' '}
                              Helpful Hints & Tips
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'BalooBhai2-Regular',
                              }}>
                              {' '}
                              Discover new features
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.15,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          />
                          <View
                            style={{
                              flex: 0.3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <SwitchToggle
                              containerStyle={{
                                width: 45,
                                height: 25,
                                borderRadius: 50,
                                // borderColor: 'black',
                                // borderWidth: 1,
                                padding: 5,
                              }}
                              backgroundColorOn="palegreen"
                              backgroundColorOff="lightgrey"
                              circleStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 26,
                                // borderColor: 'black',
                                // borderWidth: 1,
                              }}
                              switchOn={this.state.thirdswitch}
                              onPress={() =>
                                this.setState({
                                  thirdswitch: !this.state.thirdswitch,
                                })
                              }
                              circleColorOff="#EF80B1"
                              circleColorOn="#EF80B1"
                              duration={250}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.15,
                      flexDirection: 'column',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                          backgroundColor: 'grey',
                          left: 50,
                        }}
                      />
                      <View
                        style={{
                          height: 17,
                          width: 17,
                          backgroundColor: 'white',
                          borderWidth: 0.2,
                          borderRadius: 17,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('HomeTabs');
                      }}
                      style={{
                        width: this.state.layoutTouch ? 320 : 310,
                        height: this.state.layoutTouch ? 60 : 50,
                        backgroundColor: '#EF80B1',
                        borderRadius: 44,
                        borderWidth: this.state.layoutTouch ? 2 : 0,
                        borderColor: this.state.layoutTouch ? 'red' : null,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          color: this.state.layoutTouch ? 'black' : 'white',
                          fontSize: this.state.layoutTouch ? 20 : 16,
                          fontFamily: 'BalooBhai2-SemiBold',
                        }}>
                        Save Preferences
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default HaatiStart7;
