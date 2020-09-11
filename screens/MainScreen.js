import React, {useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions/actions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {FlatList} from 'react-native-gesture-handler';
import BeerHeader from '../components/BeerHeader';
import CardItem from '../components/CardItem';
import Colors from '../constants/Colors';

const mainScreen = (props) => {
  const beers = useSelector((state) => state.beers.filteredBeers);
  const loading = useSelector((state) => state.beers.loading);
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(actions.fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(loading);

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
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.centered}
          />
        ) : (
          <FlatList
            ListHeaderComponent={BeerHeader}
            style={{margin: 3}}
            data={beers}
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
        )}
      </SafeAreaView>
    </>
  );
};

mainScreen.navigationOptions = (navData) => {
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

const styles = StyleSheet.create({
  columnWrapper: {
    minHeight: 300,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default mainScreen;
