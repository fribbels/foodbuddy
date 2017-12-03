import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

import { 
  List, 
  ListItem
} from 'react-native-elements'

import { SearchBar } from 'react-native-elements'
import { ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const Row = require('./row');
const Cloud = require('./cloud');

const component1 = () => <Text>
                           Sort
                         </Text>
const component2 = () => <Text>Filter</Text>

var pressed = false;

var SORT_INDEX = 0;
var FILTER_INDEX = 1;

var restaurantData = [];
var loc = {};


navigator.geolocation.getCurrentPosition(function(data) {
  var lat = data.coords.latitude;
  var lng = data.coords.longitude;

  promise = Cloud.getRestaurantsList(lat, lng);

  promise.then(function(data) {
    // restaurantData = data._bodyInit;

    // this.setState({
    //   elements: this.props.elements,
    //   dataSource: this.state.dataSource.cloneWithRows(this.props.elements),
    //   data: data._bodyInit
    // })


    var arr = data._bodyInit;
  });

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
  },
  text: {
    marginLeft: 12,
    fontSize: 17,
    marginRight: 75
  },
  subtext: {
    marginLeft: 12,
    fontSize: 13,
    marginRight: 75
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  rightIcon: {
    marginRight: 0 
  }
});


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  };

  componentDidMount = function() {
    this.fetchData();
  };

  fetchGps = function(obj, callback) {
    navigator.geolocation.getCurrentPosition(callback);
  }

  fetchRestaurants = function(lat, lng) {
    fetch("https://foodbuddycloudapp.appspot.com/nearby?lat="+lat+"&long="+lng)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: ds.cloneWithRows(responseData),
        });
      })
      .done();
  }

  fetchData = function() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.setState({
          lat: lat,
          lng: lng,
        });

        this.fetchRestaurants(lat, lng);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  };

  render() {
    const buttons = [{ element: component1 }, { element: component2 }];
    console.log("len", restaurantData.length);

    // console.log("State", this.state.dataSource);

    return ([       

      <ListView
        key="sdf"
        contentContainerStyle={styles.contentContainer}
        dataSource={this.state.dataSource}
        renderRow={(props) => 
          <TouchableHighlight onPress={() => {this.onClick(props)}}>
            <View style={styles.container}>

              <Image source={{ uri: props.img_url}} style={styles.photo}/>
              <View style={{flex:1, flexDirection:'column'}}>
                <Text style={styles.text} numberOfLines={1}>
                  {`${props.name}`}
                </Text>
                <Text style={styles.subtext} numberOfLines={1}>
                  {(`${props.categories.join(", ")}`)}
                </Text>
              </View>
              <Icon name="angle-right" size={24} color="#C8C7CC" style={{position:'absolute',right:15}}/>
            </View>
          </TouchableHighlight>
        }
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />

    ]);
  };


  buttonGroupPress = (index) => {
    if (index == SORT_INDEX) {
      this.sortRestaurants();
      this.setState({reloading: true});
    } else if (index == FILTER_INDEX) {


    }
  };

  sortRestaurants = () => {
    restaurantData.sort(function(x, y) {
      if (x.name > y.name)
        return 1;
      else if (y.name > x.name)
        return -1;
      return 0;
    })
    this.render();
  };

  onClick = (data) => {
    console.log("nav", data);
    if (!pressed) {
      this.props.navigation.navigate('Details', { data });
    }

    // Fixes issue where you can click multiple list items quickly
    pressed = true;
    setTimeout(function() {
      pressed = false;
    }, 500);
  };

  searchTextChanged() {

  };

  searchTextCleared() {

  };
}

export default Restaurants;




