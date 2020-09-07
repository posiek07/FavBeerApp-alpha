import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {fetchReviews} from '../store/actions/reviewActions';
import ReviewItem from '../components/ReviewItem';
import {SafeAreaView} from 'react-native-safe-area-context';

const ReviewsScreen = (props) => {
  const beerId = props.navigation.getParam('beerId');
  const beerName = props.navigation.getParam('beerName');

  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(beerId));
  }, []);

  console.log(beerId);
  console.log(reviews);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.ratingScreenContainer}>
        <Text style={styles.name}>{beerName}</Text>
        {!reviews ? null : (
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  ratingScreenContainer: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
  },
});
