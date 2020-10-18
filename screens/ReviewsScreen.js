import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {fetchReviews} from '../store/actions/reviewActions';
import ReviewItem from '../components/ReviewItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const ReviewsScreen = (props) => {
  const beerId = props.navigation.getParam('beerId');
  const beerName = props.navigation.getParam('beerName');

  const reviews = useSelector((state) => state.reviews.reviews);
  const loading = useSelector((state) => state.reviews.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(beerId));
  }, []);


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.ratingScreenContainer}>
        <View style={styles.reviewTitle}>
          <Text style={styles.name}>{beerName}</Text>
          <Text style={styles.name}>Reviews</Text>
        </View>
        {loading ? (
          <ActivityIndicator color={Colors.primary} size="large" />
        ) : reviews ? (
          <FlatList
            data={Object.keys(reviews)}
            renderItem={({item}) => (
              <ReviewItem
                title={reviews[item].comment.title}
                description={reviews[item].comment.description}
                email={reviews[item].email}
                date={reviews[item].date}
                images={reviews[item].images}
                rating={reviews[item].rating}
              />
            )}
          />
        ) : (
          <Text>No Reviews</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  ratingScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 50,
  },
  name: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
    width: '80%',
  },
  reviewTitle: {
    width: '100%',
    backgroundColor: Colors.accent,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
