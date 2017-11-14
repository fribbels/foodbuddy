import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

var restaurantData = [];
for (var i = 0; i < 15; i++) {
  restaurantData.push({
    id: i,
    image: "https://i.imgur.com/kml7A6s.png",
    name: "Restaurant",
    details: "Details"
  })
}

class Restaurants extends Component {
  onLearnMore = (restaurant) => {
    this.props.navigation.navigate('Details', { ...restaurant });
  };

  render() {
    return (
      <ScrollView>
        <List>
          {restaurantData.map((restaurant) => (
            <ListItem
              key={restaurant.id}
              roundAvatar
              avatar={{ uri: restaurant.image }}
              title={restaurant.name}
              subtitle={restaurant.details}
              onPress={() => this.onLearnMore(restaurant)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default Restaurants;