import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';


import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

var exampleDish = {
  image: "http://maxpixel.freegreatpicture.com/static/photo/1x/Cuisine-Food-Platter-Gourmet-Mediterranean-Dish-1759337.jpg",
  name: "Dish",
  caption: "Caption",
  data: "Data"
};

class CameraScreen extends Component {
  render() {
    return (

      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

export default CameraScreen;