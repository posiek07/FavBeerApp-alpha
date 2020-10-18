import React, {useEffect, useCallback, Fragment, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions/actions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
// import { FlatList } from 'react-native-gesture-handler';
import BeerHeader from '../components/BeerHeader';
import CardItem from '../components/CardItem';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const mainScreen = (props) => {
  const beers = useSelector((state) => state.beers.filteredBeers);
  const loading = useSelector((state) => state.beers.loading);
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(actions.fetchData());
  };
  const [flatlistRef, setFlatlistRef] = useState();

  useEffect(() => {
    fetchData();
  }, []);

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

  // let animation = new Animated.Value(0)

  // const interpolated = animation.interpolate({
  //   inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
  //   outputRange: [0, -15, 0, 15, 0, -15, 0]
  // })

  // const style = {
  //   transform: [
  //     { translateX: interpolated }
  //   ]
  // }

  // const triggerAnimation = () => {
  //   animation.setValue(0)
  //   Animated.timing(this.animation, {
  //     duration: 400,
  //     toValue: 3,
  //     ease: Easing.bounce
  //   }).start()
  // }

  const shakeButton = () => {
    // triggerAnimation()
    flatlistRef.scrollToOffset({animated: true, offset: 0});
  };

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
          <Fragment>
            <FlatList
              ref={(ref) => setFlatlistRef(ref)}
              ListHeaderComponent={BeerHeader}
              style={{margin: 3}}
              data={beers}
              numColumns={2}
              windowSize={5}
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
            {/* <Animated.View style={style, styles.button} > */}

            <Icon
              title="rating"
              name="chevron-up-circle-outline"
              color="black"
              size={40}
              style={styles.floatingHeartStyle}
              onPress={() => shakeButton()}
            />
            {/* </Animated.View> */}
          </Fragment>
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
          iconSize={30}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  // button: {
  //   position: 'absolute',
  //   marginLeft: '45%',
  //   bottom: 10,
  //   width: 50,
  //   height: 50,
  //   opacity: 0.7,
  //   zIndex: 3,

  // },
  columnWrapper: {
    minHeight: 300,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'absolute',
    marginLeft: '45%',
    bottom: 10,
    width: 50,
    height: 50,
    opacity: 0.7,
    zIndex: 3,
  },
});

export default mainScreen;
