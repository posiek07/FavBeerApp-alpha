import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import DetailRating from '../components/DetailRating';
import DetailImages from '../components/DetailImages';
import DetailReview from '../components/DetailReview';
import {useSelector, useDispatch} from 'react-redux';
import {updateRateFav} from '../store/actions/actions';
import Card from '../components/Card';

const RatingScreen = (props) => {
  const dispatch = useDispatch();

  const rateFavBeers = useSelector((state) => state.beers.beersFavRate);

  const beerId = props.navigation.getParam('beerId');
  const beerName = props.navigation.getParam('beerName');

  const selectedFavRate = rateFavBeers.find((object) => object.id === beerId);

  const [rating, setRating] = useState(
    selectedFavRate
      ? selectedFavRate.rating
      : {taste: null, foam: null, recipe: null},
  );

  const [images, setImages] = useState();

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

  console.log(rating);
  console.log(images);

  return (
    <ScrollView>
      <View style={styles.ratingScreenContainer}>
        <Text style={styles.name}>{beerName}</Text>
        <DetailRating
          setRating={setRatingHandler}
          rating={rating}
          beerName={beerName}
        />
        <Card style={styles.reviewImagesContainer}>
          <Text style={styles.headerText}>Your Review</Text>
          <DetailImages setImages={setImagesHandler} />
          <DetailReview />
        </Card>
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
});

export default RatingScreen;
