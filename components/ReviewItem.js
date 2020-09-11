import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Card from './Card';
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';
import {TouchableHighlight} from 'react-native-gesture-handler';
import moment from 'moment';
import {Rating} from 'react-native-ratings';
import ReadMore from 'react-native-read-more-text';

const ReviewItem = (props) => {
  const dateMoment = moment(props.date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  console.log(props.rating);
  return (
    <View style={styles.reviewItemContainer}>
      <Card style={styles.reviewItemCardContainer}>
        <View style={styles.cardInnerWrapper}>
          <View style={styles.starsEmailContainer}>
            <View>
              <DefaultText style={styles.header}>email:</DefaultText>
              <DefaultText style={styles.textEmail}>{props.email}</DefaultText>
            </View>
            {props.rating ? (
              <View style={styles.allStarsContainer}>
                <View style={styles.starsContanier}>
                  <DefaultText style={styles.starTitle}>Recipe: </DefaultText>
                  <Rating
                    startingValue={props.rating.taste}
                    ratingBackgroundColor="#fcfcfc"
                    type="star"
                    imageSize={15}
                    readonly
                  />
                </View>
                <View style={styles.starsContanier}>
                  <DefaultText style={styles.starTitle}>Taste: </DefaultText>
                  <Rating
                    startingValue={props.rating.taste}
                    ratingBackgroundColor="#fcfcfc"
                    type="star"
                    imageSize={15}
                    readonly
                  />
                </View>
                <View style={styles.starsContanier}>
                  <DefaultText style={styles.starTitle}>Foam: </DefaultText>
                  <Rating
                    startingValue={props.rating.taste}
                    ratingBackgroundColor="#fcfcfc"
                    type="star"
                    imageSize={15}
                    readonly
                  />
                </View>
              </View>
            ) : null}
          </View>

          <DefaultText style={styles.text}>
            Review left on {dateMoment}
          </DefaultText>
          {props.images ? (
            <Card style={styles.imageDetailContainer}>
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
          <DefaultText style={styles.header}>Title:</DefaultText>
          <DefaultText style={styles.textTitle}>{props.title}</DefaultText>
          <DefaultText style={styles.header}>Description: </DefaultText>
          <ReadMore numberOfLines={3}>
            <Text style={styles.textDescription}>{props.description}</Text>
          </ReadMore>
        </View>
      </Card>
    </View>
  );
};

export default ReviewItem;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  reviewItemContainer: {
    width: windowWidth / 1.1,
    padding: 10,
  },
  cardInnerWrapper: {
    padding: 14,
  },
  reviewItemCardContainer: {
    width: '100%',
    marginBottom: 20,
  },
  starsEmailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  header: {
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    alignContent: 'flex-start',
    textAlign: 'left',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Roboto-Italic',
    textAlign: 'left',
  },
  textTitle: {
    fontFamily: 'Roboto-Italic',
    textAlign: 'left',
    fontSize: 17,
    marginBottom: 10,
  },
  textEmail: {
    fontFamily: 'Roboto-Bold',
    textAlign: 'left',
    fontSize: 14,
    color: Colors.primary,
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
  allStarsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 10,
  },
  starsContanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starTitle: {},
});
