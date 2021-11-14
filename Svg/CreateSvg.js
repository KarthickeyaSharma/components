import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class CreateSvg extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props, 'props');
  }
  render() {
    return (
      <WebView
        onLoadStart={() => {
          console.log('Start');
        }}
        onLoadEnd={() => console.log('end')}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        startInLoadingState={true}
        source={{
          html: `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>SVG</title>
                </head>
                <body>
                    ${this.props.svg}
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
    );
  }
}
