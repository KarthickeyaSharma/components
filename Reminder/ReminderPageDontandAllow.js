

import React, { Component } from 'react';
import { View, Dimensions, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get("window");
import Image1 from '../assets/day.png';


export default class ReminderPageDontandAllow extends Component {
    render() {
        return (
            // whole screen
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>

                    {/* reminder */}

                    <View style={{ height: height / 100 * 12, justifyContent: 'center', flexDirection: 'column' }}>
                        <Text style={{
                            fontSize: 16, fontFamily: 'BalooBhai2-SemiBold',
                            marginLeft: 34, marginTop: 56, color: '#000000', 
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

                        {/* image */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                            <Image source={Image1} style={{
                                width: 202, height: 160

                            }} />
                        </View>
                        {/* text */}
                        <View style={{
                            height: 142, marginTop: 29, justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 36,fontFamily: 'BalooBhai2-SemiBold', 
                            }}>
                                Make a special
                        </Text>
                            <Text style={{
                                fontSize: 36,fontFamily: 'BalooBhai2-SemiBold', marginTop: -20
                            }}>
                                day even more
                        </Text>
                            <Text style={{
                                fontSize: 36,fontFamily: 'BalooBhai2-SemiBold', marginTop: -20
                            }}>
                                special
                        </Text>
                        </View>

                        {/* text */}

                        {/* <View style={{ width: 299, height: 52, marginTop: 18, marginLeft: 61 }}>
                            <Text style={{
                                fontSize: 17, fontFamily: 'Baloo Bhai 2', fontWeight: '600', marginLeft: 30, marginTop: 0
                            }}>
                                say goodbye to'sorry,
                        </Text>
                            <Text style={{
                                fontSize: 17, fontFamily: 'Baloo Bhai 2', fontWeight: '600', marginLeft: -25, marginTop: 0
                            }}>
                                I forget'with your reminders service!
                        </Text>
                        </View> */}

                        <View style={{
                            height: 62, justifyContent: 'center', alignItems: 'center',
                            marginTop: 10
                        }}>
                            {/* <Text style={{
                                fontSize: 17, fontFamily: 'Baloo Bhai 2', fontWeight: '600', marginLeft: 30, marginTop: 0
                            }}>
                                say goodbye to'sorry,
                        </Text>
                            <Text style={{
                                fontSize: 17, fontFamily: 'Baloo Bhai 2', fontWeight: '600', marginLeft: -25, marginTop: 0
                            }}>
                                I forget'with our reminders service!
                        </Text> */}

                            <Text style={{
                                fontSize: 17,fontFamily: 'BalooBhai2-Regular', 
                            }}>
                                Say goodbye to
                        </Text>
                            <Text style={{
                                fontSize: 17,fontFamily: 'BalooBhai2-Regular', marginTop: -5
                            }}>
                                'sorry I forget'
                        </Text>
                            <Text style={{
                                fontSize: 17,fontFamily: 'BalooBhai2-Regular', marginTop: -5
                            }}>
                                with your reminders service!
                        </Text>

                        </View>

                        {/* add reminder button */}
                        <TouchableOpacity 
                        
                        onPress={() => { this.props.navigation.navigate('CreateReminder') }}
                        
                        
                        style={{
                            width: 239, height: 49, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: '#E73A5E', borderRadius: 44, marginTop: 25, marginLeft : 60
                        }}>
                            <Text style={{
                                fontSize: 16, color: 'white'
                                ,fontFamily: 'BalooBhai2-SemiBold',
                            }}>
                                + Add a Reminder
                        </Text>
                        </TouchableOpacity>



                        <View style={{
                            height: 145, width: 320, borderColor: '#D47EAC'
                            , borderWidth: 1, borderRadius: 25,
                            backgroundColor: 'white', marginTop: 25, marginLeft : 20
                        }}>
                            <View style={{
                                flex: 0.30, flexDirection: 'row',
                                alignItems: 'center'
                            }}>

                                <Text style={{
                                    fontSize: 14, fontFamily: 'baloobhai2-bold',
                                    marginLeft: 30
                                }}>"HAATI"</Text>

                                <Text style={{ fontSize: 14, marginLeft: 5,fontFamily: 'BalooBhai2-Regular' }}>Would Like to Send You Notifications</Text>

                            </View>

                            <View style={{
                                flex: 0.30, flexDirection: 'column',
                                alignItems: 'center'
                            }}>

                                <Text style={{ fontSize: 14,fontFamily: 'BalooBhai2-Regular' }}>Notifications may include alerts, sounds and</Text>

                                <Text style={{ fontSize: 14,fontFamily: 'BalooBhai2-Regular' }}>icon badges. These can be configured in Settings.</Text>

                            </View>

                            <View style={{
                                flex: 0.40, flexDirection: 'row',
                                borderTopWidth: 0.5, borderTopColor: '#EF80B1', marginTop: 15
                            }}>

                                <View style={{
                                    flex: 0.50, flexDirection: 'row', borderRightWidth: 0.5, borderRightColor: '#EF80B1',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>

                                    <Text style={{
                                        fontSize: 14, fontFamily: 'baloobhai2-bold',
                                        color: '#EF80B1'
                                    }}>Don't Allow</Text>

                                </View>

                                <TouchableOpacity
                                
                                    style={{
                                        flex: 0.50, flexDirection: 'row',
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>

                                    <View style={{
                                        flex: 0.50, flexDirection: 'row',
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>


                                        <Text style={{
                                            fontSize: 14, fontFamily: 'baloobhai2-bold',
                                            color: '#EF80B1'
                                        }}>Allow</Text>

                                    </View>

                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>

                </ScrollView>
            </View >
        );
    }
}
