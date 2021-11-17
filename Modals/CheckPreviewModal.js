import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class CheckPreviewModal extends Component {
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
                  Uh-Oh
                </Text>
                <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                  Not all the pictures on this card
                </Text>
                <Text style={{fontSize: 12, fontFamily: 'BalooBhai2-Regular'}}>
                  have been customised
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.closePreviewModal();
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BalooBhai2-Regular',
                      color: '#407BFF',
                    }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </Modal>
    );
  }
}

export default CheckPreviewModal;
