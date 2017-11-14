import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

var exampleRestaurant = {
  image: "https://www.omnihotels.com/-/media/images/hotels/bospar/restaurants/bospar-omni-parker-house-parkers-restaurant-1170.jpg",
  name: "Restaurant",
  caption: "Caption",
  data: "Data"
};

class RestaurantDetails extends Component {
  render() {
    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: exampleRestaurant.image}}
          featured
          title={exampleRestaurant.name}
          caption={exampleRestaurant.caption}
        />

        <List>
          <ListItem
            title="Data"
            rightTitle={exampleRestaurant.data}
            hideChevron
          />
          <ListItem
            title="Data"
            rightTitle={exampleRestaurant.data}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

export default RestaurantDetails;