import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
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
import Icon from 'react-native-vector-icons/Feather';
import HaatiText from '../../assets/hatti.png';

class Privacy extends Component {
  constructor(props) {
    super(props);
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
              Privacy Policy
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
                    marginBottom: 10,
                    textAlign: 'center',
                    fontSize: 24,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  PRIVACY POLICY
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  INTRODUCTION
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  We are a company registered in India (registration number
                  ########) under the name Haati Personalised Greetings; the
                  address of our registered office is 806, B2B Centre Coop
                  Premises, Malad (West), Mumbai 400064. We are registered as a
                  data controller with the information commisioners office
                  (registration number #####)
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Haati Personalised Greetings is committed to respecting the
                  privacy rights to its Site and App. This privacy notice
                  explains how we collect, store and use personal data about you
                  when you visit the Site or App, buy Products from us or
                  otherwise provide your personal data to us. It provides you
                  with details about the types of personal data that we collect
                  from you, how we use your personal data that we collect from
                  you, how we use your personal data and the rights you have to
                  control our use of your personal data. Words used in this
                  privacy notice have the same meaning as it attributed to them
                  in the Haati Terms of Use.
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  WHAT PERSONAL INFORMATION DO WE COLLECT ABOUT YOU?
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  When you access and move around Haati, register an Account
                  with Haati or purchase a Product from Haati, we may collect
                  some or all of the following personal data about you:
                </Text>
                <View style={{paddingLeft: 20}}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      A username and password;
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Name, date of birth, age and sex
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Billing and delivery addresses, email address and phone
                      numbers
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Payment method (typically credit card or debit card)
                      details;
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Your images and other user content;
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Correspondence with and from Haati
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Your preferences about receiving communications from Haati
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Information about your use of Haati, and your browsing and
                      online purchasing activities; and details we may ask you
                      to submit to verify your identity.
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We may also collect some of this personal data from third
                  parties who have your consent to pas your details to us.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  In order to take advantages of some of our Services, you may
                  need to supply us with the personal data of a third party (for
                  example, their name and address if you wish to send them a
                  Product). We will not use this information for anything other
                  than providing the Services for which the information was
                  supplied.
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  HOW DO WE USE YOUR PERSONAL INFORMATION?
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Your personal data will be collected, processed, stored and
                  used by us, and passed to and processed by our subsidiary
                  and/or affiliated companies and other data processors acting
                  under contract with us.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  If your asked to provide a phone number for a Product you are
                  ordering, note that the phone number will be provided to the
                  deliverer of your order – to assist with the delivery process.
                  We may use automatically collect anonymous information about
                  your use of Haati. For example, we may automatically log which
                  parts of Haati you access, which browser you deploy and the
                  website from which you linked to Haati. You cannot be
                  identified from any of this information. It enables us to
                  compile statistics about the use of Haati, and to help target
                  aspects of Haati and advertising to you more accurately.
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  DISCLOSING YOUR PERSONAL DATA
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  We will not disclose any of your personal data, other than to
                  subsidiary and/or affiliated companies and data processors
                  (including deliverers and payment service providers) under
                  contract with us. To enable us to provide our service, we
                  share data with the following categories of organisations:
                </Text>
                <View style={{paddingLeft: 20}}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Information technology (hardware and software) companies
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Payment processing companies
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Manufacturers, wholesalers and retailers
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Delivery and courier services
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Fraud prevention companies
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Advertising and marketing services companies
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  WE WILL NOT SHARE YOUR DATA WITH ANY OTHER CATEGORIES OF
                  ORGANISATION WITHOUT YOUR PERMISSION UNLESS:
                </Text>
                <View style={{paddingLeft: 20}}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      We are legally entitled to do so (for example, pursuant to
                      a court order or for the purposes of prevention or
                      detection of crime or fraud);
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      We are in negotiations with a third party for the sale or
                      purchase of any of Haati’s business or assets, in which we
                      may disclose your personal data to the prospective seller
                      or buyer of search business or assets;
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      Haati, or substantially all of its assets, is acquired by
                      a third party, in which case personal data held by Haati
                      about its customers will be one of the transferred assets;
                      or
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: '#777777',
                      }}>
                      We wish to enforce or apply our Terms of Use and other
                      agreements to which you are party, or to protect our
                      rights property, safety, customers, or others.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  HOW DO WE USE YOUR PERSONAL INFORMATION?
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Your personal data will be collected, processed, stored and
                  used by us, and passed to and processed by our subsidiary
                  and/or affiliated companies and other data processors acting
                  under contract with us.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  If your asked to provide a phone number for a Product you are
                  ordering, note that the phone number will be provided to the
                  deliverer of your order – to assist with the delivery process.
                  We may use automatically collect anonymous information about
                  your use of Haati. For example, we may automatically log which
                  parts of Haati you access, which browser you deploy and the
                  website from which you linked to Haati. You cannot be
                  identified from any of this information. It enables us to
                  compile statistics about the use of Haati, and to help target
                  aspects of Haati and advertising to you more accurately.
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  MARKETING PREFERENCES
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Under the General Data Protection Regulation 2016/679 (GDPR)
                  you have a number of rights you can exercise over your data.
                  Your rights are:
                </Text>
                <View style={{paddingLeft: 20}}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      The right to receive a copy of your data free of charge
                      (known as Subject Access Request)
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      The right to receive certain data in an electronic format
                      that can be given to another provider (a portability
                      request)
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      The right to have data corrected if it is inaccurate
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      The right to ask us to stop processing or object to
                      processing under certain circumstances
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      The right to ask us to erase data in certain circumstances
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      The right to withdraw consent at any time when that is the
                      legal basis of our processing
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  To discuss any of these rights, please contact Customer
                  Services.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Haati has designated a Data Protection Officer who can be
                  contacted by email or by post at our registered office.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Additionally, you have the right to lodge a complaint with the
                  Data Protection regulator. In our case, this is the
                  Information Commisioner’s Office in the UK. Details of how to
                  contact them can be found at ICO.org.uk
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  LINKS TO THIRD PARTY SITES
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Our Site may, from time to time, contain links to the websites
                  of third parties. If you follow a link to any of these
                  websites, please note that these websites have their own
                  privacy policies and that we do not accept any responsibility
                  or liability for those websites or their policies.
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  SECURITY
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We employ significant technical and organisational measures to
                  guard against unauthorised or unlawful processing of personal
                  data and against accidental loss or destruction of, or damage
                  to, you personal data. We believe the measures implemented by
                  our site reduce the likelihood of security problems to a level
                  appropriate to the type of data involved.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We have security measures in place to protect our database of
                  Users and access to this database is restricted internally.
                  However, there are things we can all do to help stay safe and
                  secure online:
                </Text>
                <View style={{paddingLeft: 20}}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      Ensure no-one else uses Haati through your Account;
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      Log off or exit from your Haati Account when not using it;
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      Keep your password or other access information secret;
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      Use different passwords for different services you use
                      online
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" color="#DF6589FF" size={15} />
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 18,
                        fontFamily: 'BalooBhai2-Regular',
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      Ensure you’re using the most up-to-date versions of your
                      software.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 20,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#EF80B1',
                  }}>
                  DECEPTIVE EMAILS
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will never ask you to confirm the details of your Account
                  or Payment Method by email or mobile communication. If you
                  receive such contact, please do not respond to it.
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
                  UPDATES TO THIS NOTICE
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  This privacy notice was last updated on January 2021 Please
                  check back regularly to keep informed of changes to this
                  Notice.
                </Text>
              </View>
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
export default Privacy;
