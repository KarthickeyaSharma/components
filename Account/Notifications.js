import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get("window");

import backgroundImage from '../assets/backicon.png';
import Image1 from '../assets/haatilogo.png';
import SwitchToggle from "react-native-switch-toggle";


export default class notification extends Component {

    constructor(props) {
        console.disableYellowBox = true;
        super(props);

        this.state = {
            refundSwitch: '',

            toggle: false,
            toggle1: false,
        },
            this.state = {
                secondswitch: '',
            }, this.state = {
                thirdswitch: '',
            }, this.state = {
                fourthswitch: '',
            }
    }


    render() {
        const { refundSwitch } = this.state
        const { secondswitch } = this.state
        const { thirdswitch } = this.state
        const { fourthswitch } = this.state


        return (
            <View style={{ flex: 1, backgroundColor: '#FDF2F7' }}>

                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>

                    {/* re */}
                    {/* <View style={{
                        height: height / 100 * 10, backgroundColor: 'white'

                    }}>



                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('addreminder') }}>
                            <Image

                                source={backgroundImage} style={{ marginTop: 20, marginLeft: 20 }}>

                            </Image>
                        </TouchableOpacity>
                       

                        <View>
                            <Text style={{ marginLeft: 35, marginTop: -18, fontFamily: 'Baloo Bhai 2' }}>
                                Notification preferences
                                </Text>

                        </View>
                    </View> */}


                    <View style={{
                        height: height / 100 * 10, flexDirection: 'row',
                        justifyContent: 'flex-start', alignItems: 'flex-start',

                    }}>
                        <View style={{
                            height: height / 100 * 10, flexDirection: 'row',
                            justifyContent: 'flex-start', alignItems: 'flex-start',

                        }}>
                            <TouchableOpacity

                                onPress={() => {
                                    this.props.navigation.navigate('ReminderDetails')
                                }}

                            >
                                <Image
                                    source={backgroundImage}
                                    style={{ marginTop: 20, marginLeft: 20 }}></Image>
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            height: height / 100 * 10, flexDirection: 'column',
                            justifyContent: 'center', alignItems: 'center',

                        }}>
                            <Text style={{
                                fontSize: 22, fontFamily: 'baloobhai2-bold', marginLeft: 40, marginTop: -5

                            }}>Notification preferences</Text>
                        </View>


                    </View>


                    {/* second */}

                    <View style={{
                        alignItems: 'center', justifyContent: 'center', height: height / 100 * 15,
                        marginTop: 15
                    }}>


                        <Image

                            source={Image1} style={{
                                width: width / 100 * 30, height: height / 100 * 20
                            }}>

                        </Image>



                    </View>



                    {/* third */}

                    <View style={{
                        width: 317, height: 40, backgroundColor: 'white', marginTop: 35,
                        borderWidth: 2, marginLeft: 29, flexDirection: 'row'
                    }}>
                        {/* text */}
                        <View style={{ flex: 0.7, backgroundColor: 'white', flexDirection: 'row' }}>

                            <Text style={{ marginLeft: 22, textAlign: 'center', marginTop: 6, fontFamily: ' baloobhai2-bold' }}>Show notifications</Text>
                        </View>

                        <View style={{ flex: 0.3, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                            <SwitchToggle
                                containerStyle={{
                                    width: 45,
                                    height: 25,
                                    borderRadius: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 5
                                }}
                                backgroundColorOn="#EF80B1"
                                backgroundColorOff="grey"
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 26,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                }}
                                switchOn={refundSwitch}
                                onPress={() => this.setState({ refundSwitch: !this.state.refundSwitch })}
                                circleColorOff="white"
                                circleColorOn="white"
                                duration={250}
                            />




                        </View>






                    </View>




                    {/* Third                */}


                    <View style={{ height: height / 100 * 3, marginTop: 48 }}>


                        <Text style={{ marginLeft: 35, fontFamily: 'BalooBhai2-Regular' }}>Categories</Text>
                    </View>


                    {/* fourth */}


                    <View style={{ width: 317, height: 40, backgroundColor: 'white', marginTop: 10, borderWidth: 2, marginLeft: 29, flexDirection: 'row' }}>
                        {/* text */}
                        <View style={{ flex: 0.7, backgroundColor: 'white', flexDirection: 'row' }}>

                            <Text style={{ marginLeft: 22, textAlign: 'center', marginTop: 6, fontFamily: 'BalooBhai2-Regular' }}>General</Text>
                        </View>

                        <View style={{ flex: 0.3, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                            <SwitchToggle
                                containerStyle={{
                                    width: 45,
                                    height: 25,
                                    borderRadius: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 5
                                }}
                                backgroundColorOn="#EF80B1"
                                backgroundColorOff="grey"
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 26,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                }}
                                switchOn={secondswitch}
                                onPress={() => this.setState({ secondswitch: !this.state.secondswitch })}
                                circleColorOff="white"
                                circleColorOn="white"
                                duration={250}
                            />



                        </View>
                    </View>






                    {/* five */}

                    <View style={{ width: 317, height: 40, backgroundColor: 'white', marginTop: 10, borderWidth: 2, marginLeft: 29, flexDirection: 'row' }}>
                        {/* text */}
                        <View style={{ flex: 0.7, backgroundColor: 'white', flexDirection: 'row' }}>

                            <Text style={{ marginLeft: 22, textAlign: 'center', marginTop: 6, fontFamily: 'BalooBhai2-Regular' }}>Reminders</Text>
                        </View>

                        <View style={{ flex: 0.3, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>


                            <SwitchToggle
                                containerStyle={{
                                    width: 45,
                                    height: 25,
                                    borderRadius: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 5
                                }}
                                backgroundColorOn="#EF80B1"
                                backgroundColorOff="grey"
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 26,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                }}
                                switchOn={thirdswitch}
                                onPress={() => this.setState({ thirdswitch: !this.state.thirdswitch })}
                                circleColorOff="white"
                                circleColorOn="white"
                                duration={250}
                            />

                            {/* <Switch
                                trackColor={{ false: 'grey', true: 'grey' }}
                                thumbColor="#1693db"
                                ios_backgroundColor="#1693db"
                                onValueChange={(value) => this.setState({ toggle1: value })}
                                value={this.state.toggle1}

                            /> */}



                        </View>
                    </View>



                    {/* six */}

                    <View style={{
                        width: 317, height: 40, backgroundColor: 'white', marginTop: 29, borderWidth: 2,
                        marginLeft: 29, flexDirection: 'row'
                    }}>
                        {/* text */}
                        <View style={{ flex: 0.7, backgroundColor: 'white', flexDirection: 'row' }}>

                            <Text style={{
                                marginLeft: 22, textAlign: 'center', marginTop: 6,
                                fontFamily: 'BalooBhai2-Regular'
                            }}>App icon badges</Text>
                        </View>

                        <View style={{ flex: 0.3, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                            <SwitchToggle
                                containerStyle={{
                                    width: 45,
                                    height: 25,
                                    borderRadius: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 5
                                }}
                                backgroundColorOn="#EF80B1"
                                backgroundColorOff="grey"
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 26,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                }}
                                switchOn={fourthswitch}
                                onPress={() => this.setState({ fourthswitch: !this.state.fourthswitch })}
                                circleColorOff="white"
                                circleColorOn="white"
                                duration={250}
                            />

                            {/* <Switch
                                trackColor={{ false: 'gray', true: 'gray' }}
                                thumbColor="#EF80B1"
                                ios_backgroundColor="#EF80B1"
                                onValueChange={(value) => this.setState({ toggle: value })}
                                value={this.state.toggle}

                            /> */}



                        </View>
                    </View>


                </ScrollView>
            </View>
        )
    }
}
