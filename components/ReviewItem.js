import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Card from './Card';
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';
import {TouchableHighlight} from 'react-native-gesture-handler';

const ReviewItem = (props) => {
  return (
    <Card style={styles.reviewItemContainer}>
      <View>
        <DefaultText>{props.email}</DefaultText>
        <DefaultText>{props.title}</DefaultText>
        <DefaultText>{props.description}</DefaultText>
        <DefaultText>{props.date}</DefaultText>
        {props.images ? (
          <Card style={styles.imageDetailContainer}>
            <DefaultText>Images</DefaultText>
            <View style={styles.imageContainer}>
              {props.images.map((url) => (
                <TouchableHighlight
                  style={styles.imageWrapper}
                  // onPress={() => deleteImageHandler(url)}
                >
                  <Image style={styles.image} source={{uri: url}} />
                </TouchableHighlight>
              ))}
            </View>
          </Card>
        ) : null}
      </View>
    </Card>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  reviewItemContainer: {
    width: '80%',
  },
  imageDetailContainer: {
    height: 80,
    margin: 20,
    justifyContent: 'center',
    zIndex: 0,
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
});
