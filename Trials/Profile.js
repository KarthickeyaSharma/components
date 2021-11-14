import React from 'react';
import {Button, Text, View} from 'react-native';

const Profile = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world! Profile</Text>
      <Button
        onPress={() => {
          navigation.navigate('HomeTabs');
        }}
        title="Click Me"
      />
    </View>
  );
};
export default Profile;
