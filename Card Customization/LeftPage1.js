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
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {BottomSheet} from 'react-native-btr';
import {ScrollView} from 'react-native-gesture-handler';
import Icon1 from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');
import InsideLeftArrow from '../../assets/InsideLeftArrow.png';
import InsidePageRight from '../../assets/Inside_right_page.png';
import HaatiText from '../../assets/hatti.png';
//Layout Images
import {WebView} from 'react-native-webview';

import book from '../../assets/Front.png';
import book1 from '../../assets/Inside_L_Frame.png';
import a from '../../assets/Alphabet.png';
import back from '../../assets/book1.png';
import bulb1 from '../../assets/bulb.png';
import door from '../../assets/layout.png';
import poly from '../../assets/drap.png';
import right from '../../assets/right1.png';
import center from '../../assets/centre.png';
import left from '../../assets/left1.png';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import layout1 from '../../assets/layouts/layout1.json';
import layout2 from '../../assets/layouts/layout2.json';
import layout3 from '../../assets/layouts/layout3.json';
import layout4 from '../../assets/layouts/layout4.json';
import layout5 from '../../assets/layouts/layout5.json';

const options = {
  title: 'Pick an Image',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
};

class LeftPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      visible: false,
      visible1: false,
      visible2: false,
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
    };
  }

  componentDidMount() {
    this.inspirationMethod();
    this.fontColorsMethod();
    this.InnerLeftLayouts();
    console.log(global.isResumed, 'check');
    AsyncStorage.getItem('pdc_designs', (err, result) => {
      const index =
        result == null || undefined
          ? -1
          : JSON.parse(result).findIndex(x => x.skuCName === global.skuCName);
      console.log(JSON.parse(result), 'pdc_datas');
      if (index == -1) {
        this.setState({jsonData: JSON.stringify(layout2)});
      } else {
        if (global.isResumed) {
          if ('leftPage' in JSON.parse(result)[index]) {
            this.setState({
              jsonData: JSON.parse(result)[index].leftPage[0].pdc_json,
            });
          } else {
            this.setState({jsonData: JSON.stringify(layout2)});
          }
          console.log('leftPage' in JSON.parse(result)[index]);
        } else {
          this.setState({jsonData: JSON.stringify(layout2)});
        }
      }
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

  openpicker = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        this.setState({
          avatarSource: source,
        });
      }
    });
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
      frontPage: [{pdc_json: jsonfile}, {pdc_svg: svgfile}],
    };

    AsyncStorage.getItem('pdc_designs').then(designs => {
      const d = designs ? JSON.parse(designs) : [];
      const index = d.findIndex(x => x.skuCName === global.skuCName);
      console.log(d[index]);
      if (parseInt(index) == -1) {
        console.log(-1);
      } else {
        console.log(index);
        d[index]['leftPage'] = [{pdc_json: jsonfile}, {pdc_svg: svgfile}];
      }
      d.push(pdc_data);
      AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
    });
    global.isResumed = true;
  }

  sendMessageToWebLeft = type => {
    console.log(this.myWebview);
    console.log(this);
    this.myWebview.injectJavaScript(`
                (function () {
                    $("#canvas2json").click();
                })();
            `);

    type == 'front'
      ? this.props.navigation.goBack()
      : this.props.navigation.navigate('RightPage');
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

  changeColor() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: 'blue'});
    } else {
      this.setState({pressed: false, Color: 'blue'});
    }
  }
  changeColor1() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: 'red'});
      //this.setState({ pressed: true, backgroundColor: '#eb4634'});
    } else {
      this.setState({pressed: false, Color: 'red'});
    }
  }
  changeColor2() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: 'green'});
      //this.setState({ pressed: true, backgroundColor: 'lightgreen'});
    } else {
      this.setState({pressed: false, Color: 'green'});
    }
  }
  changeColor3() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: 'yellow'});
    } else {
      this.setState({pressed: false, Color: 'yellow'});
    }
  }
  changeColor4() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: '#03e3fc'});
    } else {
      this.setState({pressed: false, Color: '#03e3fc'});
    }
  }
  changeColor5() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: '#f57542'});
    } else {
      this.setState({pressed: false, Color: '#f57542'});
    }
  }
  changeColor6() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: '#f5a142'});
    } else {
      this.setState({pressed: false, Color: '#f5a142'});
    }
  }
  changeColor7() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: 'black'});
    } else {
      this.setState({pressed: false, Color: 'black'});
    }
  }
  changeColor8() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: 'grey'});
    } else {
      this.setState({pressed: false, Color: 'grey'});
    }
  }
  changeColor9() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: '#03fca1'});
    } else {
      this.setState({pressed: false, Color: '#03fca1'});
    }
  }
  changeColor10() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: '#03cffc'});
    } else {
      this.setState({pressed: false, Color: '#03cffc'});
    }
  }
  changeColor11() {
    if (!this.state.pressed) {
      this.setState({pressed: true, Color: '#036bfc'});
    } else {
      this.setState({pressed: false, Color: '#036bfc'});
    }
  }
  changefont() {
    if (!this.state.pressed) {
      this.setState({pressed: true, fontFamily: 'trebuc'});
      // } else   if (!this.state.pressed) {
      //   this.setState({ pressed: false, Color2: 'red'});
    } else {
      this.setState({pressed: false, fontFamily: 'trebuc'});
    }
  }
  changefont1() {
    if (!this.state.pressed) {
      this.setState({pressed: true, fontFamily: 'BalooBhai2-SemiBold'});
      //this.setState({ pressed: true, backgroundColor: '#eb4634'});
    } else {
      this.setState({pressed: false, fontFamily: 'BalooBhai2-SemiBold'});
    }
  }
  changefont2() {
    if (!this.state.pressed) {
      this.setState({pressed: true, fontFamily: 'BalooBhai2-Regular'});
      //this.setState({ pressed: true, backgroundColor: 'lightgreen'});
    } else {
      this.setState({pressed: false, fontFamily: 'BalooBhai2-Regular'});
    }
  }
  changefont3() {
    if (!this.state.pressed) {
      this.setState({pressed: true, fontFamily: 'BalooBhai2-ExtraBold'});
      //this.setState({ pressed: true, backgroundColor: 'lightgreen'});
    } else {
      this.setState({pressed: false, fontFamily: 'BalooBhai2-ExtraBold'});
    }
  }
  changefont4() {
    if (!this.state.pressed) {
      this.setState({pressed: true, fontFamily: 'BalooBhai2-Medium'});
      //this.setState({ pressed: true, backgroundColor: 'lightgreen'});
    } else {
      this.setState({pressed: false, fontFamily: 'BalooBhai2-Medium'});
    }
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
            <Text style={{color: 'transparent'}}>Preview</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}>
          <View>
            <View>
              <Text style={styles.mainText}>Inside Left</Text>
            </View>

            <View style={styles.textContainer}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    source={book}
                    resizeMode={'stretch'}
                    style={styles.imgShow}
                  />
                </TouchableOpacity>
                <Text style={styles.imgText}>Front</Text>
              </View>

              {CategoryName == 'Invitations' ? null : (
                <View style={{}}>
                  <TouchableOpacity>
                    <Image
                      source={book1}
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

            {/* <View> */}
            <View style={styles.customizeContainer}>
              <View style={{width: '10%'}}>
                <TouchableOpacity
                  style={[styles.arrow, {justifyContent: 'flex-start'}]}
                  onPress={() => {
                    this.sendMessageToWebLeft('front');
                  }}>
                  <Image source={InsidePageRight} />
                </TouchableOpacity>
              </View>
              <View style={{width: '80%'}}>
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
                          <script src="https://haati.serverguy.cloud/fabric.1.6.0.js"></script> 
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
                          #canvas2json, #myTextArea, #span, #colorme, #applytext, #applyAlign, #inspireme, #applyfont, #fontme {
                              display: none;
                          }
                      </style>
                      <body>
                          
                          <div class="fabric-canvas-wrapper">
                          <canvas id='c' width=2160 height=3120></canvas>
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

                          <input type="hidden" name="fontfam" id="fontfam" value="Old Standard TT">
                          <button id="applyfont">Old Standard TT</button>
                  
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
this.fontSize+=2;
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
                                    console.log(canvas.getActiveObject());
                                      canvas.getActiveObject().set("fontFamily",$("#fontfam").val());
                                      canvas.getActiveObject().exitEditing();
                                      canvas.renderAll();
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
                  
                                  canvas.on('mouse:down', function(opts) {
                                      var selectedObj = opts.target;
                                      canvas.setActiveObject(opts.target);
                                      console.log(canvas.getActiveObject().get('type'));
                                      if (canvas.getActiveObject().get('type')=='image') {
                                          openGallery();
                                      } else if (canvas.getActiveObject().get('type')=='i-text') {
                                          opts.target.enterEditing();
                                          opts.target.hiddenTextarea.focus();
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
                                              console.log(file.target.result);
                                              objs.setSrc(file.target.result, function(img) {
                                                  console.log(objs,"helloImg");
                                                  var scalex1 = wx / objs.width;
                                                  var scaley1 = wy / objs.height;
                                                  let det = scalex1 * objs.width;
                                                  console.log("4 ->>", objs.width * objs.scaleX, scalex1,  det);
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
              <View style={{width: '10%'}}>
                <TouchableOpacity
                  style={[styles.arrow, {justifyContent: 'flex-end'}]}
                  onPress={() => {
                    this.sendMessageToWebLeft('right');
                  }}>
                  <Image source={InsideLeftArrow} />
                </TouchableOpacity>
              </View>
            </View>
            {/* </View> */}
          </View>

          <View style={{height: hp('5%'), flexDirection: 'row'}}></View>
          
        </ScrollView>

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
                    Styling
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Image source={poly} style={{height: 14, width: 16}}></Image>
                </View>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      visible2: !this.state.visible2,
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
                justifyContent: 'space-evenly',
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
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
                                this.fontWebText('trebuc');
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



                
              </ScrollView>

              
            </View>
          </View>
        </BottomSheet>


        <View
            style={{
              height: hp('13%'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity>
              <Icon1 name="keyboard" size={40} color="lightgray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle}>
              <Image
                source={door}
                resizeMode={'stretch'}
                style={{width: wp('9.2%'), height: hp('5.5%')}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle1}>
              <Image
                source={bulb1}
                resizeMode={'stretch'}
                style={{width: wp('7.3%'), height: hp('5.3%')}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle2}>
              <Image
                source={a}
                resizeMode={'stretch'}
                style={{width: wp('8.5%'), height: hp('4.6%')}}
              />
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
    height: hp('50%'),
    marginTop: hp('4%'),
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  arrow: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
});
export default LeftPage;
