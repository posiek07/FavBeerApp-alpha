import React, {useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions/actions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from '../components/ListItem/ListItem';
import {NavigationActions} from 'react-navigation';

const RatedBeers = (props) => {
  const beers = useSelector((state) => state.beers.beers);
  const dispatch = useDispatch();

  const beersFavRate = useSelector((state) => state.beers.beersFavRate);

  const ratedBeers = [];

  for (let i = 0; i < beersFavRate.length; i++) {
    ratedBeers.push({
      ...beersFavRate[i],
      ...beers.find((beer) => beer.id === beersFavRate[i].id),
    });
  }

  ratedBeers.sort((a, b) => b.rating - a.rating);

  const fetchData = () => {
    dispatch(actions.fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <SafeAreaView>
        <FlatList
          style={{margin: 3}}
          data={ratedBeers}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <ListItem
              navigation={() =>
                navigateToBeerDetails(itemData.item.id, itemData.item.name)
              }
              item={itemData.item}
            />
          )}
          initialNumToRender={2}
        />
      </SafeAreaView>
    </>
  );
};

RatedBeers.navigationOptions = (navData) => {
  return {
    headerTitle: null,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="menu-outline"
          color="black"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default RatedBeers;
