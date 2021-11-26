import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  KeyboardAccessoryView,
  KeyboardUtils,
} from 'react-native-keyboard-input';
import {_} from 'lodash';
import './demoKeyboards';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

export default class KeyboardInput extends Component {
  static propTypes = {
    message: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.keyboardAccessoryViewContent =
      this.keyboardAccessoryViewContent.bind(this);
    this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
    this.resetKeyboardView = this.resetKeyboardView.bind(this);
    this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
    this.showLastKeyboard = this.showLastKeyboard.bind(this);
    this.isCustomKeyboardOpen = this.isCustomKeyboardOpen.bind(this);

    this.state = {
      customKeyboard: {
        component: undefined,
        initialProps: undefined,
      },
      receivedKeyboardData: undefined,
      useSafeArea: true,
      keyboardOpenState: false,
      activeTab: 0,
    };
  }

  onKeyboardItemSelected(keyboardId, params) {
    const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(
      params,
    )}`;
    this.setState({receivedKeyboardData});
  }

  onKeyboardResigned() {
    this.setState({keyboardOpenState: false});
    this.resetKeyboardView();
  }

  getToolbarButtons() {
    return [
      {
        text: 'Keyboard',
        testID: 'Keyboard',
        onPress: () => this.resetKeyboardView(),
        // onPress: () => this.props.getAlert(),
      },
      {
        text: 'Layout',
        testID: 'Layout',
        onPress: () =>
          this.showKeyboardView(
            'Layout',
            'FIRST - 1 (passed prop)',
            1,
            this.props.FuncInstance,
            this.props.activeIndex,
          ),
      },
      {
        text: 'Inspiration',
        testID: 'Inspiration',
        onPress: () =>
          this.showKeyboardView(
            'Inspiration',
            'SECOND - 2 (passed prop)',
            2,
            this.props.FuncInstance,
            this.props.activeIndex,
          ),
      },
      {
        text: 'Font',
        testID: 'Font',
        onPress: () =>
          this.showKeyboardView(
            'Font',
            'FIRST - 3 (passed prop)',
            3,
            this.props.FuncInstance,
            this.props.activeIndex,
          ),
      },
      {
        text: 'Size',
        testID: 'Size',
        onPress: () =>
          this.showKeyboardView(
            'Size',
            'FIRST - 3 (passed prop)',
            4,
            this.props.FuncInstance,
            this.props.activeIndex,
          ),
      },
      {
        text: 'Color',
        testID: 'Color',
        onPress: () =>
          this.showKeyboardView(
            'Color',
            'SECOND - 3 (passed prop)',
            5,
            this.props.FuncInstance,
            this.props.activeIndex,
          ),
      },
      {
        text: 'Text Style',
        testID: 'Text Style',
        onPress: () =>
          this.showKeyboardView(
            'TextStyle',
            'SECOND - 3 (passed prop)',
            6,
            this.props.FuncInstance,
            this.props.activeIndex,
          ),
      },
    ];
  }

  componentDidMount() {
    this._keyboadDidhideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.state.activeTab == 0
        ? this.props.keyboardState(false)
        : console.log(true),
    );
  }

  componentWillUnmount() {
    this._keyboadDidhideListener.remove();
  }

  resetKeyboardView() {
    this.setState({customKeyboard: {}, activeTab: 0});
    this.props.FuncInstance.Text_areaKeyBoard();
    // this.props.keyboardState(this.state.keyboardOpenState);
  }

  showKeyboardView(component, title, tabIndex, func, activeSlideIndex) {
    this.props.keyboardState(true);
    this.setState({
      keyboardOpenState: true,
      activeTab: tabIndex,
      customKeyboard: {
        component,
        initialProps: {title, func, activeSlideIndex},
      },
    });
  }

  dismissKeyboard() {
    KeyboardUtils.dismiss();
  }

  showLastKeyboard() {
    const {customKeyboard} = this.state;
    this.setState({customKeyboard: {}});

    setTimeout(() => {
      this.setState({
        keyboardOpenState: true,
        customKeyboard,
      });
    }, 500);
  }

  isCustomKeyboardOpen = () => {
    const {keyboardOpenState, customKeyboard} = this.state;
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  };

  keyboardAccessoryViewContent() {
    return (
      <View style={styles.keyboardContainer}>
        {/* <Button
          title="Open Keyboard"
          onPress={() => {
            this.textInputRef.focus();
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            maxHeight={200}
            style={styles.textInput}
            ref={r => {
              this.textInputRef = r;
            }}
            underlineColorAndroid="transparent"
            onFocus={() => this.resetKeyboardView()}
            testID={'input'}
          />
        </View> */}
        <View style={{flexDirection: 'row'}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.getToolbarButtons().map((button, index) => (
              <TouchableOpacity
                onPress={button.onPress}
                style={[
                  styles.btnTabContainer,
                  index == this.state.activeTab ? styles.activeTab : null,
                ]}
                key={index}
                testID={button.testID}>
                <Text
                  style={[
                    styles.tabText,
                    {color: index == this.state.activeTab ? 'red' : 'black'},
                  ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAccessoryView
          renderContent={this.keyboardAccessoryViewContent}
          onHeightChanged={height =>
            this.setState({
              keyboardAccessoryViewHeight: IsIOS ? height : undefined,
            })
          }
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          kbComponent={this.state.customKeyboard.component}
          kbInitialProps={this.state.customKeyboard.initialProps}
          onItemSelected={this.onKeyboardItemSelected}
          onKeyboardResigned={this.onKeyboardResigned}
          revealKeyboardInteractive
          useSafeArea={this.state.useSafeArea}
        />
      </View>
    );
  }
}

const COLOR = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLOR,
  },
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  inputContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: 25,
  },
  keyboardContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: COLOR,
      },
    }),
  },
  textInput: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 100,
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  switch: {
    marginLeft: 15,
  },
  safeAreaSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTabContainer: {
    paddingVertical: 10,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'baloobhai2-bold',
  },
});
