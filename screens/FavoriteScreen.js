import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {FlatList} from 'react-native-gesture-handler';
import CardItem from '../components/CardItem';
import ImagePicker from 'react-native-image-picker';
import ProfileImagePicker from '../components/ProfileImagePicker';

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
    <View style={styles.container}>
      <SafeAreaView>
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
      </SafeAreaView>
    </View>
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

  columnWrapper: {
    minHeight: 300,
  },
});

export default FavoriteScreen;
