import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,TextInput,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HaatiText from '../../assets/hatti.png';
import BackImage from '../../assets/backicon.png';
import RightImage from '../../assets/arrow_right.png';
import NetInfo from '@react-native-community/netinfo';

class Category extends Component {
  constructor(props) {
    super(props);
    global.userId = '';
    global.CategoryName = '';
    this.state = {
      searchresult: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(this.props.route.params);
    global.postId = this.props.route.params.postId;
    console.log(postId);
    global.CategoryName = this.props.route.params.categoryName;
    global.cardBgClr =
      global.CategoryName == 'For Her'
        ? '#FADCDE'
        : global.CategoryName == 'For Him'
        ? '#d8e4ff'
        : global.CategoryName == 'For Kids'
        ? '#fbefe3'
        : global.CategoryName == 'Cards'
        ? '#fbefe3'
        : global.CategoryName == 'Invitations'
        ? '#fdf2f7'
        : '#E8505B';
    global.bgClr =
      global.CategoryName == 'For Her'
        ? '#E8505B'
        : global.CategoryName == 'For Him'
        ? '#407BFF'
        : global.CategoryName == 'For Kids'
        ? '#EBB376'
        : global.CategoryName == 'Cards'
        ? '#EBB376'
        : global.CategoryName == 'Invitations'
        ? '#EF80B1'
        : '#FDF2F7';
    console.log(CategoryName);
    this.GetCategory();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  GetCategory() {
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(
          'https://haati.serverguy.cloud/rest/V1/category/post?id=' + postId,
          {
            method: 'POST',
          },
        )
          .then(response => response.json())
          .then(JsonResponse => {
            JsonResponse = JSON.parse(JsonResponse);
            console.log(JsonResponse);
            this.setState({
              searchresult: JsonResponse,
              isLoading: false,
            });
          });
      } else {
        this.setState({isLoading: false});
        Alert.alert('Alert', 'Please check your connection and try again.');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={HaatiText} style={styles.title}></Image>
          </View>
        </View>
        <View style={[styles.mainContainer, {backgroundColor: global.bgClr}]}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={styles.backContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.handleBackButton();
                }}>
                <Image
                  source={BackImage}
                  style={{
                    marginLeft: 28,
                  }}></Image>
              </TouchableOpacity>
              <Text style={styles.backText}>{CategoryName}</Text>
            </View>

            {/* <TextInput 
        ref={ref} 
        //your other code
    /> */}

            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: '30%'}}
              data={this.state.searchresult}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('CategoryCards', {
                      cardID: item.id,
                      splName: item.name,
                      cardBgClr: global.cardBgClr,
                    });
                  }}
                  style={[
                    styles.catContainer,
                    {backgroundColor: global.cardBgClr},
                  ]}>
                  <View style={styles.cardContainer}>
                    <View>
                      <Text style={styles.catName}>{item.name}</Text>
                    </View>

                    <View>
                      <Image source={RightImage}></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={hp('6%')} color={'red'} />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: hp('100%'),
  },
  headerContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
  },
  w30: {
    width: wp('30%'),
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    width: 100,
    height: 40,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-Regular',
    textAlign: 'center',
  },
  mainContainer: {
    // backgroundColor: global.bgClr, //#FDF2F7
    borderTopRightRadius: 44,
    width: wp('100%'),
    height: hp('100%'),
    paddingBottom: hp('5%'),
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backContainer: {
    height: hp('8.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  backText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-Regular',
    color: '#272525',
    marginLeft: 15,
  },
  catContainer: {
    // backgroundColor: global.cardBgClr, //#E8505B
    borderBottomWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  catName: {
    fontSize: 22,
    fontFamily: 'BalooBhai2-SemiBold',
  },
  cardContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('100%'),
    paddingLeft: 30,
    paddingRight: 30,
  },
});
export default Category;
