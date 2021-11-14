import React from 'react';
import {Button, Text, View} from 'react-native';

const Setting = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world! Setting</Text>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title="Go Back"
      />
      <Button
        onPress={() => {
          navigation.navigate('Profile');
        }}
        title="Click Me"
      />
    </View>
  );
};
export default Setting;
