import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Fontisto';
import FIcon from 'react-native-vector-icons/Feather';
import HaatiText from '../../assets/hatti.png';

class Faqs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      activeItemId: 0,
      activeItemId2: 0,
      activeItemId3: 0,
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
              FAQs
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
            width: (width / 100) * 100, //height: "auto"
            height: (height / 100) * 86,
          }}>
          <View style={{margin: 20, padding: 20}}>
            <View style={{marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    marginBottom: 30,
                    textAlign: 'center',
                    fontSize: 24,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  Frequently Asked Questions
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 20,
                }}
                onPress={() => {
                  this.setState({
                    activeItemId: this.state.activeItemId == 0 ? 1 : 0,
                  });
                }}>
                <View
                  style={{
                    backgroundColor: '#EF80B1',
                    marginRight: 10,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: '16%',
                  }}>
                  <Text
                    style={{
                      fontSize: 26,
                      fontFamily: 'BalooBhai2-Regular',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      // marginTop: 5
                    }}>
                    Q
                  </Text>
                </View>
                <View style={{width: '74%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BalooBhai2-Regular',
                      fontWeight: '500',
                      color: '#EF80B1',
                    }}>
                    When will I receive my refund?
                  </Text>
                </View>
                <View
                  style={{width: '10%'}}
                  onPress={() => {
                    this.setState({
                      activeItemId: this.state.activeItemId == 0 ? 1 : 0,
                    });
                  }}>
                  <FIcon
                    name={
                      this.state.activeItemId == 0
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    // name='chevron-down'
                    type="font-awesome"
                    color="#DF6589FF"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              {this.state.activeItemId == 1 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#2d2d2d',
                      marginRight: 10,
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 10,
                      paddingRight: 10,
                      width: '16%',
                    }}>
                    <Text
                      style={{
                        fontSize: 26,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '600',
                        color: '#EF80B1',
                        textAlign: 'center',
                      }}>
                      A
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#777777',
                      fontWeight: '600',
                      width: '84%',
                    }}>
                    Once processed by an agent, our payment provider submits
                    refunds to your bank immediately. Depending on the bank's
                    processing time, it can take anywhere from 5-10 business
                    days to show up on your bank account. If you have not
                    received your refund within this time frame, please contact
                    us.
                  </Text>
                </View>
              ) : null}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 20,
                }}
                onPress={() => {
                  this.setState({
                    activeItemId2: this.state.activeItemId2 == 0 ? 1 : 0,
                  });
                }}>
                <View
                  style={{
                    backgroundColor: '#EF80B1',
                    marginRight: 10,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: '16%',
                  }}>
                  <Text
                    style={{
                      fontSize: 26,
                      fontFamily: 'BalooBhai2-Regular',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      // marginTop: 5
                    }}>
                    Q
                  </Text>
                </View>
                <View style={{width: '74%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BalooBhai2-Regular',
                      fontWeight: '500',
                      color: '#EF80B1',
                    }}>
                    Do you have content restrictions?
                  </Text>
                </View>
                <View
                  style={{width: '10%'}}
                  onPress={() => {
                    this.setState({
                      activeItemId: this.state.activeItemId == 0 ? 1 : 0,
                    });
                  }}>
                  <FIcon
                    name={
                      this.state.activeItemId2 == 0
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    // name='chevron-down'
                    type="font-awesome"
                    color="#DF6589FF"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              {this.state.activeItemId2 == 1 ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2d2d2d',
                        marginRight: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '16%',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: 'BalooBhai2-Regular',
                          fontWeight: '600',
                          color: '#EF80B1',
                          textAlign: 'center',
                        }}>
                        A
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#777777',
                        fontWeight: '600',
                        width: '84%',
                      }}>
                      As indicated in our Terms & Conditions, 3.4 Content Rules
                      - We do not permit personalised products to include any
                      content or material which:
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Infringes anyone's copyright: in particular, you must
                      ensure that you either own the copyright in an image or
                      any other content that you wish to include in a
                      personalised product or that you are fully licensed by the
                      copyright owner to include that image or other content in
                      the personalised product.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Infringes any other rights, such as a trade mark, of any
                      person or entity or a duty owed to any person or entity,
                      such as a duty of confidentiality.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Contravenes any applicable law (including, without
                      limitation, any criminal law) or regulation.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Is false, inaccurate, misleading, offensive, abusive,
                      threatening or defamatory, or that might cause needless
                      annoyance, inconvenience or distress to any person.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Misrepresents identity or impersonates any person.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Includes any material containing personally identifying
                      information about another person, such as their address,
                      phone number, or email address, except with the written
                      approval of that person.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Contains material which is pornographic, obscene, indecent
                      or offensive, which promotes discrimination based on race,
                      sex, religion, nationality, disability, sexual orientation
                      or age, or that may incite hatred or violence against any
                      person or group.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      May harass, upset, embarrass or alarm any person.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Gives the impression that it emanates from or has been
                      approved by us.
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{width: '16%'}}>
                      <Icon name="check-circle" color="#DF6589FF" />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                        width: '84%',
                      }}>
                      Advocates, promotes or assists any unlawful act.
                    </Text>
                  </View>
                </View>
              ) : null}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 20,
                }}
                onPress={() => {
                  this.setState({
                    activeItemId3: this.state.activeItemId3 == 0 ? 1 : 0,
                  });
                }}>
                <View
                  style={{
                    backgroundColor: '#EF80B1',
                    marginRight: 10,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: '16%',
                  }}>
                  <Text
                    style={{
                      fontSize: 26,
                      fontFamily: 'BalooBhai2-Regular',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      // marginTop: 5
                    }}>
                    Q
                  </Text>
                </View>
                <View style={{width: '74%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BalooBhai2-Regular',
                      fontWeight: '500',
                      color: '#EF80B1',
                    }}>
                    Complete Savings Programme (WebLoyalty)
                  </Text>
                </View>
                <View
                  style={{width: '10%'}}
                  onPress={() => {
                    this.setState({
                      activeItemId: this.state.activeItemId == 0 ? 1 : 0,
                    });
                  }}>
                  <FIcon
                    name={
                      this.state.activeItemId3 == 0
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    // name='chevron-down'
                    type="font-awesome"
                    color="#DF6589FF"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              {this.state.activeItemId3 == 1 ? (
                <View>
                  <Text
                    style={{
                      marginBottom: 10,
                      textAlign: 'center',
                      fontSize: 24,
                      fontFamily: 'BalooBhai2-Regular',
                      fontWeight: '500',
                    }}>
                    WHAT IS COMPLETE SAVINGS?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2d2d2d',
                        marginRight: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '16%',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: 'BalooBhai2-Regular',
                          fontWeight: '600',
                          color: '#EF80B1',
                          textAlign: 'center',
                        }}>
                        A
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#777777',
                        fontWeight: '600',
                        width: '84%',
                      }}>
                      Complete Savings is an online membership programme ideal
                      for people who shop online. As a member of Complete
                      Savings you can access many cashback opportunities and
                      discounts from retailers and service providers.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2d2d2d',
                        marginRight: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '16%',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: 'BalooBhai2-Regular',
                          fontWeight: '600',
                          color: '#EF80B1',
                          textAlign: 'center',
                        }}>
                        A
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#777777',
                        fontWeight: '600',
                        width: '84%',
                      }}>
                      You may have been given the opportunity to join the
                      Complete Savings programme after completing an online
                      order at Moonpig.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2d2d2d',
                        marginRight: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '16%',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: 'BalooBhai2-Regular',
                          fontWeight: '600',
                          color: '#EF80B1',
                          textAlign: 'center',
                        }}>
                        A
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#777777',
                        fontWeight: '600',
                        width: '84%',
                      }}>
                      Complete Savings members are able to claim an initial
                      welcome reward and monthly cashback bonuses. Members can
                      also claim 10% cashback at over 1000 online stores, and
                      earn up to 20% discount on gift cards.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2d2d2d',
                        marginRight: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '16%',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: 'BalooBhai2-Regular',
                          fontWeight: '600',
                          color: '#EF80B1',
                          textAlign: 'center',
                        }}>
                        A
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#777777',
                        fontWeight: '600',
                        width: '84%',
                      }}>
                      The first 30 days of Complete Savings membership are free
                      of charge; this is so that users can trial the programme.
                      After this free trial there is a monthly membership fee.
                      Users of the programme can terminate their membership at
                      any time.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2d2d2d',
                        marginRight: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '16%',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: 'BalooBhai2-Regular',
                          fontWeight: '600',
                          color: '#EF80B1',
                          textAlign: 'center',
                        }}>
                        A
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#777777',
                        fontWeight: '600',
                        width: '84%',
                      }}>
                      It’s easy to contact Complete Savings if you have any
                      questions regarding your membership Call 0800 389 6960
                      (freephone from UK landlines), Mon to Fri 8am-8pm and Sat
                      9am-4pm or email customerservice@completesavings.co.uk .
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2d2d2d',
                        marginRight: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '16%',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: 'BalooBhai2-Regular',
                          fontWeight: '600',
                          color: '#EF80B1',
                          textAlign: 'center',
                        }}>
                        A
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#777777',
                        fontWeight: '600',
                        width: '84%',
                      }}>
                      You can also find more information at
                      www.completesavings.co.uk or you can complete this online
                      contact form.
                    </Text>
                  </View>
                </View>
              ) : null}
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
export default Faqs;
