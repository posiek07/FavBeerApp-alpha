import React, {useEffect, useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  useWindowDimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import ListItem from '../components/ListItem/ListItem';
import {NavigationActions} from 'react-navigation';
import DefaultText from '../components/DefaultText';
import {fetchRatingsScreen} from '../store/actions/reviewActions';
import {ButtonGroup} from 'react-native-elements';

const buttons = ['Foam', 'Taste', 'Recipe'];

const RatedBeers = (props) => {
  useEffect(() => {
    dispatch(fetchRatingsScreen());
  }, [dispatch, fetchRatingsScreen]);

  const [index, setIndex] = useState(1);

  const beers = useSelector((state) => state.beers.beers);
  const ratings = useSelector((state) => state.reviews.ratings);

  const newRatedBeers = [];
  for (let i = 0; i < ratings.length; i++) {
    newRatedBeers.push({
      ...ratings[i],
      ...beers.find((beer) => beer.id == ratings[i].id),
    });
  }

  let sorting;

  if (index === 0) {
    newRatedBeers.sort((a, b) => b.foam - a.foam);
  } else if (index === 1) {
    newRatedBeers.sort((a, b) => b.taste - a.taste);
  } else {
    newRatedBeers.sort((a, b) => b.recipe - a.recipe);
  }

  // const [sortedRatings, setSortedRatings] = useState(newRatedBeers);

  const dispatch = useDispatch();


  const navigationDetails = (id, name) => {
    props.navigation.navigate({
      routeName: 'Beers',
      action: NavigationActions.navigate({
        routeName: 'BeerDetails',
        params: {
          beerId: id,
          beerTitle: name,
        },
      }),
    });
  };

  const navigateToBeerDetails = useCallback(
    (id, name) => {
      navigationDetails(id, name);
    },
    [navigationDetails],
  );

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View>
          <DefaultText style={styles.header}>
            Brew Your Dog Brewers Ranking
          </DefaultText>
          <ButtonGroup
            onPress={setIndex}
            selectedIndex={index}
            buttons={buttons}
            containerStyle={{height: 50}}
          />
        </View>
        <FlatList
          style={{margin: 3}}
          data={newRatedBeers}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => {
            if (index === 0) {
              sorting = itemData.item.foam;
            } else if (index === 1) {
              sorting = itemData.item.taste;
            } else {
              sorting = itemData.item.recipe;
            }
            return (
              <ListItem
                navigation={() =>
                  navigateToBeerDetails(itemData.item.id, itemData.item.name)
                }
                item={itemData.item}
                rating={sorting}
              />
            );
          }}
          initialNumToRender={2}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
    width: '100%',
  },
});

RatedBeers.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="menu-outline"
          color="black"
          iconSize={30}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default RatedBeers;
