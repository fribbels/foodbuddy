import React, { Component } from 'react';
import { AppRegistry, ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

import { PhotoGrid } from './PhotoGrid';
const Cloud = require('./cloud');
var photos = []
var rid;

class RestaurantDetails extends Component {
  componentDidMount = function() {
    rid = this.props.navigation.state.params.data.id;
    fetch("https://foodbuddycloudapp.appspot.com/dishes?rid="+rid)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("RESP", responseData);
        photos = responseData;
        this.forceUpdate()
      })
      .done();
  };

  render() {
    var restaurantData = this.props.navigation.state.params.data;


    // var detailedData = Cloud.getRestaurantDetails(restaurantData.id);
    // console.log(detailedData);

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: restaurantData.img_url}}
          featured
          title={restaurantData.name}
          caption={restaurantData.categories.join(", ")}
        />

        <List>
          <ListItem
            title="Add Picture"
            onPress={(data) => {
              this.props.navigation.navigate('Camera', { rid });
            }}
            hideChevron
          />
        </List>


        <ScrollView>
          <PhotoGrid PhotosList={photos} borderRadius={10}/>
        </ScrollView>
      </ScrollView>
    );
  }
}

export default RestaurantDetails;