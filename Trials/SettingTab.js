import React from 'react';
import {Button, Text, View} from 'react-native';

const SettingTab = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world! SettingTab</Text>
      <Button
        onPress={() => {
          navigation.navigate('Feed');
        }}
        title="Click Me"
      />
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title="Go Back"
      />
    </View>
  );
};
export default SettingTab;
