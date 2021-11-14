



import React, { Component } from 'react';

import { View, Dimensions, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get("window");

import add from '../assets/Add.png';

import an from '../assets/glass.png';

import cake from '../assets/cake.png';


export default class ReminderPageUpdateSettings extends Component {
    render() {
        return (
            // whole screen
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>

                    {/* reminder */}

                    <View style={{ height: height / 100 * 10, backgroundColor: 'white' }}>
                        <Text style={{
                            fontSize: 16, fontFamily: 'BalooBhai2-SemiBold',
                            marginLeft: 40, marginTop: 45, color: 'grey',
                        }}>
                            Reminder
                            </Text>
                    </View>

                    {/* pink screen */}

                    <View style={{
                        height: height / 100 * 120,
                        width: width / 100 * 100, backgroundColor: '#FDF2F7',
                        borderTopRightRadius: 44, marginTop: 10
                    }}>
                        {/* remainder  */}
                        <View style={{ height: 60 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.70 }}>
                                    <Text style={{
                                        fontSize: 24, fontFamily: 'BalooBhai2-SemiBold',
                                        marginLeft: 34, marginTop: 25,
                                    }}> Reminders</Text>
                                </View>
                                <View style={{ flex: 0.30, justifyContent: 'flex-end' }} >

                                    <TouchableOpacity

                                        onPress={() => { this.props.navigation.navigate('CreateReminder') }}

                                    >

                                        <Image source={add} style={{ height: 30, width: 30, left: 10 }} />

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* box  */}
                        <View style={{ height: 195, width: 335 }}>
                            <View style={{
                                height: 188, width: 329, borderWidth: 0.5, borderRadius: 10,
                                marginLeft: 19, marginTop: 30, backgroundColor: 'white'
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{
                                        flex: 0.25, alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 24, marginTop: 24, marginLeft: -5, fontFamily: 'BalooBhai2-SemiBold',

                                        }}> You're Missing Reminders</Text>
                                    </View>
                                    {/* make  */}
                                    <View style={{
                                        flex: 0.25, alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{
                                            fontSize: 12, marginLeft: -15, marginTop: 35, fontFamily: 'BalooBhai2-SemiBold',

                                        }}>Make sure you've got notifications</Text>
                                        <Text style={{
                                            fontSize: 12, fontFamily: 'BalooBhai2-SemiBold', marginLeft: -5, marginTop: -5

                                        }}> turned on so you can
                                        always receive your reminders</Text>
                                    </View>
                                    {/* box in box  */}
                                    <View style={{
                                        flex: 0.50, alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <View style={{
                                            height: 47, width: 180, justifyContent: 'center',
                                            alignItems: 'center', borderRadius: 44, backgroundColor: '#E73A5E', marginTop: 10
                                        }}>
                                            <Text style={{
                                                fontSize: 17, fontFamily: 'BalooBhai2-SemiBold',
                                                color: 'white'
                                            }}>Update Settings</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* birthday box  */}
                        <View style={{ height: 95, width: 325 }}>
                            <View style={{
                                height: 89, width: 317, marginTop: 47, backgroundColor: 'white', borderRadius: 10,
                                borderWidth: 1, borderColor: 'lightgrey', marginLeft: 27
                            }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    {/* cake  */}
                                    <View style={{ flex: 0.20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={cake} style={{ height: 36, width: 36 }} />
                                    </View>
                                    {/* text  */}
                                    <View style={{ flex: 0.70, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{
                                            fontSize: 17, fontFamily: 'BalooBhai2-SemiBold',

                                        }}>Sundeep Gohil’s Birthday</Text>
                                        <Text style={{
                                            fontSize: 16, fontFamily: 'BalooBhai2-SemiBold', marginTop: -7,
                                            color: 'grey'
                                        }}>Thursday 12th August</Text>
                                        <Text style={{
                                            fontSize: 12, fontFamily: 'BalooBhai2-SemiBold', marginLeft: 3,
                                            color: 'grey'
                                        }}>288 days to go</Text>
                                    </View>
                                    {/* shop  */}
                                    {/* <View style={{ flex: 0.10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={{
                                            left: -20, top: -10,
                                            fontSize: 14, fontFamily: 'baloobhai2-bold',
                                            color: '#E8505B'
                                        }}>Shop</Text>
                                    </View> */}

                                    <View style={{
                                        flex: 0.10, alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            left: -20, top: 25,
                                            fontSize: 12, fontFamily: 'baloobhai2-bold',
                                            color: '#E8505B'
                                        }}>Shop</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        {/* anniversary  */}
                        <View style={{ height: 95, width: 325, marginTop: 70 }}>
                            <View style={{
                                height: 89, width: 317, backgroundColor: 'white', borderRadius: 10,
                                borderWidth: 1, borderColor: 'lightgrey', marginLeft: 27
                            }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    {/* cake  */}
                                    <View style={{ flex: 0.20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={an} style={{ height: 45, width: 32 }} />
                                    </View>
                                    {/* text  */}
                                    <View style={{ flex: 0.70, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{
                                            fontSize: 17, fontFamily: 'BalooBhai2-SemiBold',

                                        }}>Mum and Dad Anniversary</Text>
                                        <Text style={{
                                            fontSize: 16, fontFamily: 'BalooBhai2-SemiBold', marginTop: -7,
                                            color: 'grey'
                                        }}>Thursday 12th September</Text>
                                        <Text style={{
                                            fontSize: 12, fontFamily: 'BalooBhai2-SemiBold', marginLeft: 3,
                                            color: 'gray'
                                        }}>288 days to go</Text>
                                    </View>
                                    {/* shop  */}
                                    <View style={{ flex: 0.10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{
                                            left: -20, top: 25,
                                            fontSize: 12, fontFamily: 'baloobhai2-bold',
                                            color: '#E8505B'
                                        }}>Shop</Text>
                                    </View>
                                </View>
                            </View>
                        </View>



                    </View>
                </ScrollView>
            </View>
        );
    }
}
