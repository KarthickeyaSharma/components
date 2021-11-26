import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  BackHandler,
} from 'react-native';
import HaatiText from '../../assets/hatti.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

import KeyboardInput from '../demo/demoScreen';

class LeftPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '#F44336',
      selectmessage: null,
      jsonData: null,
      languageSelected: 'English',
      font_Family: 'Arial',
      font_Size: 20,
      keyboardState: false,
    };
    this.Text_areaKeyBoard = this.Text_areaKeyBoard.bind(this);
    this.languageMessages = this.languageMessages.bind(this);
    this.fontWebText = this.fontWebText.bind(this);
    this.fontSizeText = this.fontSizeText.bind(this);
    this.colorWebText = this.colorWebText.bind(this);
    this.alignWebText = this.alignWebText.bind(this);
    this.layoutDesign = this.layoutDesign.bind(this);
    this.keyboardHandler = this.keyboardHandler.bind(this);
  }

  componentDidMount = () => {
    AsyncStorage.getItem('pdc_designs', (err, result) => {
      const index =
        result == null || undefined
          ? -1
          : JSON.parse(result).findIndex(x => x.skuCName === global.skuCName);
      console.log(JSON.parse(result), 'pdc_datas');
      if (index == -1) {
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
    this._keyboadDidshowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.keyboardHandler(true),
    );
  };

  componentWillUnmount() {
    this._keyboadDidshowListener.remove();
  }

  keyboardHandler = boolVal => {
    this.setState({
      keyboardState: boolVal,
    });
  };

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

  sendMessageToWebLeft = () => {
    console.log(this.myWebview);
    console.log(this);
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#canvas2json").click();
                })();
            `);
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

  layoutDesign = indexPos => {
    this.setState({
      jsonData:
        indexPos === 0
          ? JSON.stringify(layout1)
          : indexPos === 1
          ? JSON.stringify(layout2)
          : indexPos === 2
          ? JSON.stringify(layout3)
          : indexPos === 3
          ? JSON.stringify(layout4)
          : JSON.stringify(layout5),
    });
  };

  languageMessages(message, language) {
    console.log(message);
    this.setState(
      {
        selectmessage: message,
        languageSelected: language,
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

    setTimeout(() => {
      this.fontWebText1(font_fam);
    }, 500);
  };

  fontWebText1 = font_fam => {
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

  fontSizeText = font_size => {
    this.setState({
      font_Size: font_size,
    });
    var imsgs = `
        (function () {
            $("#fontSize").val("${font_size}");
            $("#applyfontSize").click();
        })();
    `;
    console.log(imsgs);
    this.myWebview.injectJavaScript(imsgs);
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
          <View style={styles.w30}></View>
        </View>

        {/* backgroundcolor */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}
          contentContainerStyle={styles.innerContainer}>
          <View style={styles.customizeContainer}>
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
                #canvas2json, #myTextArea, #span, #colorme, #applytext, #applyAlign, #inspireme, #applyfont, #fontme, #applyfontSize, #fontSize, #applykeyBoard, #alterImg, #myMenu {
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

                <button type="hidden" name="applytext" id="applytext">Apply</button>
                <textarea id="inspireme">Hello</textarea>

                <input type="hidden" name="fontme" id="fontme" value="Arial">
                <button id="applyfont">Apply Font</button>

                <input type="hidden" name="fontSize" id="fontSize" value="14">
                <button id="applyfontSize">Apply Font Size</button>

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

                            console.log(this.font);
                            if (this.isEditing) {
                              console.log("Active");
                              ctx.setLineDash([4, 0]);
                            } else {
                              console.log("Passive");
                              ctx.setLineDash([2, 3]);
                            }
                            
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
                                  lockMovementY: true,
                                  lockMovementx: true,
                                  cw: element.width,
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
                            } else if (this.cheight > (this.mheight) && this.fontSize <= this.fsize) {
                              this.fontSize -= 1;
                              this.height = this.mheight;
                            } else if (this.cheight < this.mheight && this.fontSize < this.fsize) { 
                              this.height = this.mheight;
                            } else {
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

                        $("#applyfontSize").click(function() {  
                            canvas.getActiveObject().set("fontSize",$("#fontSize").val());
                            canvas.getActiveObject().exitEditing();
                            canvas.renderAll();
                        });

                        function fontCallback(f) {
                          canvas.getActiveObject()["fontFamily"] = "Courier";
                          canvas.getActiveObject().exitEditing();
                          canvas.renderAll();
                          fontCallback1(f); 
                        }
                        function fontCallback1(f) {
                          canvas.getActiveObject()["fontFamily"] = f;
                          canvas.getActiveObject().exitEditing();
                          canvas.renderAll();
                        }
                     

                        $("#applykeyBoard").click(function() { 
                          canvas.getActiveObject().exitEditing();
                          if(canvas.getActiveObject()==null) {
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
                          } else {
                            canvas.getActiveObject().enterEditing();
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
                            openGallery();
                          }
                          if (canvas.getActiveObject().get('type') === "Textbox") {
                            var obj = canvas.getActiveObject();
                            obj.hasControls=false;
							              obj.borderColor="#EF80B1";
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
                          } else if (canvas.getActiveObject().get('type')=='Textbox') {
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
          </View>
        </ScrollView>

        {this.state.keyboardState ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <KeyboardInput
              FuncInstance={{
                Text_areaKeyBoard: this.Text_areaKeyBoard,
                languageMessages: this.languageMessages,
                fontWebText: this.fontWebText,
                fontSizeText: this.fontSizeText,
                colorWebText: this.colorWebText,
                alignWebText: this.alignWebText,
                layoutDesign: this.layoutDesign,
              }}
              activeIndex={2}
              keyboardState={this.keyboardHandler}
            />
          </View>
        ) : (
          <View
            style={{
              height: hp('10%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '30%'}}></View>
            <View
              style={{
                width: '40%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log(1);
                }}>
                <FontAwesome name="circle-o" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log(2);
                }}>
                <FontAwesome name="circle" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log(3);
                }}>
                <FontAwesome name="circle-o" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log(4);
                }}>
                <FontAwesome name="circle-o" size={20} />
              </TouchableOpacity>
            </View>
            <View style={{width: '30%'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('RightPage')}>
                <Text style={[styles.backText, {color: '#E280AA'}]}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  addBtn: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E73A5E',
    borderRadius: 50,
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
});
export default LeftPage;
