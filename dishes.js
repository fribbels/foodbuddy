import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';

var exampleDish = {
  image: "http://maxpixel.freegreatpicture.com/static/photo/1x/Cuisine-Food-Platter-Gourmet-Mediterranean-Dish-1759337.jpg",
  name: "Dish",
  caption: "Caption",
  data: "Data"
};

class Dishes extends Component {

  render() {
    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: exampleDish.image}}
          featured
          title={exampleDish.name}
          caption={exampleDish.caption}
        />

        <List>
          <ListItem
            title="data"
            rightTitle={exampleDish.data}
            hideChevron
          />
          <ListItem
            title="data"
            rightTitle={exampleDish.data}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

export default Dishes;