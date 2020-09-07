import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import DetailRating from '../components/DetailRating';
import DetailImages from '../components/DetailImages';
import DetailReview from '../components/DetailReview';
import {useSelector, useDispatch} from 'react-redux';
import {updateRateFav} from '../store/actions/actions';
import {sendReview} from '../store/actions/reviewActions';
import Card from '../components/Card';
import {uploadImage} from '../hooks/useFirabeStorage';
import Colors from '../constants/Colors';
import {ActivityIndicator} from 'react-native-paper';

const RatingScreen = (props) => {
  const dispatch = useDispatch();

  const rateFavBeers = useSelector((state) => state.beers.beersFavRate);

  const email = useSelector((state) => state.auth.email);

  const beerId = props.navigation.getParam('beerId');
  const beerName = props.navigation.getParam('beerName');

  const selectedFavRate = rateFavBeers.find((object) => object.id === beerId);
  const [rating, setRating] = useState(
    selectedFavRate
      ? selectedFavRate.rating
      : {taste: null, foam: null, recipe: null},
  );
  const [images, setImages] = useState();
  const [comment, setComment] = useState();
  const [validity, setValidity] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const setRatingHandler = useCallback((rating) => {
    setRating(rating);
    dispatch(
      updateRateFav({
        id: beerId,
        rating: rating,
      }),
    );
  }, []);

  const setImagesHandler = useCallback((images) => {
    setImages(images);
  }, []);

  const setCommentHandler = useCallback((comment, isValid) => {
    setComment(comment);
    setValidity(isValid);
  }, []);

  const saveReviewHandler = async () => {
    const webUrls = [];
    setIsUploading(true);
    const asyncForEach = async (array, callback) => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    };
    const startUpload = async () =>
      asyncForEach(images, async (imageUrl) => {
        const webUrl = await uploadImage(imageUrl);
        webUrls.push(webUrl);
      });
    await startUpload();
    const review = {
      id: Math.random().toFixed(5) * 1000000,
      beerId: beerId,
      email: email,
      date: new Date(),
      rating: rating ? rating : null,
      comment: {
        title: comment.title,
        description: comment.description,
      },
      images: webUrls ? webUrls : null,
    };
    dispatch(sendReview(review));
    setIsUploading(false);
    setUploaded(true);
    console.log(review);
  };

  return (
    <ScrollView>
      <View style={styles.ratingScreenContainer}>
        <Text style={styles.name}>{beerName}</Text>
        <DetailRating
          setRating={setRatingHandler}
          rating={rating}
          beerName={beerName}
        />
        {isUploading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : !uploaded ? (
          <Card style={styles.reviewImagesContainer}>
            <Text style={styles.headerText}>Your Review</Text>
            <DetailImages setImages={setImagesHandler} />
            <DetailReview setComment={setCommentHandler} />
            <View style={styles.buttonContainer}>
              <Button
                title="Send review"
                color={validity ? Colors.primary : Colors.grey}
                onPress={validity ? saveReviewHandler : null}
              />
            </View>
          </Card>
        ) : (
          <Text style={styles.uploadText}>Review Posted!</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ratingScreenContainer: {
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
  },
  reviewImagesContainer: {
    width: '80%',
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
  },
  buttonContainer: {
    margin: 30,
    borderRadius: 10,
  },
  uploadText: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 20,
  },
});

export default RatingScreen;
