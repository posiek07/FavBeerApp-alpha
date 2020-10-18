import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {FlatList} from 'react-native-gesture-handler';
import CardItem from '../components/CardItem';

import DefaultText from '../components/DefaultText';

const FavoriteScreen = (props) => {
  const beers = useSelector((state) => state.beers.beers);
  const beersFavRate = useSelector((state) => state.beers.beersFavRate);

  const favResult = beersFavRate
    .map((object) => object)
    .filter((object) => object.favorite === true)
    .map((object) => object.id);

  const favoriteBeers = beers.filter((beer) => {
    if (favResult.includes(beer.id)) {
      return beer;
    }
  });

  const navigationDetails = (id, name) =>
    props.navigation.navigate({
      routeName: 'BeerDetails',
      params: {
        beerId: id,
        beerTitle: name,
      },
    });

  const navigateToBeerDetails = useCallback(
    (id, name) => {
      navigationDetails(id, name);
    },
    [navigationDetails],
  );

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <DefaultText style={styles.header}>Your favorites</DefaultText>
          {favoriteBeers.length != 0 ? (
            <FlatList
              style={{margin: 3}}
              data={favoriteBeers}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={(itemData) => (
                <CardItem
                  navigation={() =>
                    navigateToBeerDetails(itemData.item.id, itemData.item.name)
                  }
                  item={itemData.item}
                />
              )}
              initialNumToRender={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          ) : (
            <DefaultText>
              Go back and add some beers to favorites first!
            </DefaultText>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

FavoriteScreen.navigationOptions = (navData) => {
  return {
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  header: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
    width: '100%',
  },

  columnWrapper: {
    minHeight: 300,
  },
});

export default FavoriteScreen;
