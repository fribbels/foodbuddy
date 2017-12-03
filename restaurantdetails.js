import React, { Component } from 'react';
import { AppRegistry, ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

import { PhotoGrid } from './PhotoGrid';
const Cloud = require('./cloud');
var photos = []

class RestaurantDetails extends Component {
  render() {
    var restaurantData = this.props.navigation.state.params.data;

    for (var i = 0; i < 20; i++) {
      photos.push({'url': restaurantData.img_url});
    }

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
            title="Data"
            rightTitle={restaurantData.data}
            hideChevron
          />
          <ListItem
            title="Data"
            rightTitle={restaurantData.data}
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