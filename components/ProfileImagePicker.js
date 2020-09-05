import React, {useState, Fragment} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Avatar, Accessory} from 'react-native-elements';


const ProfileImagePicker = ({onImagePicked}) => {
  const [selectedImage, setSelectedImage] = useState({
    uri:
      'https://www.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
  });

  const options = {
    title: 'Select Avatar',
    quality: 0.4,
    mediaType: 'photo',
    maxWidth: 800,
    maxHeight: 1500,
    allowsEditing: true,
    storageOptions: {
      cameraRoll: true,
      path: 'brewdog',
    },
  };

  const pickImageHandler = () => {
    console.log('picking');
    ImagePicker.showImagePicker(options, saveImageHandler);
  };

  const saveImageHandler = (response) => {
    if (response.error) {
      console.log('image error');
    } else {
      console.log('Image: ' + response.uri);
      setSelectedImage({uri: response.uri});
      //   onImagePicked({uri: response.uri});
    }
  };

  return (
    <Fragment>
      <View style={styles.imageContainer}>
        <Avatar
          onPress={pickImageHandler}
          rounded
          size="large"
          source={selectedImage}>
          <Accessory />
        </Avatar>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  //   imageContainer: {
  //     width: 100,
  //     height: 100,
  //     borderColor: 'black',
  //     borderWidth: 1,
  //     borderRadius: 30,
  //   },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileImagePicker;
