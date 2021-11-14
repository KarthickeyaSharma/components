import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NetInfo from "@react-native-community/netinfo";
import Image1 from '../assets/cake.png';
import Image2 from '../assets/glass.png';
import Image3 from '../assets/bangle.png';
import Image4 from '../assets/note.png';
import Image5 from '../assets/gift.png';
import Image6 from '../assets/mom.png';
import Image7 from '../assets/father.png';
import Image8 from '../assets/heart.png';
import Image9 from '../assets/smile.png';

export default class ReminderPageCategoriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchresult: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.ReminderList()
    }

    ReminderList() {
        this.setState({ isLoading: true });
        NetInfo.fetch().then((state => {
            fetch('https://haati.serverguy.cloud/rest/V1/getreminder/post?customer_id=8', {
                method: 'POST',
            }).then((response) => response.json())
                .then((JsonResponse) => {
                    JsonResponse = JSON.parse(JsonResponse)
                    console.log(JsonResponse)
                    this.setState({
                        searchresult: JsonResponse,
                        isLoading: false
                    }, () => {
                        console.log("Reminder:::::::::", this.state.searchresult)
                    })
                })
        }))
    }


    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: hp('10%') }}>
                    <Text style={{
                        fontSize: 16, fontFamily: 'BalooBhai2-SemiBold',
                        marginLeft: 34, marginTop: 25, color: '#000000', fontWeight: '600'
                    }}>
                        Reminder
                            </Text>
                </View>

                {/* box */}

                <View style={{ height: hp('90%'), backgroundColor: '#FDF2F7', borderTopRightRadius: 44 }}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: '30%' }}
                        style={{ height: hp('90%') }}
                        data={this.state.searchresult !== null && this.state.searchresult.length > 0 &&
                            this.state.searchresult}
                        renderItem={({ item }) =>

                            <View style={{
                                width: wp('80%'), height: hp('13%'), backgroundColor: '#FFFFFF',
                                marginTop: '8%', marginHorizontal: '10%'
                            }}>
                                <Text style={{
                                    fontFamily: 'BalooBhai2-SemiBold', fontSize: hp('2.7%'), marginLeft: '15%',
                                    marginTop: '2%'
                                }}>
                                    {item.first_name} {item.last_name} {item.occasion}</Text>
                                <Text style={{
                                    fontFamily: 'BalooBhai2-SemiBold', fontSize: hp('2.4%'), marginLeft: '15%', 
                                    color : 'gray', marginTop : '-1.5%'
                                }}>
                                    {item.event_date}</Text>
                            </View>
                        }
                    />
                </View>
                {this.state.isLoading ?
                    <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignSelf: 'center' }}>
                        <ActivityIndicator
                            size={hp('6%')}
                            color={'red'}
                        />
                    </View> : null}
            </View>

        )
    }
}
