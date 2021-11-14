import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Fontisto';
import HaatiText from '../../assets/hatti.png';
import Search from '../../assets/search.png';
var firebaseanalytics = require('react-native-firebase-analytics');

//Flat List Start
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      key: 'blank-${numberOfElementsLastRow}',
      empty: true,
    });

    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }

  return data;
};

const numColumns = 2;
////Flat List END
class CategoryCards extends Component {
  constructor(props) {
    super(props);
    global.CardsID = '';
    this.state = {
      searchresult: [],
      isLoading: true,
      searchtext: '',
      search: [],
      searchFindresult: [],
      refreshing: false,
      page: 0,
      endPage: 10,
    };
  }

  componentDidMount() {
    CardsID = this.props.route.params.cardID;
    console.log('Category ID ::: ', CardsID);
    console.log(global.CategoryName);
    this.CategoryList();
    console.log('Token ::::: ', global.token);
    console.log(global.customer_id_new);
    console.log('bgClr', this.props.route.params.cardBgClr);
  }

  CategoryList() {
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/category/product/post?id=' +
          CardsID +
          '&limit=' +
          this.state.page +
          ',' +
          this.state.endPage,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          setTimeout(() => {
            console.log(JsonResponse);
            JsonResponse = JSON.parse(JsonResponse);
            console.log(JsonResponse);

            this.setState({
              searchresult: [...this.state.searchresult, ...JsonResponse],
              isLoading: false,
            });
          }, 100);
        });
    });
  }

  gotoCardSelection(skuName) {
    global.skuCName = skuName;
    this.props.navigation.navigate('Customization', {
      skuName: skuName,
    });
  }

  renderItem = ({item, index}) => {
    // debugger;
    // if (item.empty === true) {
    //   return <View style={[s.item, s.iteminvisible]} />;
    // }
    // else
    // {
      console.log(item.name);
     if(item!=[])  
     {
      if(item.name!=undefined)  
      {
    return (
      <View style={styles.cardContainer}>
        
        <TouchableOpacity
          onPress={() => {
            this.gotoCardSelection(item.sku);
          }}
          style={{flex: 1, flexDirection: 'column'}}>
          <Image
            source={{uri: item.image}}
            resizeMode={'stretch'}
            style={{flex: 1, borderRadius: 10}}
          />
        </TouchableOpacity>
        <View style={styles.cardText}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.cardText}>
          <TouchableOpacity onPress={() => this.wishList(item.id)}>
            <Icon
              name={'heart-alt'}
              size={wp('7%')}
              type={'fontisto'}
              color={'#E280AA'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
    }
  }
  };

  _onRefresh = () => {
    if (this.state.searchtext != '') {
      this.setState(
        state => ({refreshing: true, page: 0, endPage: 10}),
        () => {
          this.endScroll = false;
          this.Search(this.state.searchtext);
          this.setState({refreshing: false});
        },
      );
    } 
    else {
    this.setState(
      state => ({refreshing: true, page: 0, endPage: 10}),
      () => {
        this.endScroll = false;
        this.CategoryList();
        this.setState({refreshing: false});
      },
    );
    }
  };

  handleLoadMore = () => {
    if (!this.endScroll) {
      console.log('handleEnd');

      if (this.state.searchtext != '') {
        this.setState(
          state => ({
            page: this.state.page + 10,
            endPage: 10,
          }),
          () => this.Search(this.state.searchtext),
        );
      } 
      else {
        this.setState(
          state => ({
            page: this.state.page + 10,
            endPage: this.state.endPage + 10,
          }),
          () => this.CategoryList(),
        );
      }
    }
  };

  changeText(searchtext) {
    // alert(searchtext);

    if (searchtext == '') {
      this.setState({searchtext: searchtext,page:0,endPage:10,searchresult:[]},()=>
      {
        this.CategoryList();
      });
      
    } else {
      this.setState({searchtext: searchtext,page:0,endPage:10,searchresult:[]},()=>
      {
        this.Search(searchtext);
      });
    
    }
  }
  Search=(searchtext)=>
  {
    // alert(searchtext);
    console.log('https://haati.serverguy.cloud/rest/V1/product/search/post?name=' +
    searchtext+
    '&limit=' +
    this.state.page +
    ',' +
    this.state.endPage);
    this.setState({searchtext: searchtext});
    this.setState({isLoading: true});
    NetInfo.fetch().then(state => {
      fetch(
        'https://haati.serverguy.cloud/rest/V1/product/search/post?name=' +
          searchtext+
          '&limit=' +
          this.state.page +
          ',' +
          this.state.endPage,
        {
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(JsonResponse => {
          setTimeout(() => {
            console.log(JsonResponse);
            JsonResponse = JSON.parse(JsonResponse);
            console.log(JsonResponse);
            firebaseanalytics.logEvent('Category_Search', {
              'Searchtext': searchtext,
              'SearchResult':  JsonResponse,
              'Searchtext_Length':searchtext.length,
            });
            if(this.state.page==0)
            {
              this.setState({
                searchresult: JsonResponse,
                isLoading: false,
              });
            }
            else
            {
            this.setState({
              searchresult: [...this.state.searchresult, ...JsonResponse],
              isLoading: false,
            }); 
          }
          }, 100);
        });
    });
  }

  wishList(id) {
    console.log('Token ::::: ', global.token);
    if (global.token == undefined) {
      this.setState({isLoading: false});
      Alert.alert('Alert', 'Please Login Before Select Card', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('WishlistLogin'),
        },
      ]);
    } else {
      console.log(global.customer_id_new);
      NetInfo.fetch().then(state => {
        fetch(
          'https://haati.serverguy.cloud/rest/V1/wishlist/add?customer_id=' +
            global.customer_id_new +
            '&product_id=' +
            id,
          {
            method: 'POST',
          },
        )
          .then(response => response.json())
          .then(data => {
            var result = JSON.parse(data);
            console.log('Message', result.Message);
            if (result.Message == 'Wishlist Added succesfully') {
              ToastAndroid.show(result.Message, ToastAndroid.SHORT);
            }
          });
      });
    }
  }

  render() {
    return (
      // whole screen
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.w30}>
            <Text style={styles.mainText}>{global.CategoryName}</Text>
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
        <View style={[styles.mainContainer, {backgroundColor: '#FDF2F7'}]}>
          {/* <View style={styles.searchContainer}>
            <Image source={Search} style={styles.searchImg} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={this.state.searchtext}
              onChangeText={text => this.changeText(text)}></TextInput>
          </View> */}

          <FlatList
            data={formatData(this.state.searchresult, numColumns)}
            renderItem={this.renderItem}
            numColumns={numColumns}
            keyExtractor={(x, i) => `list-item-${i}`}
            onEndReached={() => this.handleLoadMore()}
            onEndReachedThreshold={0.1}
            scrollEventThrottle={1}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            contentContainerStyle={{paddingBottom: '40%'}}
          />
        </View>
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={hp('6%')} color={'red'} />
          </View>
        ) : null}
      </SafeAreaView>
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
    justifyContent: 'space-between',
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
    // backgroundColor: '#FDF2F7',
    borderTopRightRadius: 44,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: wp('100%'),
    height: hp('100%'),
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
  cardContainer: {
    width: wp('45%'),
    height: hp('45%'),
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  cardText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 10,
  },
});
export default CategoryCards;
