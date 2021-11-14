import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  StyleSheet
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HaatiText from '../../assets/hatti.png';


class Terms extends Component {
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
              Terms & Conditions
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
                    marginBottom: 20,
                    textAlign: 'center',
                    fontSize: 24,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  TERMS & CONDITIONS
                </Text>
                <Text
                  style={{
                    marginBottom: 20,
                    textAlign: 'center',
                    fontSize: 22,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  THANKS FOR VISITING HAATI. WE WILL DO ALL WE CAN TO ENSURE YOU
                  HAVE AN ENJOYABLE SHOPPING EXPERIENCE, AND THAT YOU ARE
                  COMPLETELY HAPPY WITH YOUR CARDS.
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  These are the terms and conditions (Terms) on which we supply
                  products to you, whether these are goods or digital content
                  available on www.haati.app (Website) or any Haati.app
                  Personalised Greetings PLV (Haati) application that you access
                  (App). These Terms are legally binding. Please read these
                  Terms carefully before you submit your order to us. These
                  Terms tell you who we are, how we will provide products to
                  you, how you and we may change or end the contract, what to do
                  if there is a problem and other important information. If you
                  have any questions or require clarification on these Terms,
                  please contact us by refereeing to the table in clause 1.2.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  If you do not agree to these Terms, you must not order any
                  products from this Website or the App.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  DEFINED WORDS: In these Terms a bold, capitalised word has a
                  particular meaning. These relevant words can be found in
                  brackets after their meaning. Any reference in these Terms and
                  Conditions to “we”, “us”, “our” is a reference to Haati
                  Personalised Greetings PLV. Any reference to “you” or “your”
                  is a reference to any consumer and these references may be
                  used interchangeably.
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
                  1. INFORMATION ABOUT US AND HOW TO CONTACT US
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  1.1 Who we are
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Haati Personalised Greeting PLV is a company registered in
                  India under registration number ######### Our registered
                  office is 806, B2B Centre Coop Premises, Malad (West), Mumbai
                  400064. Our registered TAX number is ########
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  1.2 How to contact us
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You can contact our customer service team (Customer Service
                  Team) in the following ways: Complete the Contact Us webform
                  click{' '}
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Contact');
                    }}>
                    <Text>here</Text>
                  </TouchableOpacity>
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Social Media
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Twitter: @haati_online
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Facebook: @Haaticards
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Email: help@haati.app
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Post
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  806, B2B Centre Coop Premises, Malad (West), Mumbai 400064
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  1.3 How we may contact you
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If we have to contact you, we will do so by telephone or by
                  writing to you at the email address or postal address you have
                  provided to us in your order.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  1.4 Includes emails
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  When we use the words writing or written in these terms, this
                  includes emails.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  1.5 Your status
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You must be at least 18 years old to place an order on our
                  Website or the official Haati phone application (the App).
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
                  2. ORDERING FROM HAATI
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  2.1 How to place an order
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  In order to place an order with us, we require you to create
                  an online account with us (Haati Account). When you create a
                  Haati Account, you will need to supply us with your real name
                  and a valid email address. Please see section 18.1
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You place an order on the Website or App by pressing the
                  Checkout button during the checkout process. By confirming
                  your order, you are agreeing to purchase the product you have
                  selected which shall be subject to these Terms.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  When you confirm your order, we will take payment for your
                  order by means of your nominated payment method.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will then send to you an order confirmation email detailing
                  your order and any other information we must provide to you.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  2.2 How we will accept your order
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Our acceptance of your order will take place when we email you
                  to accept it, at which point a legally binding contract
                  (Contract) will come into existence between you and us.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  2.3 If we cannot accept your order
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  There may be circumstances in which we are unable to accept
                  your order, because of something we discover after we send you
                  an order confirmation email. If this is the case, we will
                  inform you of this via email and will refund you for the
                  product. We may be unable to accept your order because: (a) we
                  have identified an error in the price or description of the
                  product;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) it appears that the order mistakenly duplicates another
                  order;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (c) the use of images for a Personalised Product are
                  corrupted, unsupported technically or inadequately pixelated;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (d) your Personalised Product contravenes, or appears to
                  contravene, our Content Rules (section 3.4);
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (e) there are unexpected limits on our resources which we
                  could not reasonably plan for
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  (f) a credit reference we have obtained for you does not mean
                  our minimum requirements or we cannot obtain authorisation for
                  your payment;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (g) we suspect that the order had been placed fraudulently;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  (h) we are unable to meet a delivery deadline you have
                  specified;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (i) the product is out of stock;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  (j) a promotional offer or discount code has been used outside
                  of a valid promotion period or has expired; or
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  (k) your order otherwise breaches any of the requirements of
                  these Terms.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  2.4 Your order number
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will assign an order number to your order and tell you what
                  it is when we send you an order confirmation email. It will
                  help us if you can tell us the order number whenever you
                  contact us about your order.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  2.5 Ordering multiple products
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  When ordering multiple products as part of the same order, we
                  will inform you, within a reasonable time period, as to
                  whether we will (or can) dispatch on the same day or as part
                  of the same delivery. Please note that we cannot guarantee
                  that multiple products within the same order will be delivered
                  in the same package or at the same time.
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
                  OUR PRODUCTS
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                  }}>
                  The cards sold by us through our Website and the App are
                  manufactured and shipped from a range of different in-house
                  and third-party production facilities based in India.
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  3.1 Products may vary slightly from their pictures
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  The images of the products on our website are for illustrative
                  purposes only. Although we have made every effort to display
                  colours accurately, we cannot guarantee that your device’s
                  display of the colours accurately reflects the colour of the
                  products. Your product may vary slightly from those images.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  3.2 Product packaging may vary
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  The packaging of the product may vary from that shown in the
                  images on our website.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  3.3 Personalised Products
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If the product includes personalised content selected by you,
                  it is a personalised product (Personalised Product). If it is
                  a standard product which does not include any content selected
                  by you, it is a non-personalised product (Non-Personalised
                  Product).
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  It is up to you to ensure the content you have contributed for
                  inclusion in a Personalised Product is correct (for example
                  the content is correctly spelt)
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Please double-check your order on screen and your
                  acknowledgement email carefully to check that all the details
                  are correct.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you are uploading a photo, images must be in JPEG or PNG
                  format. Any other format such as Word documents and PDFs
                  cannot be accepted. For best results, we advise that you make
                  the image dimensions approximately 1,000 pixels for the
                  smallest edge of your photos. We print images at 300 DPI (Dots
                  Per Inch), so if you are scanning the image, we recommend you
                  use this setting. If you try to upload a photo that has a
                  lower resolution or image size, we will accept it however we
                  cannot accept responsibility if your Personalised Product does
                  not meet your expectations.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  By uploading or including any content or material (including
                  but not limited to photographs, graphics, text and other
                  material) (Customer IP) in a Personalised Product, you grant
                  us a non-exclusive, royalty-free, irrevocable licence
                  (including the right to grant sub-licences through multiple
                  tiers) to use, reproduce, adapt, distribute and communicate to
                  the public that content or material solely for the purpose of
                  performing our obligations under these Terms and exercising
                  any rights you may grant to us. Please note that we may modify
                  content or material in order to conform it to Haati or the
                  requirements of the product you have ordered (such as by
                  cropping images).
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  The rights and ownership to the Customer IP will remain yours,
                  or the person who gave you permission to use the Customer IP.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  If you use third party copyright in any Personalised Product,
                  it is your responsibility to ensure that you seek permission
                  from the copyright owner. We will not accept any liability
                  whatsoever if any Customer IP infringes on third party
                  copyright. You will be held responsible for any fees and third
                  party damages we may have to pay to a third party because of
                  such infringement and you will be liable to reimburse these
                  payments to us in full.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  3.4 Content Rules
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  We do not permit Personalised Products to include any content
                  or material which:
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) infringes anyone’s IP (see below the definition in section
                  11). In particular, you must ensure that you either own the IP
                  in the Customer IP that you wish to include in a Personalised
                  Product or that you have permission from the IP owner to
                  include that Customer IP in the Personalised Product;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) contravenes any applicable law (including, without
                  limitation, any criminal law) or regulation;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (c) is false, inaccurate, misleading, offensive, abusive,
                  threatening or defamatory, or that might cause needless
                  annoyance, inconvenience or distress to any person;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (d) misrepresents identify or impersonates any person;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (e) includes personal data about another person, such as their
                  address, phone number, email address, except with the written
                  approval of that person;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (f) is pornographic, obscene, indecent or offensive, has
                  sexual connotations, which promotes discrimination based on
                  race, sex, religion, nationality, disability, sexual
                  orientation or age, or that may incite hatred or violence
                  against any person or group;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (g) may harass, upset, embarrass or alarm any person;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (h) gives the impression that it originates from or has been
                  approved by us, our partners and licensors, whether by
                  reference to our/their name or otherwise;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (i) may violate the integrity and reputation of our name, and
                  the names of our partners and licensors;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (j) advocates, promotes or assists any unlawful act;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (k) includes or makes reference to illegal drugs; or
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (l) makes reference to politicians’ names and /or political
                  statements.
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
                  PRICE AND PAYMENT
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  4.1 Where to find the price for the product
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  The price of the product (which includes GST) will be the
                  price indicated on the order pages when you placed your order.
                  We take all reasonable care to ensure that the price of the
                  product advised to you is correct. However please see section
                  4.5 for what happens if we discover an error in the price of
                  the product you order.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  4.2 Payment
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You can pay for your products using credit card, debit card,
                  CCAvenue, any account credit, or any other payment method
                  which we make available to you at the time of your order.
                  Please note that we do not accept payments via American
                  Express.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Should you require a full GST invoice you can request this via
                  our contact form here. Please allow up to 28 working days for
                  the full GST invoice to be sent.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  4.3 Offers, discounts, vouchers and competitions
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you have been sent a discount code or voucher by us, you
                  must apply it at the checkout to benefit from the discount or
                  price reduction. To see our Terms and Conditions for offers
                  and promotions click https://www.haati.app/offers. To see our
                  Terms and Conditions for vouchers, click
                  https://www.haati.app/vouchers. Please note that promotional
                  offers, discount codes and vouchers can only be applied to our
                  specified products. They cannot be used for discounts on
                  postage or delivery changes unless otherwise specified.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Promotional offers and discount codes must be used within the
                  valid offer time, but we reserve the right to dispatch
                  products outside of this period.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Haati reserves the right to cancel, change or extend offers at
                  any given time, without notice. Promotions cannot be backdated
                  or applied retrospectively to orders already placed.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  There are no cash alternatives for offers or discount codes.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  For further information on Haati Reminders, please see section
                  13.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  4.4 What happens if we got the price wrong?
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  It is always possible that, despite our best efforts, some of
                  the products we sell may be incorrectly priced. We will
                  normally check prices before accepting your order so that,
                  where the product’s correct price at your order sate is less
                  that our stated price at your order date, we will charge the
                  lower amount. If the product’s correct price at your order
                  date is higher than the price stated to you, we will contact
                  you for your instructions before we accept your order.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  4.5 What to do if you think your order confirmation receipt or
                  invoice is wrong?
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you think your order confirmation receipt or invoice is
                  wrong, please contact the Customer Service Team promptly to
                  let us know.
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
                  5. DISPATCH,DELIVERY AND PROVIDING THE PRODUCTS
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.1 General information
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  The dispatch date is the date that we send the item, not the
                  date that it is delivered.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  During the order process, we will generally notify you of the
                  dispatch dates available and the expected timeframe for
                  receiving your order. However, Haati does not guarantee
                  delivery dates or times, unless a Special Delivery is
                  requested (in which case we will guarantee the delivery date
                  and time). We will make you aware of delivery charges (if any)
                  before you place your order.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  For orders that are accepted, unless we inform you otherwise
                  in the order process, we will dispatch the product you have
                  ordered within 5 days of the order.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  It is your responsibility to ensure that the postal
                  information you input for delivery is correct.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.2 Delivery costs
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  The price of most products on our Website and App do not
                  include delivery costs. We will notify you of the delivery
                  cost at the checkout stage before you place your order.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  There may be occasions from time to time (for example, a
                  promotion) where delivery costs are included in the price of
                  our product. On these occasions, this information will be
                  clearly stated on our Website or App.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  We reserve the right to change the delivery costs at any time.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.3 Delivery options
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  For more information on the range of delivery options
                  available, please click here.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.4 Estimated delivery times
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Products are delivered by Parcel Couriers (or another third
                  party carrier from time to time). Estimated delivery times for
                  all India orders are set out here.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If the product is a one-off purchase of digital content, such
                  as an eCard, we will make the digital content available to the
                  recipient either immediately, the same day or at 9am on your
                  selected date of delivery, depending on the option you select.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.5 We are not responsible for delays outside our control
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If our supply of the products is delayed by an event outside
                  our control (such as acts of God, natural disasters, epidemics
                  or pandemics, terrorist attacks, war or threat of war, riots,
                  imposition of sanctions, embargo, or breaking off of
                  diplomatic relations, nuclear, chemical or biological
                  contamination or sonic book, any laws imposing an export or
                  import restriction, quota or prohibition, or failing to grant
                  necessary licence or consent, collapse of buildings, fire,
                  explosion or accident, industrial action, interruption or
                  failure of utility service) then we will contact you as soon
                  as possible to let you know and we will take steps to minimise
                  the effect of the delay. Provided we do this we will not be
                  liable for delays caused by the event. However, if there is a
                  risk of substantial delay you may contact us to cancel your
                  order and receive a refund for any products you have paid for
                  but not received. Your statutory rights as a consumer are not
                  affected.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.6 If the recipient is not at home when the product is
                  delivered
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We operate a “Leave Safe” policy. This means that the carrier
                  will attempt delivery at the recipient’s address first. If
                  there is no response, they will attempt to leave the product
                  with a neighbour or in a nominated safe place. If the carrier
                  cannot delivery the product in any of these ways, and the
                  product cannot be posted through the recipients letterbox, the
                  carrier will leave the recipient instructions informing them
                  how to re-arrange delivery or collect the products from the
                  local depot.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.7 Re-arranging delivery/collection
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If no one is available at the recipient’s address, it will be
                  your responsibility to re-arrange delivery or make
                  arrangements for collection with the carrier. Instructions on
                  how to do so shall be left at the time of attempted delivery.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.8 When you own goods
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You own a product which is goods once we have received payment
                  in full.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.9 What will happen if you do not give required information
                  to us
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We may need certain information from you so that we can supply
                  the products, for example, the delivery address. We will
                  contact you to ask for this information. If you do not give us
                  this information within a reasonable time of us asking for it,
                  or if you give us incomplete or incorrect information, we may
                  either end the contract (and Section 10.2 will apply) or make
                  an additional charge of a reasonable sum to compensate us for
                  any extra work that is required as a result. We will not be
                  responsible for supplying the products late or not supplying
                  any part of them if this is caused by you not giving us the
                  information, we need within a reasonable time of us asking for
                  it.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.10 Reasons we may suspend the supply of products to you
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We may have to suspend the supply of a product to deal with
                  technical problems or make minor technical changes; update the
                  product to reflect changes in relevant laws and regulatory
                  requirements; or make changes to the product as requested by
                  you or notified by us to you.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.11 Your rights if we suspend the supply of products
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will contact you as far in advance as practicably possible
                  to tell you we will be suspending supply of the product. If we
                  have to suspend the product for longer than 48 hours, we may
                  contact you to cancel your order and refund any sums you have
                  paid. You may contact us to end the contract for a product if
                  we suspend it, or tell you we are going to suspend it, in each
                  case for a period of more than 48 hours and we will refund any
                  sums you have paid in advance for the product in respect of
                  the period after you end the contract.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  5.12 Delivery outside India
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  In the event that we accept an order for delivery of a card
                  outside India, the recipient will be responsible for all
                  custom formalities, including completion of customs
                  declarations, payment of import taxes levies, duties and
                  satisfying any other regulatory requirements that may be in
                  force in the relevant country of importation. It is your
                  responsibility to ensure that the recipient consents to this.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Please note that Haati is obliged to follow the laws of the
                  countries in which it operates.
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
                  YOUR RIGHT TO MAKE CHANGES
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  As a courtesy, we may allow you to make changes to your order
                  on your Haati Account. If you cannot make changes on your
                  Haati Account, then you will need to contact our Customer
                  Service Team by Email or Webchat (see section 1.2 contact
                  details). Please have your order number or the email address
                  you registered with us available so we can answer your query
                  as quickly as possible.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  {' '}
                  We will let you know if the change is possible. If it is
                  possible we will let you know about any changes to the price
                  of the product, the timing of supply or anything else which
                  would be necessary as a result of your requested change and
                  ask you to confirm whether you wish to go ahead with the
                  change.
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
                  OUR RIGHT TO MAKE CHANGES
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  7.1 Minor changes
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We may have to make minor changes to a product to reflect
                  changes in relevant laws and regulatory requirements or to
                  implement minor technical adjustments and improvements, for
                  example to address a security threat. Minor changes will not
                  affect your use of the product.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  7.2 Significant changes
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  There may be circumstances where we have to make significant
                  changes to our products. If we do need to make such changes,
                  we will notify you of this. You may then contact us to end the
                  contract before the changes take effect and receive a refund
                  for any products paid for but not received.
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
                  YOUR LEGAL RIGHTS TO END THE CONTRACT
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  8.1 Your rights
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Your rights when you end the contract will depend on what you
                  have brought, whether there is anything wrong with it, how we
                  are performing and when you decide to end the contract,
                  including;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) If what you have bought is faculty or misdescribed you may
                  have a legal right to end the contract (or to get the product
                  repaired or replaced or a service re-performed or to get some
                  or all of your money back), see section 9.1;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) If you want to end the contract because of something we
                  have done or have told you we are going to do, see section
                  8.2;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (c) If you have just changed your mind about the product, see
                  section 8.3. You may be able to get a refund if you are within
                  the cooling-off period, but this may be subject to deductions
                  and you will have to pay the costs of return of any goods;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (d) In all other cases (if we are not at fault and there is no
                  right to change your mind), see section 8.5.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  8.2 Ending the contract because of something we have done or
                  are going to do
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you are ending a contract for a reason set out below, the
                  contract will end immediately, and we will refund you in full
                  for any products which have not been provided. You may also be
                  entitled to compensation. The reasons are:
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) We have told you about an upcoming change to the product
                  or these Terms which you do not agree to (see section 7.2);
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) We have told you about an error in the price or
                  description of the product you have ordered and you do not
                  wish to proceed;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (c) There is a risk that supply of the products may be
                  significantly delayed because of events outside our control;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (d) We have suspended supply of the products for technical
                  reasons, or notify you we are going to suspend them for
                  technical reasons, in each case for a period of more than 48
                  hours; or
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (e) You have a legal right to end the contract because of
                  something we have done wrong.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  8.3 Ending the contract where we are not at fault and there is
                  no right to change your mind
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Even if we are not at fault and you do not have a right to
                  change your mind (see clause 8.1) you can still end the
                  contract before it is completed, but you may have to pay us
                  compensation. A contract for good or digital content is
                  completed when the product is delivered, downloaded or
                  streamed and paid for. If you want to end a contract before it
                  is completed where we are not at fault and you have not
                  changed your mind, just contact us to let us know. Your
                  contract will end immediately and we will refund any sums paid
                  by you for products not provided but we may deduct from that
                  refund reasonable compensation for the net costs we will incur
                  as a result of your ending the contract.
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
                  ENDING YOUR CONTRACT WITH US
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  9.1 Reporting a problem
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you have questions or are unhappy with your order, please
                  contact our Customer Service Team via Webchat or Email (see
                  section 1.2 for contact details). You will need to quote your
                  order number, the email address you have registered and the
                  details of the problem with the order.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We aim to acknowledge any compliant within 14 days and will do
                  our best to resolve in 28 days. We may ask you to take a
                  photograph of the product to help us communicate with our
                  suppliers and to correct any future problems. Should it be
                  necessary, we will then advise you how to return your item.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you receive a product from us in error, you must inform our
                  Customer Service Team immediately. Our Customer Service Team
                  will then provide you with instructions on how to return or
                  securely destroy the product.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  9.2 Your legal obligation to return rejected products
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you wish to exercise your legal rights to reject products
                  you must return them back to us. If you have ordered a gift,
                  please return the product to the return address stated on the
                  package. For more information please contact our Customer
                  Service Team.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  9.3 Procedure for returns and refunds
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will refund you the price you paid for the products
                  including delivery costs, by the method you used for payment
                  within 14 days from the day on which we receive the product
                  back from you or, if earlier, the day on which you provide us
                  with evidence that you have sent the product back to us. In
                  all other cases, your refund will be made within 14 days of
                  your telling us you have changed your mind.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you are eligible for a refund, we will reimburse the price
                  you have paid for the product(s) onto the credit or debit card
                  that you paid with or to your CCAvenue account. Alternatively,
                  we may offer to reprint (if applicable) and resend the item
                  free of charge. Please note it is not our policy to offer both
                  a refund and a resend.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Refunds cannot be given if the fault is a result of your own
                  actions such as product misuse or if personalisation is
                  mis-spelt or if you have uploaded an image of a low resolution
                  or size. Please see section 3.3 on Personalised Products for
                  more information.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  9.4 When we will pay the costs of return
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will pay the costs of return if:
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) The products are faulty or misdescribed;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) If you are ending the contract because we have told you of
                  an upcoming change to the product or these terms, an error in
                  pricing or description, a delay in delivery due to events
                  outside our control or because you have a legal right to do so
                  as a results of something we have done wrong;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (c) If we, or on behalf of our suppliers, have requested a
                  return of the product due to a product recall.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  9.5 Deductions from refunds if you are exercising your right
                  to change your mind
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We may reduce your refund of the price (excluding delivery
                  costs) to reflect any reduction in the value of the goods, if
                  this has been caused by your handling them in a way which
                  would not be permitted in a shop. If we refund you the price
                  paid before we are able to inspect the goods and later
                  discover you have handled them in an unacceptable way, you
                  must pay us an appropriate amount.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  The maximum refund for delivery costs will be the costs of
                  delivery by the least expensive delivery method we offer. For
                  example, if we offer delivery of a product within 3-5 days at
                  one cost but you choose to have the product delivered within
                  24 hours at a higher cost, then we will only refund what you
                  would have paid for the cheaper delivery option.
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
                  OUR RIGHTS TO END THE CONTRACT
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  10.1 We may end the contract if you break it
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We may end the contract for a product at any time by writing
                  to you if;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) you do not, within a reasonable time, allow us to deliver
                  the products to you or the recipient or collect them from
                  us/your local depot.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  10.2 You must compensate us if you break the contract
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If we end the contract in the situations set out in Section
                  10.1 we will refund any money you have paid in advance for
                  products we have not provided, but we may deduct or charge you
                  reasonable compensation for the net costs we will incur as a
                  result of your breaking the contract.
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
                  11 HAATI’S INTELLECTUAL PROPERTY
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  For the purposes of these Terms, the following words will have
                  the meanings as set out below:
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) IP means intellectual property rights of any nature,
                  including (for example) patents, rights to inventions,
                  copyright and related rights, trade marks and service marks,
                  trade names and domain names, rights in get-up, goodwill and
                  the right to sue for passing off or unfair competition, rights
                  in designs, rights in computer software, database rights,
                  rights to preserve the confidentiality of information
                  (including know-how and trade secrets), and any other
                  intellectual property rights, whether registered or
                  unregistered, and including all applications for such rights,
                  and rights to apply for and be granted such rights, and
                  renewals or extensions of such rights, and rights to claim
                  priority from such rights, and all similar or equivalent
                  rights or forms of protection which subsist, or will subsist,
                  now or in the future, in any part of the world.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) Content means all text, software applications, graphics,
                  audio, visual and/or audio-visual material (including but not
                  limited to, music, sound, still visual images, photographs and
                  video), data, database content, page layouts, design and other
                  multi-media content, information and material, including the
                  metadata relating to such content.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Unless otherwise stated, all Content on and IP in relation to
                  our Website and/or App is wholly owned by HAATI or its
                  licensors.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  “HAATI” is our registered trademark, and you agree not to
                  display or use it in any manner without our prior consent.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You may use and access our Website and/or App to the extent
                  and purpose required for ordering any products and/or services
                  made available by HAATI in accordance with these Terms.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  You are not allowed to;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) remove any notices relating to IP contained in any
                  Content, material and/or products taken from our Website, App
                  or otherwise;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) whether for a commercial purpose or otherwise, copy,
                  distribute, show in public and/or create any derivative work
                  from, any material, Content or IP owned by HAATI without the
                  prior express written permission and licensing by us to do so;
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (c) use HAATI, including but not limited to, its Website,
                  Content, IP, products and/or services for any commercial
                  purpose other than in accordance with these Terms; and
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (d) use any robot, spider, scraper or other automated means to
                  access the Website or App for any purpose without our prior
                  express written permission.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Any rights not granted in these Terms are reserved for our own
                  benefit.
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
                  OUR WEBSITE/APP
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will always try to ensure that our Website and App is
                  available 24 hours a day. However, we will not be liable if
                  for any reason the Website or App is unavailable at any time,
                  or for any period.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Please note that we run AB price tests on our Website. This is
                  a randomised process by HAATI servers when a customer visits
                  our Website. This means that if you are randomly selected, you
                  may have a slightly different browsing experience to other
                  users.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Occasionally, we may provide links to other websites or
                  resources for your convenience. We do not endorse the contents
                  of these websites and are not responsible for their
                  availability or service. We will not be liable in any way for
                  any loss or damage which you may suffer by using those
                  websites. If you decide to access linked third-party websites,
                  you do so at your own risk.
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
                  HAATI REMINDERS
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  13.1 How to participate
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You can setup reminders for upcoming events (Reminder) on your
                  HAATI Account during the checkout process and you may benefit
                  from discounts off such cards from time to time (Reminder
                  Voucher).
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  13.2 How it works
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  The reminder must be set at least 9 days before the date of
                  your event (Event Date). Before your Event Date, we will send
                  you a push/email notification to remind you of the Event Date.
                  This push/email notification includes details about the
                  Reminder Voucher offer (where applicable) which is valid for 7
                  days.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Your Reminder Voucher (where applicable) will automatically be
                  generated and applied to your session when you click on the
                  email link or tap on the notification. When you log into your
                  HAATI Account, the Reminder Voucher (where applicable) will be
                  applied to your basket.
                </Text>
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Each Reminder is considered to be marketing activity. By
                  setting up Reminders, you are giving HAATI permission to email
                  or notify you about the Event Date, even if you are opted-out
                  of other marketing activity (for instance, newsletters). To
                  stop getting Reminders, you need to delete the Reminders that
                  you have set up from your HAATI Account.
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
                  14 GIFT CARDS
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Physical gift cards may be purchased at our Website. HAATI
                  acts as an agent for the physical gift cards purchased by you
                  as the gift cards are supplied by external card providers. The
                  relevant card provider’s terms and conditions will apply and
                  be shared with you at the point of purchase.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Gift cards cannot be: (a) used to buy further gift cards
                  reloaded; (b) resold; (c) transferred for value; or (d)
                  redeemed for cash.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Upon activation of a gift card, refunds or credits for the
                  gift card will be the sole responsibility of the relevant card
                  provider only.
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
                  15 CUSTOMER REVIEWS
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  By submitting a review on our Website, App, Trust Pilot or any
                  other third party websites you confirm and agree that you are
                  the sole author of the review, your review is accurate and
                  that you are at least 18 years’ old.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  For any review that you submit, you grant HAATI a perpetual,
                  irrevocable, royalty-free transferable right and licence to
                  use, copy, modify, delete in its entirety adapt, publish,
                  translate and create derivative works from that review in any
                  medium or technology throughout the world.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  You must agree that you will not submit a review that:
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (a) You know to be false, inaccurate or misleading;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (b) Is confidential or personal information of a third party;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (c) Breaches any applicable law, or that advocates, promotes
                  or assists any unlawful act;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (d) Infringes anyone’s intellectual property rights;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (e) Is or can be regarded as offensive, abusive, threatening
                  or defamatory;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (f) Promotes discrimination based on race, sex, religion,
                  nationality, disability, sexual orientation or age, or that
                  may incite hatred or violence against any person or group;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (g) References any other website or service;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (h) Misrepresents identity or impersonates any person;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (i) Pornographic, obscene or indecent;
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (j) May harass, upset, embarrass or alarm any person; or
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  (k) Comments on any other reviewer.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We reserve the right to decline publication of reviews or to
                  remove reviews at our discretion. By submitting you email
                  address in connection with your rating and review, you agree
                  that HAATI may use your email address to contact you about
                  your review. We will not pass your details onto any third
                  parties without your consent. HAATI accepts no liability for
                  your personal information in relation to reviews you leave on
                  third party websites.
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
                  15 CUSTOMER REVIEWS
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We will only use your personal information as set out in our
                  Privacy Policy and Cookie Policy, which are subject to change
                  from time to time:
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Privacy Policy:{' '}
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Policy');
                    }}>
                    <Text style={{marginTop: 5}}>click here</Text>
                  </TouchableOpacity>
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Cookie Policy:{' '}
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Policy');
                    }}>
                    <Text>click here</Text>
                  </TouchableOpacity>
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
                  17 WE ARE RESPONSIBLE FOR LOSS OR DAMAGE SUFFERED BY YOU
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  17.1 We are responsible to you for foreseeable loss and damage
                  caused by us.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If we fail to comply with these Terms, we are responsible for
                  loss or damage you suffer that is a foreseeable result of our
                  breaking this contract or our failing to use reasonable care
                  and skill. Loss or damage is foreseeable if either it is
                  obvious that it will happen or if, at the time the contract
                  was made, both we and you knew it might happen, for example,
                  if you discussed it with us during the sales process.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  17.2 We do not exclude or limit in any way our liability to
                  you where it would be unlawful to do so.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  This includes liability of death or personal injury caused by
                  our negligence or the negligence of our employees, agents or
                  subcontractors; for fraud or fraudulent misrepresentation; for
                  breach of your legal rights in relation to the products; and
                  for faulty product.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  17.3 We are not responsible for damage or loss arising from
                  your actions
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We are not responsible for any damage or loss incurred by you
                  when such loss or damage is caused by negligence, wilful
                  misconduct or concealment of information by you (deliberate or
                  otherwise).
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  17.4 .We are not responsible for losses to your business
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We only supply products for domestic and private use. If you
                  use the products for any commercial, business or re-sale
                  purpose we will have no liability to you for any loss of
                  profit, loss of business, business interruption, or loss of
                  business opportunity.
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
                  18 GENERAL
                </Text>
              </View>
              <View style={{textAlign: 'left', marginBottom: 30}}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.1 Your HAATI Account
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Please note that we do not perform verification checks when
                  you create a HAATI Account, and it is therefore important that
                  you provide your real name and a valid email address when
                  signing up. This is to ensure compliance with these Terms and
                  so that our Customer Service Team can perform identity
                  verification if you ever contact us about your order. A valid
                  email address is also required receive any other
                  communications mentioned in these Terms. We will not be
                  responsible for being unable to verify your identity or not
                  being able to assist with your queries if you have used a fake
                  name or email address.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.2 Suspension
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  If you are found to be in breach of these Terms, we reserve
                  the right to suspend your HAATI Account, you order and all
                  access to HAATI’s Website and App.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  In addition, we are entitled to suspend provision of all or
                  part of our services at any time if we are obliged or advised
                  to comply with an order, instruction or request of any limb or
                  government or any regulator, court or other competent
                  authority.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.3 Change of Terms
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  These Terms may change from time to time and when they do, we
                  will post the new version of the Terms on the Website and App
                  and flag it appropriately.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.4 We may transfer this agreement to someone else
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  We may transfer our rights and obligations under these Terms
                  to another organisation.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.5 You need our consent to transfer your rights to someone
                  else (except that you can always transfer our guarantee)
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  You may only transfer your rights or your obligations under
                  these Terms to another person if we agree to this in writing.
                  However, you may transfer our guarantee to the recipient who
                  has acquired the product or, where the product is services,
                  any item or property in respect of which we have provided the
                  services. We may require the recipient to whom the guarantee
                  is transferred to provide reasonable evidence that they are
                  now the owner of the relevant product.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.6. Nobody else has any rights under this contract (except
                  someone you pass your guarantee on to)
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  This contract is between you and us. No other person shall
                  have any rights to enforce any of it’s Terms, except in
                  respect of the guarantee as explained in clause 18.5.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.7. If a court finds part of this contract illegal, the rest
                  will continue in force
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Each of these paragraphs of these Terms operates separately.
                  If any court or relevant authority decides that any of them
                  are unlawful, the remaining paragraphs will remain in full
                  force and effect.
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  18.8. Even if we delay in enforcing this contract, we can
                  still enforce it later
                </Text>
                <Text
                  style={{
                    marginBottom: 0,
                    fontSize: 18,
                    fontFamily: 'BalooBhai2-Regular',
                    fontWeight: '500',
                    color: '#777777',
                  }}>
                  Just because we do not insist immediately that you do anything
                  you are required to do under these Terms, it does not mean you
                  do not have to do those things and it will not prevent us
                  taking steps against you at a later date.
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
export default Terms;
