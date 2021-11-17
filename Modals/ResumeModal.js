import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class ResumeModal extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   show: props.visibility,
    // };
  }
  render() {
    return (
      <Modal transparent={true} visible={this.props.visibility}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp('80%'),
              height: hp('19%'),
              borderRadius: 20,
              borderColor: '#D47EAC',
              borderWidth: 0.5,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'column',
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                alignItems: 'center',
                borderBottomColor: '#D47EAC',
              }}>
              <Text style={{fontSize: 16, fontFamily: 'baloobhai2-bold'}}>
                Pick up where you left off?
              </Text>
              <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                we've saved our progress so you
              </Text>
              <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                can resume or start again
              </Text>
            </View>
            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.setjsonData('online');
                }}
                style={{
                  flex: 0.5,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightWidth: 0.5,
                  borderRightColor: '#D47EAC',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'baloobhai2-bold',
                    color: '#EF80B1',
                  }}>
                  Start Again
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setjsonData('local');
                }}
                style={{
                  flex: 0.5,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'baloobhai2-bold',
                    color: '#407BFF',
                  }}>
                  Resume
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ResumeModal;
