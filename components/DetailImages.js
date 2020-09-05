import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import Card from './Card';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import ImagePicker from 'react-native-image-picker';
import {uploadImage, deleteImage} from '../hooks/useFirabeStorage';
import {TouchableHighlight} from 'react-native-gesture-handler';

const DetailImages = (props) => {
  const [imagesUrl, setImagesUrl] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);

  const {setImages} = props;

  const options = {
    title: 'Select photo',
    quality: 0.4,
    mediaType: 'photo',
    maxWidth: 1000,
    maxHeight: 1000,
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

  const saveImageHandler = async (response) => {
    try {
      setImgLoading(true);
      console.log('Image: ' + response.uri);
      const webUrl = await uploadImage(response.uri);

      setImagesUrl((prevState) => [...prevState, webUrl]);
    } catch (err) {
      console.log('image error');
    } finally {
      setImgLoading(false);
    }
    if (response.error) {
      console.log('image error');
    } else {
    }
  };

  const deleteImageHandler = async (url) => {
    const imgNameIndex = url.indexOf('image');
    const endImgNameIndex = url.indexOf('?');
    const imgName = url.slice(imgNameIndex, endImgNameIndex);
    try {
      setImgLoading(true);
      await deleteImage(imgName);
      setImagesUrl((prevState) =>
        prevState.filter((item) => {
          return item !== url;
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setImgLoading(false);
    }
  };

  useEffect(() => {
    setImages(imagesUrl);
  }, [setImages, imagesUrl]);

  return (
    <View style={styles.componentConteiner}>
      <Icon
        title="add-circle"
        name="add-circle"
        color={imagesUrl.length === 4 ? Colors.grey : Colors.primary}
        size={35}
        style={styles.floatingAddButton}
        onPress={imagesUrl.length === 4 ? () => {} : pickImageHandler}
      />
      <Card style={styles.imageDetailContainer}>
        {!imgLoading ? (
          imagesUrl.length === 0 ? (
            <Text style={styles.textContainer}>Add max. 4 images</Text>
          ) : (
            <View style={styles.imageContainer}>
              {imagesUrl.map((url) => (
                <TouchableHighlight
                  style={styles.imageWrapper}
                  onPress={() => deleteImageHandler(url)}>
                  <Image style={styles.image} source={{uri: url}} />
                </TouchableHighlight>
              ))}
            </View>
          )
        ) : (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}
      </Card>
    </View>
  );
};

export default DetailImages;

const styles = StyleSheet.create({
  componentConteiner: {
    width: '100%',
    // backgroundColor: '#ccc',
    overflow: 'visible',
  },
  imageDetailContainer: {
    height: 80,
    margin: 20,
    justifyContent: 'center',
    zIndex: 0,
  },
  textContainer: {
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageWrapper: {
    borderRadius: 10,
  },
  image: {
    width: 55,
    height: 55,
    backgroundColor: 'grey',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  floatingAddButton: {
    position: 'absolute',
    right: 3,
    bottom: 0,
    zIndex: 1,
    elevation: 7,
  },
});
