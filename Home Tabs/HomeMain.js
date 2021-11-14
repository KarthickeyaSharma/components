import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert,
  StyleSheet,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import HaatiText from '../../assets/hatti.png';
import Search from '../../assets/search.png';
var firebaseanalytics = require('react-native-firebase-analytics');

class HomeMain extends Component {
  constructor(props) {
    super(props);
    global.catName = '';
    this.state = {
      searchresult: [],
      isLoading: true,
      searchtext: '',
      searchFindresult: [],
      search: [],
    };
  }

  componentDidMount() {
    this.CategoryList();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const currentScreen = this.props.route.name;
    if (currentScreen == 'Home') {
      Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  CategoryList() {
    // alert(1);
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(
          'https://haati.serverguy.cloud/rest/V1/app/home/category/post?id=2',
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

  BirthdayFn = item => {
    return (
      <View style={{height: 500, width: '100%', backgroundColor: 'red'}}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  changeText(searchtext) {
    if(searchtext!='')
    {
    console.log('one : '+this.state.searchresult[0].name);
    var dataResult = this.state.searchresult;
    dataResult.forEach((element, index) => {
      console.log(element.name);
      if(element.name=='For Her' ||element.name == 'For Him' || element.name == 'For Kids')
      {
      var items =
        element.name == 'For Her' ||
        element.name == 'For Him' ||
        element.name == 'For Kids'
          ? 'Birthday Cards ' + element.name
          : element.name == 'Cards'
          ? 'Other ' + element.name
          : element.name;
      dataResult[index].name = items;
      // console.log('Index : '+index);
      }
    });
   
    console.log('ssssssssssssssss', dataResult);
    let items = searchtext;
    if (items.length > 0) {
      if (this.state.searchresult != null) {
        this.setState({
          searchFindresult:  []
        },()=>
        {

          console.log(dataResult.filter(item =>
            item.name.toLowerCase().includes(items.toLowerCase()),
          ))
          this.setState({
            searchFindresult:  dataResult.filter(item =>
              item.name.toLowerCase().includes(items.toLowerCase()),
            ) 
          })
        })
       
        
        
        firebaseanalytics.logEvent('Category_Search', {
          'Searchtext': items,
          'Search_Result':  dataResult.filter(item =>
            item.name.toLowerCase().includes(items.toLowerCase()),
          ),
          'Searchtext_Length':searchtext.length,
        });
        this.setState({searchtext: searchtext});
      }
    } else {
      // this.state.search = [];
      this.CategoryList;
    }
    // this.setState({searchtext: searchtext});
  }
  else
  {
    this.setState({searchtext: searchtext});
    this.CategoryList;
  }
  }

  render() {
    return (
      // whole screen
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>Greeting Cards</Text>
          </View>
          <View
            style={{
              width: wp('40%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={HaatiText} style={styles.title}></Image>
          </View>
          <View style={styles.w30}>
            <Text style={{color: 'transparent'}}>Hello</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <Image source={Search} style={styles.searchImg} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={this.state.searchtext}
              onChangeText={text => this.changeText(text)}></TextInput>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '30%'}}
            data={
              this.state.searchtext.length > 0
                ? this.state.searchFindresult
                : this.state.searchresult
            }
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Category', {
                      postId: item.id,
                      categoryName: item.name,
                    });
                  }}
                  style={styles.catContainer}>
                  <Image
                    source={{uri: item.image_url}}
                    resizeMode={'stretch'}
                    style={styles.catImg}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
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
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: hp('100%'),
  },
  headerContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
  },
  w30: {
    width: wp('30%'),
    paddingLeft: 10,
    paddingRight: 10
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
    backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
    height: hp('100%'),
  },
  catContainer: {
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E8505B',
    flexDirection: 'row',
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    position: 'relative',
  },
  searchImg: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
    width: 20,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingLeft: 45,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  catImg: {
    width: '100%',
    height: hp('10%'),
  },
});
