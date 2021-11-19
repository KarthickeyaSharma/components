import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  BackHandler,
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

class Left extends Component {
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

  componentDidMount = () => {
    this.inspirationMethod();
    this.fontColorsMethod();
    this.InnerLeftLayouts();
    AsyncStorage.getItem('pdc_designs', (err, result) => {
      const index =
        result == null || undefined
          ? -1
          : JSON.parse(result).findIndex(x => x.skuCName === global.skuCName);
      console.log(JSON.parse(result), 'pdc_datas');
      if (index == -1) {

        // var objs =layout3.objects ;
        // for (var pid in objs) {
        //   console.log(objs[pid]['type'], 'pids');
        //   if (objs[pid]['type'] == 'image') {
        //     objs[pid]['type'] = 'cropzoomimage';
        //   }
        //   if (objs[pid]['type'] == 'i-text') {
        //     objs[pid]['type'] = 'Textbox';
        //   }
        // }
        // console.log(layout3,'1234');
        
        this.setState({jsonData: JSON.stringify(layout2)});
      } else {
        if ('leftPage' in JSON.parse(result)[index]) {
          this.setState({
            jsonData: JSON.parse(result)[index].leftPage[0].pdc_json,
          });
        } else {
          this.setState({jsonData: JSON.stringify(layout2)});
        }
        console.log('leftPage' in JSON.parse(result)[index]);
      }
    });
    this._keyboadDidshowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // alert(1);
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
  };

  componentWillUnmount() {
    this._keyboadDidshowListener.remove();
    this._keyboadDidhideListener.remove();
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

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

  onMessage(data) {
    var mData = JSON.parse(data.nativeEvent.data);
    var jsonfile = mData.jsonfile;
    var svgfile = mData.svgfile;
    console.log(mData, 'onMessage');
    const pdc_data = {
      skuCName: skuCName,
      leftPage: [{pdc_json: jsonfile}, {pdc_svg: svgfile}],
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
        d[index]['leftPage'] = [{pdc_json: jsonfile}, {pdc_svg: svgfile}];
      }
      AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
    });
  }

  sendMessageToWebLeft = type => {
    console.log(this.myWebview);
    console.log(this);
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#canvas2json").click();
                })();
            `);

    if (type == 'front') {
      this.props.navigation.goBack();
    } else if (type == 'right') {
      this.props.navigation.navigate('RightPage');
    }
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
        'https://haati.serverguy.cloud/rest/V1/product/pdp/colors/post?colors=0',
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
    console.log(String.fromCharCode(10));
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
    this.setState({
      font_Family: font_fam,
    });
    var imsgs = `
        (function () {
            $("#fontme").val("${font_fam}");
            $("#applyfont").click();
        })();
    `;
    console.log(imsgs);
    this.myWebview.injectJavaScript(imsgs);
  };

  Done = () => {
    this.setState({
      visible2: !this.state.visible2,
    });
    this.fontWebText(this.state.font_Family);
  };

  Text_areaKeyBoard = () => {
    var keyBoard = `
        (function () { 
            $("#applykeyBoard").click();
        })();
    `;
    console.log(keyBoard);
    this.myWebview.injectJavaScript(keyBoard);
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

  toggle3 = () =>
    this.setState({
      visible3: !this.state.visible3,
    });

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
                  <script src="https://haati.serverguy.cloud/fabric.3.2.0.js"></script> 
                  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Playball&display=swap" rel="stylesheet">
                  <link href="https://allfont.net/allfont.css?fonts=courier-new" rel="stylesheet" type="text/css" />
                  <link href="https://allfont.net/allfont.css?fonts=impact" rel="stylesheet" type="text/css" />
                  <link href="https://allfont.net/allfont.css?fonts=comic-sans-ms" rel="stylesheet" type="text/css" />
                  <link href="https://allfont.net/allfont.css?fonts=mistral" rel="stylesheet" type="text/css" />
                  
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
                  </style>
                  <style type="text/css">
                  #canvas2json, #addtocart,#myTextArea, #span, #colorme, #applytext, #applyAlign, #inspireme, #applyfont, #fontme, #applykeyBoard, #alterImg, #myMenu {
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
              
              <script>
              var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
              var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
              var canvas = document.getElementById("c");
              canvas.width = width;
              canvas.height = height;
            </script>
            

                  
                  <div class="wrapper fabric-canvas-wrapper" id="wrapper">
                    <canvas id='c' width=2002 height=2794></canvas>
                    <span><input type="file" name="" id="span"></span>
                      <div class="preloader js-preloader flex-center" style="display:none;">
                        <img src="https://haati.serverguy.cloud/pub/media/theme_options/default/preloader1.gif">
                      </div>
                      <br />

                  <button id='addtocart'>addtocart</button>
                  <button id='canvas2json'>2JSON</button>
                  <textarea id='myTextArea' onfocus="this.select();" onmouseup="return false;"></textarea>
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

                  <button type="hidden" name="applytext" id="applytext">Apply</button>
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
debugger;
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

                          var _wrapLine = function(_line, lineIndex, desiredWidth, reservedSpace) {
                            var lineWidth = 0,
                                splitByGrapheme = this.splitByGrapheme,
                                graphemeLines = [],
                                line = [],
                                words = splitByGrapheme ? fabric.util.string.graphemeSplit(_line) : _line.split(this._wordJoiners),
                                word = '',
                                offset = 0,
                                infix = splitByGrapheme ? '' : ' ',
                                wordWidth = 0,
                                infixWidth = 0,
                                largestWordWidth = 0,
                                lineJustStarted = true,
                                additionalSpace = splitByGrapheme ? 0 : this._getWidthOfCharSpacing();
                                
                            reservedSpace = reservedSpace || 0;
                            desiredWidth -= reservedSpace;
                            for (var i = 0; i < words.length; i++) {
                                word = fabric.util.string.graphemeSplit(words[i]);
                                wordWidth = this._measureWord(word, lineIndex, offset);
                                offset += word.length;
                                
                                if (this.breakWords && wordWidth >= desiredWidth) {
                                
                                  if (!lineJustStarted) {
                                      line.push(infix);
                                        lineJustStarted = true;
                                    }
                                  
                                    for (var w = 0; w < word.length; w++) {
                                      var letter = word[w];
                                        var letterWidth = this.getMeasuringContext().measureText(letter).width * this.fontSize / this.CACHE_FONT_SIZE;
                                        if (lineWidth + letterWidth > desiredWidth) {
                                          graphemeLines.push(line);
                                            line = [];
                                            lineWidth = 0;
                                        } else {
                                          line.push(letter);
                                            lineWidth += letterWidth;
                                        }
                                    }
                                    word = [];
                                } else {
                                  lineWidth += infixWidth + wordWidth - additionalSpace;
                                }
                        
                                if (lineWidth >= desiredWidth && !lineJustStarted) {
                                    graphemeLines.push(line);
                                    line = [];
                                    lineWidth = wordWidth;
                                    lineJustStarted = true;
                                } else {
                                    lineWidth += additionalSpace;
                                }
                        
                                if (!lineJustStarted) {
                                    line.push(infix);
                                }
                                line = line.concat(word);
                        
                                infixWidth = this._measureWord([infix], lineIndex, offset);
                                offset++;
                                lineJustStarted = false;
                                if (wordWidth > largestWordWidth && !this.breakWords) {
                                    largestWordWidth = wordWidth;
                                }
                            }
                        
                            i && graphemeLines.push(line);
                        
                            if (largestWordWidth + reservedSpace > this.dynamicMinWidth) {
                                this.dynamicMinWidth = largestWordWidth - additionalSpace + reservedSpace;
                            }
                        
                            return graphemeLines;
                        };
                        
                        
                        fabric.util.object.extend(fabric.Textbox.prototype, {
                           _wrapLine: _wrapLine,
                        });
                          
                        var originalRender = fabric.Textbox.prototype._render;
                        fabric.Textbox.prototype._render = function(ctx) {
                        originalRender.call(this, ctx);
                            
                        var w = this.width,
                        h = this.height,
                        x = -this.width / 2,
                        y = -this.height / 2;
                        ctx.beginPath();
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
                        
                    }
                          canvas.renderAll();
                          fabric.Cropzoomimage = fabric.util.createClass(fabric.Image,
                            {
                              type: 'cropzoomimage',
                              zoomedXY: false,
                              initialize: function (element, options) {
                                options || (options = {});
                                this.callSuper('initialize', element, options);
                                if(this.name!=undefined) {
                                  this.set({
                                    orgSrc: element.src,
                    opacity:0.3,
                    cx: 0,
                                    cy: 0,
                                    cw: element.width,
                    lockMovementY: true,
                    lockMovementx: true,
                                    ch: element.height
                                  });
                    }
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


                            fabric.Image.fromObject = function(object, callback) {
                              fabric.util.loadImage(object.src, function(img, error) {
                                if (error) {
                                  callback && callback(null, error);
                                  return;
                                }
                                fabric.Image.prototype._initFilters.call(object, object.filters, function(filters) {
                                  object.filters = filters || [];
                                  fabric.Image.prototype._initFilters.call(object, [object.resizeFilter], function(resizeFilters) {
                                    object.resizeFilter = resizeFilters[0];
                                    if (typeof object.version === 'undefined') {
                                      var elWidth = img.naturalWidth || img.width;
                                      var elHeight = img.naturalHeight || img.height;
                                      var scaleX = (object.scaleX || 1) * object.width / elWidth;
                                      var scaleY = (object.scaleY || 1) * object.height / elHeight;
                                      object.width = elWidth;
                                      object.height = elHeight;
                                      object.scaleX = scaleX;
                                      object.scaleY = scaleY;
                                    }
                                    var image = new fabric.Image(img, object);
                                    callback(image);
                                  });
                                });
                              }, null, object.crossOrigin);
                            };
  

                          
                           
                            fabric.Cropzoomimage.async = true;
                            fabric.Cropzoomimage.fromObject = function (object, callback) {
                              
                              fabric.util.loadImage(object.src, function(img, error) {
                               if (error) {
                                 callback && callback(null, error);
                                 return;
                               }
                                fabric.Image.prototype._initFilters.call(object, object.filters, function (filters) {
                                  object.filters = filters || [];
                            fabric.Image.prototype._initFilters.call(object, [object.resizeFilter], function(resizeFilters) {
                                   object.resizeFilter = resizeFilters[0];
                                   if (typeof object.version === 'undefined') {
                                     var elWidth = img.naturalWidth || img.width;
                                     var elHeight = img.naturalHeight || img.height;
                                     var scaleX = (object.scaleX || 1) * object.width / elWidth;
                                     var scaleY = (object.scaleY || 1) * object.height / elHeight;
                                     object.width = elWidth;
                                     object.height = elHeight;
                                     object.scaleX = scaleX;
                                     object.scaleY = scaleY;
                                   }
                                  var instance = new fabric.Cropzoomimage(img, object);
                                  if (callback) { callback(instance); }
                                });
                               }); 
                              }, null, object.crossOrigin);
                            };

             
                            fabric.Textbox.prototype._clearTextArea =  function(ctx) {
                              var width = this.width + this.fontSize * this.scaleX, height = this.height + 4;
                              ctx.clearRect(-width / 2, -height / 2, width, height);
                            }
               


                          
                var originalRender2 = fabric.Textbox.prototype.initDimensions;
                fabric.Textbox.prototype.initDimensions = function (ctx) {
                  originalRender2.call(this, ctx);
          
                  if (this.__skipDimension) {
                    return;
                  }
          
                  if (this.txtw != 1) {
                    this.mwidth = this.width;
                    this.mheight = this.height;
                    this.txtw = 1;
                    this.fsize = this.fontSize;
                this.breakWords=true;
          
                    
                this.cheight = this.calcTextHeight();
                
          
                  }
          
                  
              this.cheight = this.calcTextHeight();
              
              console.log("ch"+this.cheight);
              console.log("mh"+this.mheight);
          
              if (this.cwidth > (this.mwidth) && this.fontSize <= this.fsize) {
                    this.fontSize -= 1;
                this.width=this.mwidth;
                    this.height = this.mheight;
          
          
                  }
                  else if (this.cheight > (this.mheight) && this.fontSize <= this.fsize) {
                    this.fontSize -= 1;
                    this.height = this.mheight;
          
          
                  } else if (this.cheight < this.mheight && this.fontSize < this.fsize) { 
                    this.height = this.mheight;
          
                  }
                   else {
                    this.height=this.mheight;
                    
                    }
          
          
          
                }

                          
                fabric.Textbox.prototype.onKeyDown = (function (onKeyDown) {
                  return function (e) { 
                    console.log(this.fontSize);
                    console.log(this.fsize);
                    if (e.keyCode == 13 && this.cheight > (this.mheight)) {
                      this.exitEditing();
                      alert("Maximum Character reached");
                    } else if ((e.keyCode == 8 || e.keyCode == 46) && this.cheight < this.mheight && this.fontSize < this.fsize) {
                    this.fontSize += 1;
                    this.height = this.mheight;

                  }

                    onKeyDown.call(this, e);
                  }
                })(fabric.Textbox.prototype.onKeyDown)


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
                                if (o.get('type') === 'Textbox') {
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
                              if(canvas.getActiveObject().get('type') === 'Textbox')
                              { 
                                canvas.getActiveObject().set("focus","true");
                                canvas.getActiveObject().enterEditing();
                                canvas.getActiveObject().hiddenTextarea.focus(); 
                                  canvas.renderAll(); 
                              }
                            }
                          });

          
                          var data = JSON.stringify(${this.state.jsonData});
                          debugger;
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
                   opts.target.lockSkewingY = true;
                  opts.target.lockSkewingX = true;
                  opts.target.lockMovementY = true;
                  opts.target.lockMovementX = true;
                  
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
                  if (canvas.getActiveObject().get('type') === "Textbox") {
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

                canvas.on('mouse:down', function(opts) {
                  var selectedObj = opts.target;
                  canvas.setActiveObject(opts.target);
                  console.log(canvas.getActiveObject().get('type'));
                  if (canvas.getActiveObject().get('type')=='cropzoomimage') {
                      openGallery();
                  } else if (canvas.getActiveObject().get('type')=='i-text') {
                      opts.target.enterEditing();
                  }
                  canvas.renderAll();
              });
                     
                          
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
                    console.log(file.target.result);
                    objs.opacity=1;
                    objs.isrc = file.target.result;
                    objs.src = file.target.result;
                    objs.orgSrc = file.target.result;
                    objs.setSrc(file.target.result, function(img) {
                        console.log(img,"helloImg");
                        var scalex1 = wx / img.width;
                        var scaley1 = wy / img.height;
                        let det = scalex1 * img.width;
                        console.log("4 ->>", img.width * img.scaleX, scalex1,  det);
                        objs.set({
                            scaleY: scaley1,
                            scaleX:  scalex1,
                        });
                        canvas.renderAll();
                    });
                    $('.preloader').css('display','none');
                    setTimeout(function(){ $("#canvas2json").click(); }, 2000);
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
              baseUrl: '',
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

        {this.state.shouldShow ? (
          <View>
            <ScrollView horizontal={true}>
              <View
                style={{
                  height: hp('5%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{
                    borderBottomColor: 'red',
                    borderBottomWidth: 2,
                    width: 100,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: hp('2.4%'),
                      fontFamily: 'baloobhai2-bold',
                    }}>
                    Keyboard
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0,
                    width: 100,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={this.toggle}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp('2.4%'),
                      fontFamily: 'baloobhai2-bold',
                    }}>
                    Layout
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0,
                    width: 100,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={this.toggle1}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp('2.4%'),
                      fontFamily: 'baloobhai2-bold',
                    }}>
                    Inspiration
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0,
                    width: 100,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={this.togglefont}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp('2.4%'),
                      fontFamily: 'baloobhai2-bold',
                    }}>
                    Font
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0,
                    width: 100,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={this.togglecolor}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp('2.4%'),
                      fontFamily: 'baloobhai2-bold',
                    }}>
                    Color
                  </Text>

                  {/* <Image
              source={a}
              resizeMode={'stretch'}
              style={{width: wp('8.5%'), height: hp('4.6%')}}
            /> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0,
                    width: 100,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={this.toggletxtStyle}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp('2.4%'),
                      fontFamily: 'baloobhai2-bold',
                    }}>
                    Text Style
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        ) : null}

        {/* cropzoomImage bottomsheet */}
        <BottomSheet
          visible={this.state.visible3}
          onBackButtonPress={this.toggle3}
          onBackdropPress={this.toggle3}>
          <View
            style={{
              backgroundColor: '#CFE5FF',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              padding: 20,
            }}>
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 10,
                  paddingTop: 0,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '50%',
                  }}>
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'baloobhai2-bold',
                      }}>
                      Customize
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        visible3: !this.state.visible3,
                      })
                    }>
                    <Text
                      style={{
                        marginLeft: 30,
                        fontSize: 14,
                        fontFamily: 'baloobhai2-bold',
                        textAlign: 'center',
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.zoomIn();
                  }}>
                  <Feather name="zoom-in" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.zoomOut();
                  }}>
                  <Feather name="zoom-out" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.alternatePhoto();
                  }}>
                  <IconM
                    name="add-photo-alternate"
                    size={40}
                    // color="#407BFF"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.sendMessageToWebLeft('save');
                  }}>
                  <Icons
                    name="content-save-outline"
                    size={40}
                    // color="#407BFF"
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.btnContainer, {marginBottom: 20}]}>
                <TouchableOpacity
                  onPress={() => {
                    this.moveUp();
                  }}>
                  <Feather name="arrow-up-circle" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.moveDown();
                  }}>
                  <Feather name="arrow-down-circle" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.moveLeft();
                  }}>
                  <Feather name="arrow-left-circle" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.moveRight();
                  }}>
                  <Feather name="arrow-right-circle" size={40} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
        {/* layout bottomsheet */}
        <BottomSheet
          visible={this.state.visible}
          onBackButtonPress={this.toggle}
          onBackdropPress={this.toggle}>
          <View
            style={{
              backgroundColor: '#CFE5FF',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              padding: 20,
            }}>
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 10,
                  paddingTop: 0,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '50%',
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'baloobhai2-bold',
                      }}>
                      Layout
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Image
                      source={poly}
                      style={{height: 14, width: 16}}></Image>
                  </View>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        visible: !this.state.visible,
                      })
                    }>
                    <Text
                      style={{
                        marginLeft: 30,
                        fontSize: 14,
                        fontFamily: 'baloobhai2-bold',
                        textAlign: 'center',
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

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
                        this.setState({
                          layoutSelected: index,
                          visible: !this.state.visible,
                          jsonData:
                            index === 0
                              ? JSON.stringify(layout1)
                              : index === 1
                              ? JSON.stringify(layout2)
                              : index === 2
                              ? JSON.stringify(layout3)
                              : index === 3
                              ? JSON.stringify(layout4)
                              : JSON.stringify(layout5),
                        });
                      }}
                      style={{
                        width: wp('25%'),
                        height: hp('10%'),
                        backgroundColor: '#FFFFFF',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: 10,
                        borderColor:
                          index === this.state.layoutSelected
                            ? '#E280AA'
                            : '#FDF2F7',
                        borderWidth:
                          index === this.state.layoutSelected ? 2 : 0,
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
            </View>
          </View>
        </BottomSheet>
        {/* bulb bottomsheet */}
        <BottomSheet
          visible={this.state.visible1}
          onBackButtonPress={this.toggle1}
          onBackdropPress={this.toggle1}>
          <View
            style={{
              backgroundColor: '#CFE5FF',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              padding: 20,
            }}>
            <View
              style={{
                height: hp('40%'),
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 10,
                  paddingTop: 0,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '80%',
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'baloobhai2-bold',
                      }}>
                      Inspiration
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Image
                      source={poly}
                      style={{height: 14, width: 16}}></Image>
                  </View>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        visible1: !this.state.visible1,
                      })
                    }>
                    <Text
                      style={{
                        marginLeft: 30,
                        fontSize: 14,
                        fontFamily: 'baloobhai2-bold',
                        textAlign: 'center',
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{width: '100%', flexDirection: 'column'}}>
                {this.state.searchresult !== null ? (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.searchresult}
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
                            item.language === this.state.languageSelected
                              ? 2
                              : 0,
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
                        this.setState({messageSelected: index}, () => {
                          this.languageMessages(item.message);
                        })
                      }
                      style={{
                        width: '100%',
                        backgroundColor: '#F1F2F2',
                        paddingHorizontal: 10,
                        marginBottom: 15,
                        borderColor:
                          index === this.state.messageSelected
                            ? '#E280AA'
                            : '#FDF2F7',
                        borderWidth:
                          index === this.state.messageSelected ? 2 : 0,
                      }}>
                      <Text
                        style={{textAlign: 'center', paddingHorizontal: 10}}>
                        {item.message}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </BottomSheet>

        {/*  alphabet bottomsheet */}
        <BottomSheet
          visible={this.state.visible2}
          onBackButtonPress={this.toggle2}
          onBackdropPress={this.toggle2}>
          <View
            style={{
              backgroundColor: '#CFE5FF',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              padding: 20,
              height: hp('35%'),
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                padding: 10,
                paddingTop: 0,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '80%',
                }}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'baloobhai2-bold',
                    }}>
                    Styling
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Image source={poly} style={{height: 14, width: 16}}></Image>
                </View>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.Done}>
                  <Text
                    style={{
                      marginLeft: 30,
                      fontSize: 14,
                      fontFamily: 'baloobhai2-bold',
                      textAlign: 'center',
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'space-evenly',
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                {this.state.isshowFont ? (
                  <View
                    style={{
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'BalooBhai2-SemiBold',
                        marginTop: 10,
                        textAlign: 'left',
                        paddingLeft: 20,
                      }}>
                      Font
                    </Text>

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{width: '100%'}}>
                        <View
                          style={{
                            width: '100%',
                            paddingHorizontal: 10,
                            paddingBottom: 15,
                            borderRadius: 10,
                            flexDirection: 'row',
                            marginRight: 10,
                          }}>
                          {/* 1 */}
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 0}, () => {
                                  this.fontWebText('Old Standard TT');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 0
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 0 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'OldStandardTT-Regular',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          {/* 2 */}
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 1}, () => {
                                  this.fontWebText('Playball');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 1
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 1 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'Playball-Regular',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          {/* 3 */}
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 2}, () => {
                                  this.fontWebText('Courier New');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 2
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 2 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'Courier_New',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          {/* 4 */}
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 3}, () => {
                                  this.fontWebText('Impact');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 3
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 3 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'impact',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          {/* 5 */}
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 4}, () => {
                                  this.fontWebText('Comic Sans MS');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 4
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 4 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'comici',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 5}, () => {
                                  this.fontWebText('Trebuchet MS');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 5
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 5 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'trebuc',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 6}, () => {
                                  this.fontWebText('Mistral');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 6
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 6 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'CopyofMistral2',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              borderRadius: 10,
                              marginTop: 5,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({fontSelected: 7}, () => {
                                  this.fontWebText('Corbel Bold');
                                })
                              }>
                              <View
                                style={{
                                  width: 'auto',
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  borderRadius: 10,
                                  borderColor:
                                    this.state.fontSelected === 7
                                      ? '#E280AA'
                                      : '#000000',
                                  borderWidth:
                                    this.state.fontSelected === 7 ? 2 : 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'Corbel Bold',
                                    textAlign: 'center',
                                  }}>
                                  ABC
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                ) : null}

                {this.state.isshowColor ? (
                  <View
                    style={{
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                      flexDirection: 'column',
                      marginVertical: 20,
                    }}>
                    <View style={{width: '100%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'BalooBhai2-Regular',
                            }}>
                            OPACITY
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 'auto',
                            paddingVertical: 2,
                            paddingHorizontal: 8,
                            backgroundColor: '#E0E0E0',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: 'BalooBhai2-Regular',
                              textAlign: 'center',
                            }}>
                            100%
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        borderTopColor: '#E280AA',
                        borderTopWidth: 2,
                        paddingTop: 5,
                        paddingBottom: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: this.state.viewBGColor,
                          height: wp('20%'),
                          width: wp('20%'),
                          borderRadius: 5,
                          elevation: 5,
                          left: 5,
                        }}></View>

                      <FlatList
                        numColumns={6}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        data={this.state.selectColors}
                        style={{
                          width: wp('80%'),
                          height: hp('20%'),
                          paddingLeft: 20,
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                          <TouchableOpacity
                            onPress={() => this.colorCodeSelection(item)}
                            style={{
                              height: wp('6%'),
                              width: wp('6%'),
                              borderRadius: 100,
                              marginHorizontal: 8,
                              backgroundColor: `#${item.color_code}`,
                              paddingHorizontal: 5,
                              marginVertical: '2%',
                              elevation: 5,
                              borderWidth:
                                this.state.positionID === item.position
                                  ? 2
                                  : null,
                              borderColor:
                                this.state.positionID === item.position
                                  ? '#000000'
                                  : null,
                            }}></TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                ) : null}

                {this.state.isshowTextStyle ? (
                  <View
                    style={{
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                      flexDirection: 'column',
                      marginBottom: 40,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'BalooBhai2-SemiBold',
                      }}>
                      Text Alignment
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({alignSelected: 'left'}, () => {
                            this.changealign('left');
                          })
                        }>
                        <View
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            borderColor:
                              this.state.alignSelected === 'left'
                                ? '#E280AA'
                                : '#000000',
                            borderWidth:
                              this.state.alignSelected === 'left' ? 2 : 1,
                          }}>
                          <Image
                            source={left}
                            style={{
                              width: 30,
                              height: 30,
                              justifyContent: 'center',
                              alignSelf: 'center',
                              marginTop: 10,
                            }}></Image>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({alignSelected: 'center'}, () => {
                            this.changealign('center');
                          })
                        }>
                        <View
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            borderColor:
                              this.state.alignSelected === 'center'
                                ? '#E280AA'
                                : '#000000',
                            borderWidth:
                              this.state.alignSelected === 'center' ? 2 : 1,
                          }}>
                          <Image
                            source={center}
                            style={{
                              width: 37,
                              height: 37,
                              justifyContent: 'center',
                              alignSelf: 'center',
                              marginTop: 10,
                            }}></Image>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({alignSelected: 'right'}, () => {
                            this.changealign('right');
                          })
                        }>
                        <View
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            borderColor:
                              this.state.alignSelected === 'right'
                                ? '#E280AA'
                                : '#000000',
                            borderWidth:
                              this.state.alignSelected === 'right' ? 2 : 1,
                          }}>
                          <Image
                            source={right}
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              alignSelf: 'center',
                              marginTop: 10,
                            }}></Image>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </View>
        </BottomSheet>
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
export default Left;
