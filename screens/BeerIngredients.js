import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import Card from '../components/Card';
import Malt from '../components/ingredients/Malt';
import Colors from '../constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';

const BeerIngredients = (props) => {
  const beerId = props.navigation.getParam('beerId');
  const avalibleBeers = useSelector((state) => state.beers.beers);

  const beer = avalibleBeers.find((beer) => beer.id === beerId);

  const totalMalt = beer.ingredients.malt.reduce((acc, object) => {
    return acc + object.amount.value;
  }, 0);

  const totalHops = beer.ingredients.hops.reduce((acc, object) => {
    return acc + object.amount.value;
  }, 0);

  const totalMashTime = beer.method.mash_temp.reduce((acc, object) => {
    return acc + object.duration;
  }, 0);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>Secret Ingredients</Text>

        {/* FERMENTABLES */}

        <Card style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitle}>Fermentables:</Text>
          </View>
          {beer.ingredients.malt.map((malt, index) => (
            <Text style={styles.ingredientsStyle} key={index}>
              {index + 1}. {malt.name} - {malt.amount.value} {malt.amount.unit}{' '}
              - {`${((malt.amount.value / totalMalt) * 100).toFixed(1)}%`}
            </Text>
          ))}
          <Text style={styles.totalTitle}>Total amount of fermentables:</Text>
          <Text style={styles.total}>{totalMalt.toFixed(2)} kilograms</Text>
        </Card>

        {/* HOPS */}

        <Card style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitle}>Hops:</Text>
          </View>
          {beer.ingredients.hops.map((hops, index) => (
            <Text style={styles.ingredientsStyle} key={index}>
              {index + 1}. {hops.name} - {hops.amount.value} {hops.amount.unit}{' '}
              - {`${((hops.amount.value / totalHops) * 100).toFixed(1)}%`}
            </Text>
          ))}
          <Text style={styles.totalTitle}>Total amount of hops:</Text>
          <Text style={styles.total}>{totalHops.toFixed(2)} grams</Text>
        </Card>

        {/* Yeast */}

        <Card style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitle}>Yeast:</Text>
          </View>
          <Text style={styles.ingredientsStyle}>
            "{beer.ingredients.yeast}"
          </Text>
        </Card>

        {/* Method */}

        <Card style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitle}>Prepering method:</Text>
          </View>
          <Text>Mash at:</Text>
          {beer.method.mash_temp.map((mash, index) => (
            <Text style={styles.ingredientsStyle} key={index}>
              {index + 1}. {mash.temp.value} {mash.temp.unit} for{' '}
              {mash.duration} min
            </Text>
          ))}

          <Text style={styles.ferment}>
            Please ferment at {beer.method.fermentation.temp.value}{' '}
            {beer.method.fermentation.temp.unit} degree
          </Text>
        </Card>

        {/* Tips */}

        <Card style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitle}>Brewers Tips:</Text>
          </View>
          <Text style={styles.ingredientsStyle}>"{beer.brewers_tips}"</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  cardTitle: {
    paddingBottom: 10,
    fontFamily: 'Frijole-Regular',
    fontSize: 20,
  },
  ingredientsStyle: {
    fontFamily: 'Roboto-Italic',
    fontSize: 16,
  },
  totalTitle: {
    paddingTop: 10,
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: Colors.accent,
  },
  total: {
    paddingTop: 2,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: Colors.primary,
  },
  title: {
    fontFamily: 'Frijole-Regular',
    fontSize: 33,
    margin: 20,
    textAlign: 'center',
  },
  ferment: {
    marginTop: 20,
    fontFamily: 'Roboto-Bold',
  },
});

BeerIngredients.navigationOptions = () => {
  return {
    headerTintColor: 'black',
  };
};
export default BeerIngredients;
