import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  Modal,
  PermissionsAndroid,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  ScrollView,
  ToastAndroid,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
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

import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = {
  title: 'Pick an Image',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
};

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

class FrontPage extends Component {
  constructor(props) {
    super(props);
    global.pdc_data = '';
    global.pdc_actual_data = [];
    global.isPreview = false;
    global.pdc_response = null;
    global.pdc_layout_ids = null;
    this.state = {
      visible: false,
      selectedColor: '#F44336',
      selectlanguage: '',
      reason: '',
      status: '',
      avatarSource: null,
      refreshing: false,
      show: false,
      show1: false,
      searchresult: [],
      selectImageFront: [],
      selectedJson: [],
      frontArray: null,
      jsonData: [], //JSON.stringify(test2)
      online_pdc: [],
      local_pdc: [],
      canvas_width: 1080,
      canvas_height: 1536,
    };
  }

  componentDidMount() {
    console.log('Front Page :::: ', skuCName);
    this.frontPageSku();
    console.log('Token ::::: ', global.token);
    requestCameraPermission();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.sendMessageToWebFront();
    this.props.navigation.goBack();
    return true;
  };

  onMessage = data => {
    var mData = JSON.parse(data.nativeEvent.data);
    var jsonfile = mData.jsonfile;
    var svgfile = mData.svgfile;
    console.log(mData, 'onMessage');
    if (typeof mData === 'object') {
      if ('preview' in mData) {
        this.savePreview(mData.preview);
        global.isPreview = mData.preview;
      } else {
        const pdc_data = {
          skuCName: skuCName,
          frontPage: [{pdc_json: jsonfile}, {pdc_svg: svgfile}],
        };
        global.pdc_data = pdc_data;
        global.pdc_actual_data = [{pdc_json: jsonfile}, {pdc_svg: svgfile}];
        this.savePDCs();
      }
    }
  };

  checkPreview = () => {
    global.isPreview
      ? this.props.navigation.navigate('CardPreview', {
          cheight: this.state.canvas_height,
          cwidth: this.state.canvas_width,
          skuCName: global.skuCName,
        })
      : this.setState({show1: true});
  };

  sendMessageToWebFront = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#canvas2json").click();
                })();
            `);
  };

  savePDCs() {
    AsyncStorage.getItem('pdc_designs').then(designs => {
      const d = designs ? JSON.parse(designs) : [];
      const index = d.findIndex(x => x.skuCName === skuCName);
      if (parseInt(index) == -1) {
        console.log(-1);
        d.push(pdc_data);
      } else {
        console.log(index);
        d[index]['frontPage'] = pdc_actual_data;
      }
      console.log(d, 'pdc_data');
      AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
      // CategoryName == 'Invitations'
      //   ? this.props.navigation.navigate('BackPage')
      //   : this.props.navigation.navigate('LeftPage');
    });
    ToastAndroid.show('Progress Saved Successfully.', ToastAndroid.SHORT);
  }

  savePreview(boolValue) {
    AsyncStorage.getItem('pdc_designs').then(designs => {
      const d = designs ? JSON.parse(designs) : [];
      const index = d.findIndex(x => x.skuCName === skuCName);
      const preview_data = {
        skuCName: skuCName,
        preview: boolValue,
      };
      if (parseInt(index) == -1) {
        d.push(preview_data);
      } else {
        console.log(index);
        d[index]['preview'] = boolValue;
      }
      AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
    });
  }

  frontPageSku() {
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/product/pdp/front/post?sku=' +
          skuCName,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          JsonResponse = JSON.parse(JsonResponse);
          console.log('Pageeeeeeeeeeeeeeeee', JsonResponse);
          global.FrontJsonPage = JsonResponse[0].pdp_design;
          global.json_id_front = JsonResponse[0].json_id_front;
          global.product_id = JsonResponse[0].product_id;
          console.log(global.FrontJsonPage);
          console.log(global.json_id_front);
          this.FrontImage();
          this.setState({
            searchresult: JsonResponse,
            isLoading: false,
          });
        });
    });
  }

  loginCheck() {
    if (global.token === undefined) {
      Alert.alert('Alert', 'Please Login Before Select Card', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.navigation.navigate('Account')},
      ]);
    } else {
      this.props.navigation.navigate('LeftPage');
    }
  }

  FrontImage() {
    fetch(global.FrontJsonPage, {method: 'GET'})
      .then(response => response.json())
      .then(JsonResponse => {
        var resultdataNew = [];

        Object.entries(JsonResponse).map(postData => {
          resultdataNew.push(postData[1]);
        });

        this.setState({frontArray: resultdataNew}, () => {});
        var dataIds = [];
        for (var key in JSON.stringify(JsonResponse)) {
          if (JsonResponse.hasOwnProperty(key)) {
            console.log('dataIds', key);
            dataIds.push(key);
          }
        }
        console.log(dataIds[1]);
        global.pdc_response = JsonResponse;
        global.pdc_layout_ids = dataIds;
        console.log(
          'jsondatakjkfjfkgjk',
          JSON.stringify(JsonResponse[global.json_id_front].json),
        );
        AsyncStorage.getItem('pdc_designs', (err, result) => {
          const index =
            result == null
              ? -1
              : JSON.parse(result).findIndex(x => x.skuCName === skuCName);
          // console.log(JSON.parse(result)[index].frontPage[0].pdc_json,"pdc_datas");
          if (parseInt(index) == -1) {
            this.setjsonData('online');
          } else {
            if ('frontPage' in JSON.parse(result)[index]) {
              this.setState({
                show: true,
                local_pdc: JSON.parse(result)[index].frontPage[0].pdc_json,
              });
              global.isPreview =
                JSON.parse(result)[index].preview == undefined
                  ? false
                  : JSON.parse(result)[index].preview;
            } else {
              this.setjsonData('online');
            }
            console.log('leftPage' in JSON.parse(result)[index]);
          }
        });
        global.gcanvas_width = JsonResponse[global.json_id_front].canvaswidth;
        global.gcanvas_height = JsonResponse[global.json_id_front].canvasheight;
        this.setState({
          selectImageFront: JsonResponse,
          selectedJson: JsonResponse[global.json_id_front].json,
          isLoading: false,
          canvas_width: JsonResponse[global.json_id_front].canvaswidth,
          canvas_height: JsonResponse[global.json_id_front].canvasheight,
        });
      });
    // }))
  }

  setjsonData(type) {
    if (type == 'online') {
      AsyncStorage.getItem('pdc_designs').then(designs => {
        var d = designs ? JSON.parse(designs) : [];
        d = d.filter(e => !skuCName.includes(e.skuCName));
        AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
      });
    } else {
      // global.isResumed = true;
    }
    
      
      this.setState({
       jsonData: JSON.stringify(
         type == 'online' ? this.state.selectedJson : this.state.local_pdc,
       ),
        show: false,
     });
    }

  ComponentWillMount() {
    // RNMinimizeApp.minimizeApp();
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

        <Modal transparent={true} visible={this.state.show}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: wp('80%'),
                height: hp('19%'),
                borderRadius: 20,
                borderColor: '#D47EAC',
                borderWidth: 0.5,
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flex: 0.7,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderBottomWidth: 0.5,
                  alignItems: 'center',
                  borderBottomColor: '#D47EAC',
                }}>
                <Text style={{fontSize: 16, fontFamily: 'baloobhai2-bold'}}>
                  Pick up where you left off?
                </Text>
                <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                  we've saved our progress so you
                </Text>
                <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                  can resume or start again
                </Text>
              </View>
              <View style={{flex: 0.3, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setjsonData('online');
                  }}
                  style={{
                    flex: 0.5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 0.5,
                    borderRightColor: '#D47EAC',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'baloobhai2-bold',
                      color: '#EF80B1',
                    }}>
                    Start Again
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setjsonData('local');
                  }}
                  style={{
                    flex: 0.5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'baloobhai2-bold',
                      color: '#407BFF',
                    }}>
                    Resume
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent={true} visible={this.state.show1}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: wp('80%'),
                height: hp('19%'),
                borderRadius: 20,
                borderColor: '#D47EAC',
                borderWidth: 0.5,
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flex: 0.7,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderBottomWidth: 0.5,
                  alignItems: 'center',
                  borderBottomColor: '#D47EAC',
                }}>
                <Text style={{fontSize: 16, fontFamily: 'baloobhai2-bold'}}>
                  Uh-Oh
                </Text>
                <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                  Not all the pictures on this card
                </Text>
                <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                  have been customised
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({show1: false});
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BalooBhai2-Regular',
                      color: '#407BFF',
                    }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* backgroundcolor */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <View>
            <Text style={styles.mainText}>Front Cover</Text>
          </View>

          <View style={styles.textContainer}>
            <View>
              <TouchableOpacity>
                <Image
                  source={bookw}
                  resizeMode={'stretch'}
                  style={styles.imgShow}
                />
              </TouchableOpacity>
              <Text style={styles.imgText}>Front</Text>
            </View>

            {CategoryName == 'Invitations' ? null : (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('LeftPage');
                  }}>
                  <Image
                    source={openbook}
                    resizeMode={'stretch'}
                    style={{width: wp('15%'), height: hp('5.5%')}}
                  />
                </TouchableOpacity>
                <Text style={[styles.imgText, {textAlign: 'center'}]}>
                  Inside
                </Text>
              </View>
            )}
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('BackPage');
                }}>
                <Image
                  source={back}
                  resizeMode={'stretch'}
                  style={styles.imgShow}
                />
              </TouchableOpacity>
              <Text style={styles.imgText}>Back</Text>
            </View>
          </View>
          {/* 1stbox */}
          <View style={styles.customizeContainer}>
            {this.state.selectedJson !== null ? (
              <WebView
                onLoadStart={() => {
                  console.log('Start');
                }}
                onLoadEnd={() => console.log('end')}
                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
                startInLoadingState={true}
                source={{
                  html: `<html>
                                            <head>
                                                <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.22/fabric.min.js"></script> 
                                                <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
                                                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                                            </head>
                                            <style>
                                                #canvas2json, #addtocart, #myTextArea, #span {
                                                    display: none;
                                                }
                                                .preloader {
                                                  position: fixed;
                                                  top: 0;
                                                  left: 0;
                                                  width: 100%;
                                                  height: 100%;
                                                  background-color: rgba(255,255,255,0.8);
                                                }
                                            </style>
                                            <body>
                                                
                                                <div class="fabric-canvas-wrapper">
                                                <canvas id='c' width=2160 height=3120></canvas>
                                                </div>
                                                <button id='addtocart'>addtocart</button>
                                                <button id='canvas2json'>2JSON</button>
                                                <textarea id='myTextArea' onfocus="this.select();" onmouseup="return false;"></textarea>
                                                <input type="file" accept="image/*" capture id="span">
                                                <div class="preloader js-preloader flex-center" style="display:none;">
                                                  <img src="https://haati.serverguy.cloud/pub/media/theme_options/default/preloader1.gif">
                                                </div>
                                        
                                                <script>
                                        
                                                    function openGallery() {
                                                        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                                            navigator.mediaDevices.getUserMedia({ video: true });
                                                        }
                                                        $("#span").click();
                                                    }
                                        
                                                    $(function() {
                                                        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                                            navigator.mediaDevices.getUserMedia({ video: true });
                                                        }
                                        
                                                        var canvas = new fabric.Canvas('c', {
                                                            subTargetCheck: true,
                                                            allowTouchScrolling: true,
                                                        });
                                                            
                                                        $("#loadJson2Canvas").click(function() {
                                                            canvas.loadFromJSON(
                                                                $("#myTextArea").val(),
                                                                canvas.renderAll.bind(canvas)
                                                            );
                                                        });
                                        
                                                        $("#canvas2json").click(function() {
                                                            var json = canvas.toJSON();
                                                            var svg = canvas.toSVG();
                                                            var datas = { "jsonfile": JSON.stringify(json), "svgfile": JSON.stringify(svg) };
                                                            window.ReactNativeWebView.postMessage(JSON.stringify(datas));
                                                        });
                                        
                                                            var data = JSON.stringify(${this.state.jsonData}); 
                                                            canvas.loadFromJSON(
                                                            JSON.parse(data),
                                                            canvas.renderAll.bind(canvas));
                                                              
                                                            var originalRenderadmin = fabric.Image.prototype._render;
                                                            fabric.Image.prototype._render = function(ctx) {
                                                            originalRenderadmin.call(this,ctx);
                                                                if(this.name!=undefined) {
                                                                 if(this.src!=undefined) {
                                                                    this.opacity=0.3;
                                                                  }
                                                                }
                                                            }
                                                            var originalRender = fabric.IText.prototype._render;
                                                            fabric.IText.prototype._render = function(ctx) {
                                                              originalRender.call(this, ctx);        
                                                              var w = this.width*this.scaleX,
                                                                h = this.height*this.scaleY,
                                                                x = -this.width*this.scaleX / 2,
                                                                y = -this.height*this.scaleY / 2;
                                                              ctx.beginPath();
                                                              ctx.setLineDash([2, 3]);
                                                              ctx.scale(1 / this.scaleX, 1 / this.scaleY);
                                                              ctx.moveTo(x, y);
                                                              ctx.lineTo(x + w, y);
                                                              ctx.lineTo(x + w, y + h);
                                                              ctx.lineTo(x, y + h);
                                                              ctx.lineTo(x, y);
                                                              ctx.closePath();
                                                              var stroke = ctx.strokeStyle;
                                                              ctx.strokeStyle = "#EF80B1";
                                                              ctx.lineWidth = 2;
                                                              ctx.stroke();
                                                              ctx.strokeStyle = stroke;
                                                              
                                                            ctx.fillStyle = '#EF80B1';
                                                            ctx.font = '10px';
                                                            ctx.strokeUniform = true;

                                                            ctx.fillRect(x, y-20, 20, 20);
                                                            ctx.lineWidth = 1;
                                                            ctx.fillStyle = '#000000';
                                                            ctx.font = '20px Bentham';
                                                            ctx.textAlign="center";
                                                            ctx.fillText("T",x+10,y-3);

                                                            }
                                                            canvas.renderAll();


                                                        const outerCanvasContainer = $('.fabric-canvas-wrapper')[0];
                                                        const ratio = ${this.state.canvas_width} / ${this.state.canvas_height};
                                                        const containerWidth   = outerCanvasContainer.clientWidth;
                                                        const containerHeight  = outerCanvasContainer.clientHeight;
                        
                                                        const scale = containerWidth / ${this.state.canvas_width};
                                                        const zoom  = canvas.getZoom() * scale;
                                                        canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
                                                        canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);    
                                                            
                                                        canvas.on('mouse:over', function(opts) {
                                                            var selectedObj = opts.target;
                                                            canvas.setActiveObject(opts.target);
                                                            console.log(canvas.getActiveObject().get('type'));
                                                            canvas.renderAll();
                                                        });

                                                        canvas.on('mouse:move', function (opts) {
                                                          console.log('mouse:move');              
                                                          var obj12 = canvas.getActiveObject();
                                                          console.log(obj12);  
                                                          obj12.set({		
                                                            lockMovementX : true,
                                                                          lockMovementY : true,
                                                                          lockScalingX : true,
                                                                          lockScalingY : true,
                                                                          lockUniScaling : true,
                                                                          lockRotation : true
                                                          });
                                                          obj12.opacity = 1;
                                                          canvas.renderAll();			
                                                      });
                                        
                                                        canvas.on('mouse:down', function(opts) {
                                                            var selectedObj = opts.target;
                                                            canvas.setActiveObject(opts.target);
                                                            console.log(canvas.getActiveObject().get('type'));
                                                            if (canvas.getActiveObject().get('type')=='image') {
                                                                openGallery();
                                                            } else if (canvas.getActiveObject().get('type')=='i-text') {
                                                                opts.target.enterEditing();
                                                            }
                                                            canvas.renderAll();
                                                        });
                                                        
                                                        $('#span').change(function(e) {
                                                            var file = e.target.files[0];
                                                            console.log(file);
                                                            var reader1 = new FileReader();
                                                            reader1.onload = function(file) {
                                                                console.log("image upload");
                                                                var objs = canvas.getActiveObject();
                                                                let top = objs.top;
                                                                let left = objs.left;
                                                                
                                                                let wx = objs.width * objs.scaleX;
                                                                let wy = objs.height * objs.scaleY;
                                                                console.log(canvas.getActiveObject().get('type'));
                                                                if(canvas.getActiveObject().get('type')==="image") {
                                                                    $('.preloader').css('display','block');
                                                                    var formData = new FormData();
                                                                    formData.append('base64', file.target.result);
                                                                    fetch('https://haati.serverguy.cloud/rest/V1/base64/images', { method: 'POST',body: formData})
                                                                          .then(response => response.json())
                                                                          .then(JsonResponse => { 
                                                                            var imgObject = JSON.parse(JsonResponse);
                                                                            console.log(imgObject.image_url);
                                                                            objs.setSrc(imgObject.image_url, function(img) {
                                                                              var scalex1 = wx / img.width;
                                                                              var scaley1 = wy / img.height;
                                                                              let det = scalex1 * img.width;
                                                                              console.log("4 ->>", img.width * img.scaleX, scalex1,  det);
                                                                              addImage(file.target.result);
                                                                                fabric.Image.prototype._render = function(ctx) {
                                                                                    originalRenderadmin.call(this,ctx);
                                                                                    this.opacity=1;
                                                                                }
                                                                              objs.set({
                                                                                  scaleY: scaley1,
                                                                                  scaleX:  scalex1,
                                                                              });
                                                                              canvas.renderAll();
                                                                              $("#addtocart").click();
                                                                              $('.preloader').css('display','none');
                                                                          });
                                                                    });
                                                                }
                                                            }   
                                                            reader1.readAsDataURL(file);
                                                        });

                                                        function addImage(imgLink) {
                                                          fabric.Image.fromURL(imgLink, function(img) {		
                                                              var objs = canvas.getObjects();
                                                                  objs.forEach(function(e) {
                                                                      if (e && e.type === 'image') {
                                                              if(e && e.object_type != "background") {
                                                                          e.isrc = imgLink;
                                                                e.src = '';
                                                                e.opacity = 1;
                                                                console.log('test');
                                                                          canvas.renderAll();
                                                                      }
                                                              }
                                                                  });
                                                            
                                                          });
                                                        }

                                                        $("#addtocart").click(function() {
                                                          var objects = canvas.getObjects();
                                                          console.log(objects);
                                                          var ct = [];
                                                          var ct1 = [];
                                                          var ct2 = [];
                                                          objects.forEach(function(o) {
                                                            if(o.type =='image') {
                                                                if(o.object_type != "background") {
                                                                    if(o.src == '') {
                                                                    ct2.push('upload_images');
                                                                } else {
                                                                    ct.push(o.src);
                                                                    console.log('upload_images1');
                                                                }
                                                                  ct1.push(o.src);
                                                                  console.log('upload_images2');
                                                              }
                                                            }
                                                          });	
                                                          if(ct1.length != ct2.length) {
                                                            window.ReactNativeWebView.postMessage(JSON.stringify({preview: false}));
                                                            return false;
                                                          } else {
                                                            window.ReactNativeWebView.postMessage(JSON.stringify({preview: true}));
                                                            return false;
                                                          }
                                                        });

                                                        $(this).val(null);
                                                        return;
                                                    });    
                                                </script>
                                            </body>
                                        </html>`,
                }}
                ref={webview => {
                  this.myWebview = webview;
                }}
                renderLoading={() => {
                  return (
                    <View style={styles.loadingContainer}>
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
            ) : null}
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                this.sendMessageToWebFront();
              }}>
              <Text style={styles.saveText}>Save & Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icons
                name="chevron-right"
                style={{marginLeft: -10}}
                size={40}
                color="#407BFF"
              />
            </TouchableOpacity>
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
    height: '100%', //height / 100 * 100
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
    // marginBottom: 20,
  },
  saveText: {
    fontSize: 25,
    fontFamily: 'baloobhai2-bold',
    color: '#407BFF',
  },
});
export default FrontPage;
