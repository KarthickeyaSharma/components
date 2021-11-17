import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {BottomSheet} from 'react-native-btr';
import {ScrollView} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
//Layout Images
import {WebView} from 'react-native-webview';

import a from '../../assets/Alphabet.png';
import bulb1 from '../../assets/bulb.png';
import door from '../../assets/layout.png';
import poly from '../../assets/drap.png';
import right from '../../assets/right1.png';
import center from '../../assets/centre.png';
import left from '../../assets/left1.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import layout1 from '../../assets/layouts/layout1.json';
import layout2 from '../../assets/layouts/layout2.json';
import layout3 from '../../assets/layouts/layout3.json';
import layout4 from '../../assets/layouts/layout4.json';
import layout5 from '../../assets/layouts/layout5.json';

class Right extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      selectedColor: '#F44336',
      pressed: true,
      textValue: '',
      searchresult: [],
      selectlanguage: [],
      selectmessage: null,
      selectColors: [],
      viewBGColor: '#fff',
      positionID: null,
      selectLayouts: [],
      jsonData: null,
      languageSelected: 'English',
      layoutSelected: 1,
      font_Family: 'Arial',
      shouldShow: false,
      isshowFont: false,
      isshowColor: false,
      isshowTextStyle: false,
    };
  }

  componentDidMount() {
    this.inspirationMethod();
    this.fontColorsMethod();
    this.InnerRightLayouts();
    AsyncStorage.getItem('pdc_designs', (err, result) => {
      const index =
        result == null || undefined
          ? -1
          : JSON.parse(result).findIndex(x => x.skuCName === global.skuCName);
      console.log(JSON.parse(result), 'pdc_datas');
      if (index == -1) {
        this.setState({jsonData: JSON.stringify(layout2)});
      } else {
        if ('rightPage' in JSON.parse(result)[index]) {
          this.setState({
            jsonData: JSON.parse(result)[index].rightPage[0].pdc_json,
          });
        } else {
          this.setState({jsonData: JSON.stringify(layout2)});
        }
        console.log('rightPage' in JSON.parse(result)[index]);
      }
    });
    this._keyboadDidshowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({
          shouldShow: true,
        });
        this.props.keyboardHandler(true);
      },
    );
    this._keyboadDidhideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({
          shouldShow: false,
        });
        this.props.keyboardHandler(false);
      },
    );
  }

  componentWillUnmount() {
    this._keyboadDidshowListener.remove();
    this._keyboadDidhideListener.remove();
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

  onMessage(data) {
    var mData = JSON.parse(data.nativeEvent.data);
    var jsonfile = mData.jsonfile;
    var svgfile = mData.svgfile;
    console.log(mData, 'onMessage');
    const pdc_data = {
      skuCName: skuCName,
      rightPage: [{pdc_json: jsonfile}, {pdc_svg: svgfile}],
    };

    AsyncStorage.getItem('pdc_designs').then(designs => {
      const d = designs ? JSON.parse(designs) : [];
      const index = d.findIndex(x => x.skuCName === global.skuCName);
      console.log(d[index]);
      if (parseInt(index) == -1) {
        console.log(-1);
        d.push(pdc_data);
      } else {
        console.log(index);
        d[index]['rightPage'] = [{pdc_json: jsonfile}, {pdc_svg: svgfile}];
      }
      AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
    });
  }

  sendMessageToWebRight = type => {
    console.log(this.myWebview);
    console.log(this);
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#canvas2json").click();
                })();
            `);

    if (type == 'left') this.props.navigation.navigate('LeftPage');
    else if (type == 'back') this.props.navigation.navigate('BackPage');
  };

  zoomIn = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#zoomInContext").click();
                })();
            `);
  };

  zoomOut = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#zoomOutContext").click();
                })();
            `);
  };

  moveUp = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#zoomMvUpContext").click();
                })();
            `);
  };

  moveDown = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#zoomMvDnContext").click();
                })();
            `);
  };

  moveRight = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#zoomMvRtContext").click();
                })();
            `);
  };

  moveLeft = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#zoomMvLtContext").click();
                })();
            `);
  };

  alternatePhoto = () => {
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#alterImg").click();
                })();
            `);
  };

  fontColorsMethod() {
    console.log('Colors');
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/product/pdp/colors/post?colors=1',
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
            selectColors: ColorsResponse,
          });
        });
    });
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
            searchresult: LanguageResponse,
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

  languageMessages(message) {
    console.log(message);
    this.setState(
      {
        selectmessage: message,
        visible1: !this.state.visible1,
      },
      () => {
        this.sendMessageToText(message);
      },
    );
  }

  sendMessageToText = msg => {
    // var imsg = this.state.languageSelected === "English" ? '"'+msg.replace(/(\r\n|\n|\r)/gm, "")+'"' : "'"+msg.replace(/(\r\n|\n|\r)/gm, "")+"'";
    var imsg =
      this.state.languageSelected === 'English'
        ? '"' + msg.replace(/(\r\n|\n|\r)/gm, '&#13;') + '"'
        : "'" + msg.replace(/(\r\n|\n|\r)/gm, '&#13;') + "'";
    var imsgs = `
        (function () {
            $("#inspireme").val(${imsg});
            $("#applytext").click();
        })();
    `;
    console.log(imsgs);
    this.myWebview.injectJavaScript(imsgs);
  };

  changealign = type => {
    if (!this.state.pressed) {
      this.setState(
        {pressed: true, textAlign: type, visible2: !this.state.visible2},
        () => {
          this.alignWebText(type);
        },
      );
    } else {
      this.setState(
        {pressed: false, textAlign: type, visible2: !this.state.visible2},
        () => {
          this.alignWebText(type);
        },
      );
    }
  };

  alignWebText = alignment => {
    var imsgs = `
        (function () {
            $("#alignment").val("${alignment}");
            $("#applyAlign").click();
        })();
    `;
    console.log(imsgs);
    this.myWebview.injectJavaScript(imsgs);
  };

  colorCodeSelection = item => {
    this.setState(
      {
        viewBGColor: `#${item.color_code}`,
        positionID: item.position,
        visible2: !this.state.visible2,
      },
      () => {
        this.colorWebText(`#${item.color_code}`);
      },
    );
  };

  colorWebText = color_code => {
    var imsgs = `
        (function () {
            $("#color").val("${color_code}");
            $("#colorme").click();
        })();
    `;
    console.log(imsgs);
    this.myWebview.injectJavaScript(imsgs);
  };

  fontWebText = font_fam => {
    var imsgs = `
        (function () {
            $("#fontme").val("${font_fam}");
            $("#applyfont").click();
        })();
    `;
    console.log(imsgs);
    this.myWebview.injectJavaScript(imsgs);
  };

  fun_name(value) {
    this.setState({
      textValue: value,
    });
  }

  getInitialState() {
    return {
      backgroundColor: '#ededed',
      color: 'white',
    };
  }

  onFocus() {
    this.setState({
      backgroundColor: 'green',
    });
  }

  onBlur() {
    this.setState({
      backgroundColor: '#ededed',
    });
  }

  fun_name(value) {
    this.setState({
      textValue: value,
    });
  }

  toggle = () =>
    this.setState({
      visible: !this.state.visible,
    });

  toggle1 = () =>
    this.setState({
      visible1: !this.state.visible1,
    });
  toggle2 = () =>
    this.setState({
      visible2: !this.state.visible2,
    });

  toggle3 = () => {
    this.setState({
      visible3: !this.state.visible3,
    });
  };

  render() {
    const oldstdttFont = Platform.select({
      ios: 'OldStandardTT-Regular.ttf',
      android: 'file:///android_asset/fonts/OldStandardTT-Regular.ttf',
    });
    const playballFont = Platform.select({
      ios: 'Playball-Regular.ttf',
      android: 'file:///android_asset/fonts/Playball-Regular.ttf',
    });
    const couriernewFont = Platform.select({
      ios: 'Courier_New.ttf',
      android: 'file:///android_asset/fonts/Courier_New.ttf',
    });
    const impactFont = Platform.select({
      ios: 'impact.ttf',
      android: 'file:///android_asset/fonts/impact.ttf',
    });
    const comiciFont = Platform.select({
      ios: 'comici.ttf',
      android: 'file:///android_asset/fonts/comici.ttf',
    });
    const trebucFont = Platform.select({
      ios: 'trebuc.ttf',
      android: 'file:///android_asset/fonts/trebuc.ttf',
    });
    const mistralFont = Platform.select({
      ios: 'CopyofMistral2.ttf',
      android: 'file:///android_asset/fonts/CopyofMistral2.ttf',
    });
    const corbelFont = Platform.select({
      ios: 'Corbel Bold.ttf',
      android: 'file:///android_asset/fonts/Corbel Bold.ttf',
    });
    return (
      <>
        {this.state.jsonData !== null ? (
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
                          <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.2.0/fabric.min.js"></script>
                          <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

                          <link rel="preconnect" href="https://fonts.googleapis.com">
                          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                          <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Playball&display=swap" rel="stylesheet">
                          <link href="https://allfont.net/allfont.css?fonts=courier-new" rel="stylesheet" type="text/css" />
                          <link href="https://allfont.net/allfont.css?fonts=impact" rel="stylesheet" type="text/css" />
                          <link href="https://allfont.net/allfont.css?fonts=comic-sans-ms" rel="stylesheet" type="text/css" />

                      </head>
                      <style>

                          @font-face {font-family: 'Old Standard TT'; src:url('${oldstdttFont}') format('truetype')}
                          @font-face {font-family: 'Playball'; src:url('${playballFont}') format('truetype')}
                          @font-face {font-family: 'Courier New'; src:url('${couriernewFont}') format('truetype')}
                          @font-face {font-family: 'Impact'; src:url('${impactFont}') format('truetype')}
                          @font-face {font-family: 'Comic Sans MS'; src:url('${comiciFont}') format('truetype')}
                          @font-face {font-family: 'Trebuchet MS'; src:url('${trebucFont}') format('truetype')}
                          @font-face {font-family: 'Mistral'; src:url('${mistralFont}') format('truetype')}
                          @font-face {font-family: 'Corbel Bold'; src:url('${corbelFont}') format('truetype')}
                          
                          #canvas2json, #myTextArea, #span, #colorme, #applytext, #applyAlign, #inspireme, #applyfont, #fontme, #applykeyBoard, #alterImg, #myMenu {
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
                          <div class="myMenu" id="myMenu">
                            <div class="my-context">
                              <button id="zoomInContext" data-id="zoomin">ZoomIn</button>
                              <button id="zoomOutContext" data-id="zoomout">ZoomOut</button>
                              <button id="zoomMvUpContext" data-id="mvup">Move Up</button>
                              <button id="zoomMvRtContext" data-id="mvrt">Move Righ</button>
                              <button id="zoomMvDnContext" data-id="mvdn">Move Down</button>
                              <button id="zoomMvLtContext" data-id="mvlt"> Move Left</button>
                            </div>
                          </div>
                          <button id='alterImg' onclick="openGallery()">Alter Image</button>
                          <div class="preloader js-preloader flex-center" style="display:none;">
                            <img src="https://haati.serverguy.cloud/pub/media/theme_options/default/preloader1.gif">
                          </div>

                          <button id='canvas2json'>2JSON</button>
                          <textarea id='myTextArea' onfocus="this.select();" onmouseup="return false;"></textarea>
                          <input type="file" accept="image/*" capture id="span">
  
                          <input type="hidden" name="color" id="color" value="#ccc">
                          <button id="colorme">Color me</button>

                          <input type="hidden" name="alignment" id="alignment" value="left">
                          <button id="applyAlign">Align me</button>

                          <button id="applytext">Apply</button>
                          <textarea id="inspireme">Hello</textarea>

                          <input type="hidden" name="fontme" id="fontme" value="Arial">
                          <button id="applyfont">Apply Font</button>

                          <input type="hidden" name="keyBoard" id="keyBoard" value="#ccc">
                          <button id="applykeyBoard">Key Board</button>
                  
                          <script>
                  
                              function openGallery() {
                                  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                      navigator.mediaDevices.getUserMedia({ video: true });
                                  }
                                  $("#span").click();
                              }
                  
                              const MOVE_x= 5;
                              const MOVE_y= 5;
                              const ZOOM_factor= 10;
                          
                            
                              $(function () {

                                  var canvas = new fabric.Canvas('c', {
                                    subTargetCheck: true,
                                    allowTouchScrolling: true,
                                    fireRightClick: true,
                                    stopContextMenu: true
                                  });

                                  fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function(e) {
                                    e.preventDefault();
                                  });
                                  var curX, curY;

                                  fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function(e) {
                                    var cnvsPos = $('#wrapper').offset();
                                    if (canvas.getActiveObject().get('type') === "cropzoomimage") {
                                      var obj = canvas.getActiveObject();
                                      curX = (obj.left + obj.width/3) ;
                                      curY = (obj.top + obj.height/2);
                                      $('#myMenu').css({'top': curY, 'left': curX}).fadeIn('slow');
                                    }        
                                  });
                                  
                                  var originalRender = fabric.IText.prototype._render;
                                      fabric.IText.prototype._render = function(ctx) {
                                      originalRender.call(this, ctx);
                                          
                                      var w = this.width,
                                      h = this.height,
                                      x = -this.width / 2,
                                      y = -this.height / 2;
                                      ctx.beginPath();
                                      ctx.setLineDash([2, 3]);
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
                                      ctx.font = '13px';
                                      ctx.fillRect(x, y-20, 20, 20);
                                      ctx.lineWidth = 5;
                                      ctx.fillStyle = '#000000';
                                      ctx.font = '13px Bentham';
                                      ctx.fillText("T",x+4,y-3);
                                  }

                                  fabric.Cropzoomimage = fabric.util.createClass(fabric.Image,
                                    {
                                      type: 'cropzoomimage',
                                      zoomedXY: false,
                                      initialize: function (element, options) {
                                        options || (options = {});
                                        this.callSuper('initialize', element, options);
                                        this.set({
                                          orgSrc: element.src,
                                          cx: 0,
                                          cy: 0,
                                          cw: element.width,
                                          ch: element.height
                                        });
                                      },

                                      zoomBy: function (x, y, z, callback) {
                                        if (x || y) { this.zoomedXY = true; }
                                        this.cx += x;
                                        this.cy += y;

                                        if (z) {
                                          this.cw -= z;
                                          this.ch -= z / (this.width / this.height);
                                        }

                                        if (z && !this.zoomedXY) {
                                          this.cx = this.width / 2 - (this.cw / 2);
                                          this.cy = this.height / 2 - (this.ch / 2);
                                        }

                                        if (this.cw > this.width) { this.cw = this.width; }
                                        if (this.ch > this.height) { this.ch = this.height; }
                                        if (this.cw < 1) { this.cw = 1; }
                                        if (this.ch < 1) { this.ch = 1; }
                                        if (this.cx < 0) { this.cx = 0; }
                                        if (this.cy < 0) { this.cy = 0; }
                                        if (this.cx > this.width - this.cw) { this.cx = this.width - this.cw; }
                                        if (this.cy > this.height - this.ch) { this.cy = this.height - this.ch; }
                                        this.rerender(callback);
                                      },

                                      rerender: function (callback) {
                                        var img = new Image(), obj = this;
                                        img.crossOrigin = "Anonymous";
                                        img.onload = function () {
                                          var canvas = fabric.util.createCanvasElement();
                                          canvas.width = obj.width;
                                          canvas.height = obj.height;
                                          canvas.getContext('2d').drawImage(this, obj.cx, obj.cy, obj.cw, obj.ch, 0, 0, obj.width, obj.height);

                                          img.onload = function () {
                                            obj.setElement(this);
                                            obj.set({
                                              left: obj.left,
                                              top: obj.top,
                                              angle: obj.angle
                                            });
                                            obj.setCoords();
                                            if (callback) { callback(obj); }
                                          };
                                          img.src = canvas.toDataURL('image/png');
                                        };
                                        img.src = this.orgSrc;

                                      },

                                      toObject: function () {
                                        return fabric.util.object.extend(this.callSuper('toObject'), {
                                          orgSrc: this.orgSrc,
                                          cx: this.cx,
                                          cy: this.cy,
                                          cw: this.cw,
                                          ch: this.ch
                                        });
                                      }
                                    });

                                  fabric.Cropzoomimage.async = true;
                                  fabric.Cropzoomimage.fromObject = function (object, callback) {
                                    fabric.util.loadImage(object.src, function (img) {
                                      fabric.Image.prototype._initFilters.call(object, object, function (filters) {
                                        object.filters = filters || [];
                                        var instance = new fabric.Cropzoomimage(img, object);
                                        if (callback) { callback(instance); }
                                      });
                                    }, null, object.crossOrigin);
                                  };

                                  var originalRender2 = fabric.IText.prototype._initDimensions;
                                  fabric.IText.prototype._initDimensions = function(ctx) {
                                  originalRender2.call(this,ctx);
                                   
                                     if (this.__skipDimension) {
                                          return;
                                      }
                                    
                                    console.log("mw"+this.mwidth);
                                    console.log("mh"+this.mheight);
                                        
                                    if(this.txtw!=1) {
                                        this.mwidth=this.width;
                                        this.mheight=this.height;
                                    this.txtw=1;
                                    this.fsize=this.fontSize;
                                    
                                    this.cheight=this._getTextHeight(ctx);
                                  
                                  } 
                                    this.cheight=this._getTextHeight(ctx);
                                    if(this.cheight>(this.mheight - 10) && this.fontSize<=this.fsize){
                                    this.fontSize-=2;
                                     this.height=this.mheight;
                                    } else if(this.cheight<this.mheight && this.fontSize<this.fsize){
                                     
                                     this.height=this.mheight;
                                     
                                    }
                                  }
                                  
                                  fabric.IText.prototype.onKeyDown = (function(onKeyDown) {
                                    return function(e) {
                                    console.log(e.keyCode);
                                    console.log(e.key);
                                      if (e.keyCode == 13 && this.cheight>=(this.mheight-15)) {
                                          this.exitEditing();
                                    } 
                                    
                                    onKeyDown.call(this, e);
                                    }
                                  })(fabric.IText.prototype.onKeyDown)

                                  $('.my-context button').click(function(){
                                    var imgObj = canvas.getActiveObject();
                                    if (!imgObj) return;

                                    var clickedme =   $(this).attr("id");
                                    var Zm = 0;
                                    var movZx = 0;
                                    var movZy = 0;
                                    switch(clickedme) {
                                      case "zoomInContext":
                                        Zm = ZOOM_factor;
                                        break;

                                        case "zoomOutContext":
                                        Zm = -ZOOM_factor;
                                        break;

                                        case "zoomMvUpContext":
                                        movZy = -MOVE_y;
                                        break;

                                        case "zoomMvDnContext":
                                        movZy = MOVE_y;
                                        break;

                                        case "zoomMvRtContext":
                                        movZx = MOVE_x;
                                        break;

                                        case "zoomMvLtContext":
                                        movZx = -MOVE_x;
                                        break;
                                    }
                                    imgObj.zoomBy(movZx, movZy, Zm);
                                    canvas.renderAll();

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

                                  $("#colorme").click(function() {
                                      canvas.getActiveObject().set("fill",$("#color").val());
                                      canvas.getActiveObject().exitEditing();
                                      canvas.renderAll();
                                  });

                                  $("#applyAlign").click(function() {
                                      canvas.getActiveObject().set("textAlign",$("#alignment").val());
                                      canvas.getActiveObject().exitEditing();
                                      canvas.renderAll();
                                  });

                                  $("#applytext").click(function() {
                                      canvas.getActiveObject().set("text",$("#inspireme").val().replace(/&#13;/g,String.fromCharCode(10)));
                                      canvas.getActiveObject().exitEditing();
                                      canvas.renderAll();
                                  });

                                  $("#applyfont").click(function() {
                                      canvas.getActiveObject().set("fontFamily",$("#fontme").val());
                                      canvas.getActiveObject().exitEditing();
                                      canvas.renderAll();
                                      fontCallback($("#fontme").val());
                                  });

                                  function fontCallback(f) {
                                      canvas.getActiveObject()["fontFamily"] = f;
                                      canvas.getActiveObject().exitEditing();
                                      canvas.renderAll();
                                  }

                                  $("#applykeyBoard").click(function() { 
                                    if(canvas.getActiveObject()==null)
                                    {
                                      var i=0;
                                      var objs = canvas.getObjects().filter(function(o) {
                                        if (o.get('type') === 'i-text') {
                                          if(i==0)
                                          {
                                          i=1;
                                          canvas.setActiveObject(o);   
                                          o.set("focus","true");
                                          o.enterEditing();
                                          o.hiddenTextarea.focus(); 
                                          canvas.renderAll(); 
                                          }
                                        } 
                                    });
                                    }
                                    else
                                    {
                                      if(canvas.getActiveObject().get('type') === 'i-text')
                                      { 
                                        canvas.getActiveObject().set("focus","true");
                                        canvas.getActiveObject().enterEditing();
                                        canvas.getActiveObject().hiddenTextarea.focus(); 
                                          canvas.renderAll(); 
                                      }
                                    }
                                  });
                  
                                  var data = JSON.stringify(${this.state.jsonData});
                                  canvas.loadFromJSON(
                                  JSON.parse(data),
                                  canvas.renderAll.bind(canvas));
  
                                  const outerCanvasContainer = $('.fabric-canvas-wrapper')[0];
      
                                  const ratio = canvas.getWidth() / canvas.getHeight();
                                  const containerWidth   = outerCanvasContainer.clientWidth;
                                  const containerHeight  = outerCanvasContainer.clientHeight;
  
                                  const scale = containerWidth / canvas.getWidth();
                                  const zoom  = canvas.getZoom() * scale;
                                  canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
                                  canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);    
                                      
                                  canvas.on('mouse:over', function(opts) {
                                      var selectedObj = opts.target;
                                      canvas.setActiveObject(opts.target);
                                      console.log(canvas.getActiveObject().get('type'));
                                      canvas.renderAll();
                                  });
                  
                                  canvas.on('mouse:up', function (opts) {
                                    var selectedObj = opts.target;
                                    canvas.setActiveObject(opts.target);
                                    console.log(canvas.getActiveObject().get('type'));
                                    canvas.renderAll();
                                    if (canvas.getActiveObject().get('type') === "cropzoomimage") {
                                      var obj = canvas.getActiveObject();
                                      if (obj.zoomedxy != 1) {
                                        obj.orgSrc = obj.src;
                                        obj.cw = obj.width;
                                        obj.ch = obj.height;
                                        obj.cx = 0;
                                        obj.cy = 0;
                                      }
                                    }
                                    if (canvas.getActiveObject().get('type') === "i-text") {
                                      var obj = canvas.getActiveObject();
                                      obj.enterEditing();
                                      if (obj.txtw != 1) {
                                        obj.txtw = 0;
                                        obj.dynamicMinWidth = this.width;
                                        obj.mheight = this.height;
                                        maxW = obj.width;
                                        maxH = obj.height;
                                      }
                            
                                    }
                            
                                  });
                                  canvas.on('mouse:up', function (opts) {
                                })
                                  
                                  $('#span').change(function (e) {
                                    var file = e.target.files[0];
                                    console.log(file);
                                    var reader1 = new FileReader();
                                    reader1.onload = function (file) {
                                      console.log("image upload");
                                      var objs = canvas.getActiveObject();
                                      let top = objs.top;
                                      let left = objs.left;
                            
                                      let wx = objs.width * objs.scaleX;
                                      let wy = objs.height * objs.scaleY;
                            
                                      console.log(canvas.getActiveObject().get('type'));
                                      if (canvas.getActiveObject().get('type') === "cropzoomimage") {
                                          $('.preloader').css('display','block');
                                          var formData = new FormData();
                                          formData.append('base64', file.target.result);
                                          fetch('https://haati.serverguy.cloud/rest/V1/base64/images', { method: 'POST',body: formData})
                                              .then(response => response.json())
                                              .then(JsonResponse => { 
                                                  var imgObject = JSON.parse(JsonResponse);
                                                  console.log(imgObject.image_url);
                                                  objs.isrc = imgObject.image_url;
                                                  objs.src = imgObject.image_url;
                                                  objs.orgSrc = imgObject.image_url;
                                                  objs.setSrc(imgObject.image_url, function(img) {
                                                      var scalex1 = wx / objs.width;
                                                      var scaley1 = wy / objs.height;
                                                      let det = scalex1 * objs.width;
                                                      console.log("4 ->>", objs.width * objs.scaleX, scalex1,  det);
                                                      objs.set({
                                                          scaleY: scaley1,
                                                          scaleX:  scalex1,
                                                      });
                                                      canvas.renderAll();
                                                      $('.preloader').css('display','none');
                                                  });
                                          });
                                      }
                                    }
                                    reader1.readAsDataURL(file);
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
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
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
});
export default Right;
