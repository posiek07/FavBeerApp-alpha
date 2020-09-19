import React, { useState, Fragment } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Avatar, Accessory } from 'react-native-elements';
import { useSelector } from 'react-redux';


const ProfileImagePicker = () => {
  const photo = useSelector(state => state.auth.photoURL)

  const [selectedImage, setSelectedImage] = useState({
    uri: photo ? photo : 'https://i2.wp.com/www.craftbeerjoe.com/wp-content/uploads/2018/01/brewdog-logo-crest.jpg?fit=885%2C1024&ssl=1',
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
    ImagePicker.showImagePicker(options, saveImageHandler);
  };

  const saveImageHandler = (response) => {
    if (response.error) {
      console.log('image error');
    } else {
      console.log('Image: ' + response.uri);
      setSelectedImage({ uri: response.uri });
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
