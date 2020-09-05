import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultText from '../components/DefaultText';
import {Rating} from 'react-native-elements';
import {updateRateFav} from '../store/actions/actions';
import Card from '../components/Card';

const dimensions = Dimensions.get('screen');

const BeerDetails = (props) => {
  const dispatch = useDispatch();

  const avalibleBeers = useSelector((state) => state.beers.beers);
  const rateFavBeers = useSelector((state) => state.beers.beersFavRate);

  const beerId = props.navigation.getParam('beerId');

  const selectedBeer = avalibleBeers.find((beer) => beer.id === beerId);

  const selectedFavRate = rateFavBeers.find((object) => object.id === beerId);

  const [rating, setRating] = useState(
    selectedFavRate ? selectedFavRate.rating : null,
  );

  const [favorite, setFavorite] = useState(
    selectedFavRate ? selectedFavRate.favorite : null,
  );

  const toggleBeerFav = (status) => {
    setFavorite((prevState) => !prevState);
    dispatch(
      updateRateFav({
        id: selectedBeer.id,
        favorite: status,
      }),
    );
  };

  const toggleBeerRate = (score) => {
    setRating(score);
    dispatch(
      updateRateFav({
        id: selectedBeer.id,
        rating: score,
      }),
    );
  };

  const reciepeNavigationHandler = () => {
    props.navigation.navigate({
      routeName: 'BeerIngredients',
      params: {
        beerId: beerId,
      },
    });
  };

  const ratingNavigationHandler = () => {
    props.navigation.navigate({
      routeName: 'BeerReview',
      params: {
        beerId: beerId,
        beerName: selectedBeer.name,
      },
    });
  };

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: selectedBeer.image_url}} style={styles.image} />
        </View>

        <View style={styles.descriptionWrapper}>
          <ScrollView>
            <Text style={styles.name}>{selectedBeer.name}</Text>
            <Text style={styles.tagline}>"{selectedBeer.tagline}"</Text>
            <View>
              <Rating
                showRating
                onFinishRating={(score) => toggleBeerRate(score)}
                fractions={1}
                startingValue={rating}
                ratingBackgroundColor="#fcfcfc"
                type="custom"
              />
            </View>
            <DefaultText myStyle={styles.bigDetailsTitle}>ABV:</DefaultText>
            <Text style={styles.bigDetailsValue}>
              <Icon
                title="flash"
                name="flash-outline"
                color={Colors.primary}
                size={35}
              />
              {selectedBeer.abv}%
            </Text>
            <DefaultText myStyle={styles.bigDetailsTitle}>
              First Brewed:
            </DefaultText>
            <DefaultText myStyle={styles.bigDetailsValue}>
              <Icon
                title="today"
                name="today-outline"
                color={Colors.primary}
                size={35}
              />
              {selectedBeer.first_brewed}
            </DefaultText>
            <Card style={styles.card}>
              <DefaultText myStyle={styles.descriptionTitle}>
                Description:
              </DefaultText>
              <DefaultText>{selectedBeer.description}</DefaultText>
            </Card>
            <Card style={styles.card}>
              <DefaultText myStyle={styles.descriptionTitle}>
                Food Pairing:
              </DefaultText>
              {selectedBeer.food_pairing.map((food, index) => (
                <DefaultText key={index}>
                  {index + 1}. {food}
                </DefaultText>
              ))}
            </Card>
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.1}
        style={styles.TouchableOpacityStyle}>
        <Icon
          title="rating"
          name="star-half-outline"
          color="orange"
          size={35}
          style={styles.floatingReceiptStyle}
          onPress={ratingNavigationHandler}
        />
        <Icon
          title="receipe"
          name="receipt-outline"
          color="black"
          size={35}
          style={styles.floatingReceiptStyle}
          onPress={reciepeNavigationHandler}
        />
        {!favorite ? (
          <Icon
            title="heart"
            name="heart-outline"
            color="salmon"
            size={35}
            style={styles.floatingHeartStyle}
            onPress={() => toggleBeerFav(!favorite)}
          />
        ) : (
          <Icon
            title="heart"
            name="heart"
            color="salmon"
            size={35}
            style={styles.floatingHeartStyle}
            onPress={() => toggleBeerFav(!favorite)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // layout: {backgroundColor: '#fcfcfc'},
  container: {
    backgroundColor: '#fcfcfc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    paddingTop: 50,
    maxHeight: dimensions.height / 1.3,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  image: {
    height: '100%',
    alignItems: 'flex-start',
    resizeMode: 'contain',
  },
  descriptionWrapper: {
    paddingTop: 50,

    flex: 2,
  },
  name: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
  },
  tagline: {
    fontFamily: 'Roboto-Italic',
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
    color: Colors.grey,
  },
  bigDetailsValue: {
    textAlign: 'center',
    fontSize: 35,

    marginBottom: 20,
  },
  bigDetailsTitle: {
    fontSize: 20,
    paddingTop: 15,
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  descriptionTitle: {
    fontFamily: 'Roboto-Bold',
    paddingBottom: 10,
  },
  description: {},
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    right: 7,
    top: 7,
  },

  floatingHeartStyle: {
    marginLeft: 60,
    width: 32,
    height: 50,
    opacity: 0.7,
    //backgroundColor:'black'
  },
  floatingReceiptStyle: {
    marginLeft: 60,
    width: 32,
    height: 50,
    opacity: 0.7,
  },
});

BeerDetails.navigationOptions = (navigationData) => {
  const beerTitle = navigationData.navigation.getParam('beerTitle');

  return {
    // headerTitle: beerTitle,
    headerTintColor: 'black',
    headerTransparent: true,
    headerStyle: {backgroundColor: '#fcfcfc'},
  };
};

export default BeerDetails;
