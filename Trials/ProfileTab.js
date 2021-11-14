import React, {Component} from 'react';
import {Button, Text, View, Alert, BackHandler} from 'react-native';

class ProfileTab extends Component {
  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Hello, world! ProfileTab</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Settings');
          }}
          title="Click Me"
        />
      </View>
    );
  }
}
export default ProfileTab;
