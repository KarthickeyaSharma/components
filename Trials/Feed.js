import React from 'react';
import {Button, Text, View} from 'react-native';

const Feed = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world! Feed</Text>
      <Button
        onPress={() => {
          navigation.navigate('Settings');
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
export default Feed;
