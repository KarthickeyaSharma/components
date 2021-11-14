import React from 'react';
import {Button, Text, View} from 'react-native';

const FeedTab = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world! FeedTab</Text>
      <Button
        onPress={() => {
          navigation.navigate('ProfileTab');
        }}
        title="Click Me"
      />
    </View>
  );
};
export default FeedTab;
