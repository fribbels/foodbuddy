import {
  Camera,
  Video,
  FileSystem,
  Permissions,
} from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Image,
  Picker,
  Alert,
  Button,
  ScrollView,
  Dimensions,
  Vibration, TextInput
} from 'react-native';
import GalleryScreen from './GalleryScreen';
import { NavigationActions } from 'react-navigation'
import Prompt from 'rn-prompt';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

var windowHeight;
var rid;

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    promptVisible: false
  };

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      console.log(e, 'Directory exists');
    });

    windowHeight = Dimensions.get('window').height;
    rid = this.props.navigation.state.params.rid;
    console.log("******", this.props.navigation);
  }

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  submittedAlert() {
    Alert.alert(
      'Picture submitted',
      'Thanks!',
      [
        {text: 'OK', onPress: () => {
          this.props.navigation.dispatch(NavigationActions.back({
            key: null
          }))}, style: 'cancel'
        },
      ],
      { cancelable: false }
    )
  }

  takePicture = async function() {
    try {
        if (this.camera) {
            this.camera.takePictureAsync()
                .then((pic) => {
                  console.log(pic);

                  this.setState({ promptVisible: true, pic: pic })




                  // const data = new FormData();
                  // data.append('name', 'testName'); // you can append anyone.
                  // data.append('photo', {
                  //   uri: pic.uri,
                  //   type: 'image/jpeg', // or photo.type
                  //   name: 'testPhotoName'
                  // });


                  // fetch(url, {
                  //   method: 'post',
                  //   body: data
                  // }).then(body => {
                  //   console.log("done",res)
                  // });
                })
        }
      // if (this.camera) {
      //   this.camera.takePictureAsync().then(data => {
      //     FileSystem.moveAsync({
      //       from: data,
      //       to: `${FileSystem.documentDirectory}photos/Photo_${this.state
      //         .photoId}.jpg`,
      //     }).then(() => {
      //       this.setState({
      //         photoId: this.state.photoId + 1,
      //       });
      //       Vibration.vibrate();
      //     });
      //   });
      // }
    } catch (e) {
      console.log(e);
    }
  };

  renderGallery() {
    return <GalleryScreen onPress={this.toggleView.bind(this)} />;
  }

  onSubmit(value) {
    this.setState({
    promptVisible: false})

    var url = "https://foodbuddycloudapp.appspot.com/photo?rid=" + rid + "&dish_name="+value;


    const file = {
      uri: this.state.pic.uri,
      type: 'image/jpg',  // or photo.type
      name: 'testPhotoName'        // e.g. 'image/jpg'
    }

    const body = new FormData()
    body.append('file', file)

    fetch(url, {
      method: 'POST',
      body: body
    }).then(res => {
      console.log("done",res)
      this.submittedAlert()
    });
  }

  renderCamera() {
    console.log("RID", rid);
    return (
      <View style={{ flex:1, flexDirection:'column' }}>
        <Prompt
            title="What dish is it?"
            placeholder=""
            defaultValue=""
            visible={ this.state.promptVisible }
            onCancel={ () => this.setState({
              promptVisible: false,
              message: "You cancelled"
            }) }
            onSubmit={(value)=>this.onSubmit(value)}/>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
          }}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          focusDepth={this.state.depth}>
          <View
            style={{
              flex:0.9,
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.picButton,
                {position: 'absolute', bottom: 50, height: 50, width: 100, alignSelf: 'center'}
              ]}
              onPress={this.takePicture.bind(this)}>
              <Text style={styles.flipText}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showGallery ? this.renderGallery() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  row: {
    flexDirection: 'row',
  },
});

