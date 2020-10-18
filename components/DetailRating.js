import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import DefaultText from './DefaultText';
import Card from './Card';

const DetailRating = (props) => {
  const { setRating } = props;
  const { rating } = props;
  const [recipeRating, setRecipeRating] = useState(
    rating.recipe ? rating.recipe : null,
  );
  const [tasteRating, setTasteRating] = useState(
    rating.taste ? rating.taste : null,
  );
  const [foamRating, setFoamRating] = useState(
    rating.foam ? rating.foam : null,
  );

  const toggleBeerRate = (score, ratingName) => {
    if (ratingName === 'recipe') {
      setRecipeRating(score);
    } else if (ratingName === 'taste') {
      setTasteRating(score);
    } else if (ratingName === 'foam') {
      setFoamRating(score);
    } else {
      return;
    }
  };

  useEffect(() => {
    setRating({
      recipe: recipeRating,
      taste: tasteRating,
      foam: foamRating,
    });
  }, [setRating, recipeRating, tasteRating, foamRating]);

  return (
    <View style={styles.detailRatingContainer}>
      <Card style={styles.cardContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Detailed Rating</Text>
        </View>
        <View style={styles.allStarsContainer}>
          <View style={styles.starsContanier}>
            <DefaultText style={styles.starTitle}>Recipe: </DefaultText>
            <Rating
              onFinishRating={(score) => toggleBeerRate(score, 'recipe')}
              fractions={1}
              startingValue={recipeRating}
              ratingBackgroundColor="#fcfcfc"
              type="star"
              imageSize={35}
            />
          </View>
          <View style={styles.starsContanier}>
            <DefaultText style={styles.starTitle}>Taste: </DefaultText>
            <Rating
              onFinishRating={(score) => toggleBeerRate(score, 'taste')}
              fractions={1}
              startingValue={tasteRating}
              ratingBackgroundColor="#fcfcfc"
              type="star"
              imageSize={35}
            />
          </View>
          <View style={styles.starsContanier}>
            <DefaultText style={styles.starTitle}>Foam: </DefaultText>
            <Rating
              onFinishRating={(score) => toggleBeerRate(score, 'foam')}
              fractions={1}
              startingValue={foamRating}
              ratingBackgroundColor="#fcfcfc"
              type="star"
              imageSize={35}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  detailRatingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  header: { alignItems: 'center' },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
  },
  allStarsContainer: {
    flexDirection: 'column',
    // backgroundColor: '#ccc',
    width: '100%',
  },
  starsContanier: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  starTitle: {
    fontSize: 23,
  },
  cardContainer: {
    marginTop: 20,
    width: '80%',
    maxWidth: 400,
    maxHeight: 500,
    padding: 20,
    backgroundColor: '#fcfcfc',
  },
});

export default DetailRating;
