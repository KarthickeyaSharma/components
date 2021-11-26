import React, {Component} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HaatiText from '../../assets/hatti.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {height, width} = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CheckPreviewModal from '../Modals/CheckPreviewModal';

class BackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backImageResult: null,
      imageurl: null,
      showPreview: false,
    };
  }

  componentDidMount() {
    this.BackCoverMethod();
    // console.log(global.pdc_layout_ids);
    console.log(JSON.stringify(global.pdc_response), 'resp');
  }

  addToCart = () => {
    var frontId = pdc_layout_ids[0];
    global.frontId = frontId;
    var leftId = pdc_layout_ids[1];
    var rightId = pdc_layout_ids[2];
    console.log(leftId);
    console.log(global.product_id, 'helloooo');
    AsyncStorage.getItem('pdc_designs').then(designs => {
      var d = designs ? JSON.parse(designs) : [];
      d = d.filter(e => global.skuCName.includes(e.skuCName));
      // console.log(d[0].frontPage[0].pdc_json,"pdcs");
      // console.log(global.pdc_response[frontId].json,"pdcs2");
      console.log(JSON.parse(d[0].frontPage[0].pdc_json), 'pdcs3');

      // Setting JSON file
      global.pdc_response[frontId].json = JSON.parse(
        d[0].frontPage[0].pdc_json,
      );

      // Converting cropzoomimage to image
      var objs = global.pdc_response[frontId].json['objects'];
      console.log(objs, 'bobjs');
      for (var pid in objs) {
        console.log(objs[pid]['type'], 'pids');
        if (objs[pid]['type'] == 'cropzoomimage') {
          objs[pid]['type'] = 'image';
        }
      }
      console.log(objs, 'aobjs');
      console.log('pdcObjs', global.pdc_response[frontId].json);

      // if category is invitation then don't do any operation on left and right page
      if (CategoryName == 'Invitations') {
      } else {
        var jsonPages = JSON.stringify(d[0]);
        jsonPages = JSON.parse(jsonPages);

        // Checking if leftPage is customized or not
        if ('leftPage' in jsonPages) {
          // checking if response got from backend contains leftPage or not
          // If contains then overwrite else create leftpage node
          if (global.pdc_response[leftId].json == undefined) {
            global.pdc_response[leftId]['json'] = JSON.parse(
              d[0].leftPage[0].pdc_json,
            );
          } else {
            global.pdc_response[leftId].json = JSON.parse(
              d[0].leftPage[0].pdc_json,
            );
          }
          // Converting cropzoomimage to image in Left Page
          var objs = global.pdc_response[leftId].json['objects'];
          console.log(objs, 'bobjs');
          for (var pid in objs) {
            console.log(objs[pid]['type'], 'pids');
            if (objs[pid]['type'] == 'cropzoomimage') {
              objs[pid]['type'] = 'image';
            }
          }
          console.log(objs, 'aobjs');
          console.log('pdcObjs', global.pdc_response[leftId].json);
        }

        // Checking if rightPage is customized or not
        if ('rightPage' in jsonPages) {
          // checking if response got from backend contains rightPage or not
          // If contains then overwrite else create rightPage node
          if (global.pdc_response[rightId].json == undefined) {
            global.pdc_response[rightId]['json'] = JSON.parse(
              d[0].rightPage[0].pdc_json,
            );
          } else {
            global.pdc_response[rightId].json = JSON.parse(
              d[0].rightPage[0].pdc_json,
            );
          }
          // Converting cropzoomimage to image in Right Page
          var objs = global.pdc_response[rightId].json['objects'];
          console.log(objs, 'bobjs');
          for (var pid in objs) {
            console.log(objs[pid]['type'], 'pids');
            if (objs[pid]['type'] == 'cropzoomimage') {
              objs[pid]['type'] = 'image';
            }
          }
          console.log(objs, 'aobjs');
          console.log('pdcObjs', global.pdc_response[rightId].json);
        }
      }

      // Setting SVG file
      global.pdc_response[frontId].sideSvg = JSON.parse(
        d[0].frontPage[1].pdc_svg,
      );
      // if category is invitation then don't do any operation on left and right page
      if (CategoryName == 'Invitations') {
      } else {
        var svgPages = JSON.stringify(d[0]);
        svgPages = JSON.parse(svgPages);

        // Checking if leftPage is customized or not
        if ('leftPage' in jsonPages) {
          // checking if response got from backend contains leftPage or not
          // If contains then overwrite else create leftpage node
          if (global.pdc_response[leftId].sideSvg == undefined) {
            global.pdc_response[leftId]['sideSvg'] = JSON.parse(
              d[0].leftPage[1].pdc_svg,
            );
          } else {
            global.pdc_response[leftId].sideSvg = JSON.parse(
              d[0].leftPage[1].pdc_svg,
            );
          }
        }

        // Checking if rightPage is customized or not
        if ('rightPage' in svgPages) {
          // checking if response got from backend contains rightPage or not
          // If contains then overwrite else create rightPage node
          if (global.pdc_response[rightId].sideSvg == undefined) {
            global.pdc_response[rightId]['sideSvg'] = JSON.parse(
              d[0].rightPage[1].pdc_svg,
            );
          } else {
            global.pdc_response[rightId].sideSvg = JSON.parse(
              d[0].rightPage[1].pdc_svg,
            );
          }
        }
      }

      // Console OUTPUT
      console.log(JSON.stringify(global.pdc_response), 'pdcs4_repsonse');
      // JSON.stringify(pdc_response[frontId].json) = d[0].frontPage[0].pdc_json
      // console.log(JSON.stringify(pdc_response[frontId].json),"checkpdcs");
      // AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
      this.handleQuoteid();
    });
  };

  BackCoverMethod() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/product/pdp/back/post?sku=' +
          global.skuCName,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          console.log(JsonResponse);
          var BackCoverResponse = JSON.parse(JsonResponse);
          console.log('languaaaaaaaaaa', BackCoverResponse);
          console.log(
            BackCoverResponse[0].overlay + BackCoverResponse[0].filename,
          );
          this.setState({
            backImageResult: BackCoverResponse,
            imageurl:
              BackCoverResponse[0].overlay + BackCoverResponse[0].filename,
          });
        });
    });
  }

  handleQuoteid() {
    NetInfo.fetch().then(state => {
      // https://haati.serverguy.cloud/rest/V1/carts/mine
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
            console.log(data, 'quoteId');
            if (typeof data === 'object') {
              if ('message' in data) {
                if (
                  data.message ==
                  "The consumer isn't authorized to access %resources."
                ) {
                  Alert.alert(
                    'Alert',
                    'Your session has expired. Please login back to continue.',
                    [
                      {
                        text: 'OK',
                        onPress: () => this.signOut(), //this.props.navigation.goBack(),
                      },
                    ],
                  );
                }
              } else {
                this.handleaddTocart(data);
              }
            } else {
              this.handleaddTocart(data);
            }
          });
      }
    });
  }

  // Guest User
  handleGuestlogin() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/integration/admin/token?username=haatiadmWebApi&password=DqrCjjMXT6Jku6WUHOpTzLgee',
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
          console.log(data, 'guestToken');
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
          console.log(data, 'cartToken');
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
    // https://haati.serverguy.cloud/rest/V1/guest-carts/<Cart
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
          console.log(data, 'cartId');
          global.cartId = data.id;
          console.log(global.cartId);
          this.handleaddTocart(global.cartToken);
        });
    });
  }

  handleaddTocart(qid) {
    console.log(qid);
    console.log(skuCName);
    console.log(global.selectedoptionId);
    console.log(global.selectedoptionValue);
    console.log(global.token);
    NetInfo.fetch().then(state => {
      // https://haati.serverguy.cloud/rest/V1/carts/mine
      if (global.token === undefined) {
        let cartBody = {
          cartItem: {
            quote_id: qid,
            sku: skuCName,
            qty: 1,
            productOption: {
              extensionAttributes: {
                customOptions: [
                  {
                    optionId: global.selectedoptionId,
                    optionValue: global.selectedoptionValue,
                  },
                ],
              },
            },
          },
        };
        this.handleguestAddtocart(cartBody);
      } else {
        let cartBody = {
          cart_item: {
            quote_id: qid,
            sku: skuCName,
            qty: 1,
            productOption: {
              extensionAttributes: {
                customOptions: [
                  {
                    optionId: global.selectedoptionId,
                    optionValue: global.selectedoptionValue,
                  },
                ],
              },
            },
          },
        };
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
          this.handleCustomisedCard('', cartdata.item_id);
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
        console.log(cartdata, 'CartData');
        if ('message' in cartdata) {
          if (
            cartdata.message ==
            "The consumer isn't authorized to access %resources."
          ) {
            Alert.alert(
              'Alert',
              'Your session has expired. Please login back to continue.',
              [
                {
                  text: 'OK',
                  onPress: () => this.signOut(), //this.props.navigation.goBack(),
                },
              ],
            );
          }
        } else {
          this.handleCustomisedCard(global.customer_id_new, cartdata.item_id);
        }
      });
  }

  handleCustomisedCard(customer_id, item_id) {
    console.log(JSON.stringify(global.pdc_response), 'pdc_responsessss');
    var cardBody = new FormData();
    cardBody.append('id', global.frontId);
    cardBody.append('customer_id', customer_id);
    cardBody.append('pdc_response', JSON.stringify(global.pdc_response));
    cardBody.append('item_id', item_id);
    cardBody.append('product_id', global.product_id);
    cardBody.append('option_id', global.selectedoptionId);
    cardBody.append('option_val', global.selectedoptionValue);
    // https://haati.app/demo1/rest/V1/get/pdc/design/post?customer_id=19&pdc_response=testing-purpose
    fetch('https://haati.serverguy.cloud/rest/V1/get/pdc/design/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data',
      },
      body: cardBody,
    })
      .then(response => response.json())
      .then(cartdata => {
        console.log(cartdata, 'cartdatasas');
        if (typeof cartdata === 'object') {
          if ('message' in cartdata) {
            Alert.alert('Alert', cartdata.message, [
              {
                text: 'OK',
                onPress: () => console.log('Cancelled'), //this.props.navigation.goBack(),
              },
            ]);
          } else {
            Alert.alert(
              'Alert',
              'Successfullly Added Card Customization to Cart.',
              [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.navigate('Cart'), //this.props.navigation.goBack(),
                },
              ],
            );
          }
        } else {
          Alert.alert(
            'Alert',
            'Successfullly Added Card Customization to Cart.',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Cart'), //this.props.navigation.goBack(),
              },
            ],
          );
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
      this.props.navigation.navigate('AddAccount');
    });
  }

  showMsg = msg => {
    Alert.alert('Alert', msg, [
      {
        text: 'Ok',
        onPress: () => {
          console.log('Ok');
        },
      },
    ]);
  };

  checkPreview = () => {
    global.isPreview
      ? this.props.navigation.navigate('CardPreview', {
          cheight: global.gcanvas_height,
          cwidth: global.gcanvas_width,
          skuCName: global.skuCName,
        })
      : this.setState({showPreview: true});
  };

  closePreviewModal() {
    this.setState({
      showPreview: false,
    });
  }

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
          visibility={this.state.showPreview}
          closePreviewModal={this.closePreviewModal}
        />

        {/* backgroundcolor */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}
          contentContainerStyle={styles.innerContainer}>
          <View style={styles.customizeContainer}>
            <View style={styles.backContainer}>
              <View style={styles.imgContainer}>
                <Image
                  resizeMode={'stretch'}
                  source={{uri: this.state.imageurl}}
                  style={{flex: 1}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
                ? alert('Work is still in progress')
                : this.setState({showPreview: true});
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
    width: '100%',
    height: 'auto',
    flex: 1,
    marginVertical: hp('2%'),
    padding: 30,
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
  backContainer: {
    // height: hp('55%'),
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '4%',
  },
  imgContainer: {
    width: wp('80%'),
    // height: '100%',
    borderColor: 'black',
    borderWidth: 1.5,
    // flexDirection: 'column',
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
export default BackPage;
