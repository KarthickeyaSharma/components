import React, {Component} from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {WebView} from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ResumeModal from '../Modals/ResumeModal';

var ScriptStyle = '';
class Front extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchresult: [],
      selectImageFront: [],
      frontArray: null,
      selectedJson: [],
      jsonData: [], //JSON.stringify(test2)
      canvas_width: 1080,
      canvas_height: 1536,
      online_pdc: [],
      local_pdc: [],
      show: false,
    };
  }

  componentDidMount() {
    console.log('Front Page :::: ', skuCName);
    this.frontPageSku();
    console.log('Token ::::: ', global.token);
  }

  frontPageSku = () => {
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
  };

  FrontImage = () => {
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
        // Converting image to cropzoomimage
        var objs = JsonResponse[global.json_id_front].json['objects'];
        for (var pid in objs) {
          console.log(objs[pid]['type'], 'pids');
          if (objs[pid]['type'] == 'image') {
            objs[pid]['type'] = 'cropzoomimage';
          }
        }
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
                local_pdc: JSON.parse(result)[index].frontPage[0].pdc_json,
              });
              global.isPreview = true;
              // JSON.parse(result)[index].preview == undefined
              //   ? false
              //   : JSON.parse(result)[index].preview;
            } else {
              global.isPreview = true; //false;
              this.setjsonData('online');
            }
            console.log('leftPage' in JSON.parse(result)[index]);
          }

          if (CategoryName == 'Invitations') {
            setTimeout(() => {
              this.sendMessageToWebFront();
              global.isPreview = true;
            }, 2000);
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
  };

  onMessage = data => {
    var mData = JSON.parse(data.nativeEvent.data);
    var jsonfile = mData.jsonfile;

    var svgfile = mData.svgfile;
    console.log(mData, 'onMessage');
    if (typeof mData === 'object') {
      if ('preview' in mData) {
        this.savePreview(mData.preview);
        global.isPreview = true; //mData.preview;
        this.sendMessageToWebFront();
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

  sendMessageToWebFront = () => {
    this.myWebview.injectJavaScript(`
                    (function () {
                        $("#canvas2json").click();
                    })();
                `);
  };

  savePDCs = () => {
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
    });
  };

  savePreview = boolValue => {
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
  };

  setjsonData = async type => {
    if (type == 'online') {
      AsyncStorage.getItem('pdc_designs').then(designs => {
        var d = designs ? JSON.parse(designs) : [];
        d = d.filter(e => !skuCName.includes(e.skuCName));
        AsyncStorage.setItem('pdc_designs', JSON.stringify(d));
      });
    } else {
      // global.isResumed = true;
    }

    // console.log(this.state.selectedJson);
    var Jsonselected = this.state.selectedJson;
    if (Jsonselected != '' || Jsonselected != null) {
      for (var pid in Jsonselected.objects) {
        if (Jsonselected.objects[pid]['fontFamily'] != undefined) {
          var replacefontFamily = Jsonselected.objects[pid]['fontFamily'];
          replacefontFamily = replacefontFamily.replace('"', '');
          replacefontFamily = replacefontFamily.replace('"', '');
          // alert(Jsonselected.objects[pid]['fontFamily']);

          await fetch(
            'https://haati.serverguy.cloud/rest/V1/product/pdp/fonts/post?fonts=' +
              replacefontFamily,
            {
              method: 'POST',
            },
          )
            .then(response => response.json())
            .then(JsonResponse1 => {
              if (JsonResponse1 != '[]' && JsonResponse1 != undefined) {
                ScriptStyle +=
                  '@font-face {' +
                  "font-family: '" +
                  replacefontFamily +
                  "';" +
                  "src: url('" +
                  JSON.parse(JsonResponse1)[0].path +
                  "');" +
                  '}' +
                  'div {' +
                  'font-family: ' +
                  replacefontFamily +
                  ';' +
                  '}';

                JsonResponse1 = JSON.parse(JsonResponse1);
                console.log(ScriptStyle);
              }
            });

          Jsonselected.objects[pid]['fontFamily'] = replacefontFamily;
        }
        if (Jsonselected.objects[pid]['type'] == 'i-text') {
          Jsonselected.objects[pid]['type'] = 'Textbox';
        }
      }
    }

    var pdcLocal = this.state.local_pdc;
    if (pdcLocal != '' || pdcLocal != null) {
      for (var pid in pdcLocal.objects) {
        // console.log(pid);
        // console.log(test.objects[pid]['type'], 'pids');
        if (pdcLocal.objects[pid]['type'] == 'i-text') {
          pdcLocal.objects[pid]['type'] = 'Textbox';
        }
      }
    }

    console.log(Jsonselected);

    // var objs = this.state.selectedJson.json['objects'];
    this.setState({
      jsonData: JSON.stringify(type == 'online' ? Jsonselected : pdcLocal),
      show: false,
    });
  };

  render() {
    return (
      <>
        {/* Start from scratch or resume modal */}
        <ResumeModal
          visibility={this.state.show}
          setjsonData={this.setjsonData}
        />
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
              <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.2.0/fabric.min.js"></script>
              <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
            </head>
            <style>
              ${ScriptStyle} 
            </style>

            <style type="text/css">
              #canvas2json, #addtocart, #myTextArea, #span, #alterImg, #myMenu {
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
                <canvas id="c" width="${this.state.canvas_width}" height="${this.state.canvas_height}"></canvas>
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
              </div>
                          
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
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + w, y);
                    ctx.lineTo(x + w, y + h);
                    ctx.lineTo(x, y + h);
                    ctx.lineTo(x, y);
                    ctx.closePath();
                    var stroke = ctx.strokeStyle;
                    ctx.strokeStyle = "#EF80B1";
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
    //this.fontSize += 2;
    this.height = this.mheight;

  }
   else {
    this.height=this.mheight;
    
    }



}



                  fabric.Textbox.prototype.onKeyDown = (function (onKeyDown) {
                    return function (e) {
                      console.log(e.keyCode); 
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
                          
                  var data = JSON.stringify(${this.state.jsonData}); 
                  canvas.loadFromJSON(
                  JSON.parse(data),
                  canvas.renderAll.bind(canvas));

                  const outerCanvasContainer = $('.fabric-canvas-wrapper')[0];
                  const ratio = ${this.state.canvas_width} / ${this.state.canvas_height};
                  const containerWidth   = outerCanvasContainer.clientWidth;
                  const containerHeight  = outerCanvasContainer.clientHeight;

                  const scale = containerWidth / ${this.state.canvas_width};
                  const zoom  = canvas.getZoom() * scale;
                  canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
                  canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]); 
                                                
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
                    if (canvas.getActiveObject().get('type') === "textbox") {
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
            }}
            ref={webview => {
              this.myWebview = webview;
            }}
            renderLoading={() => {
              return (
                <View style={this.props.loadingContainer}>
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

export default Front;