import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {Rating} from 'react-native-elements';
import {useSelector} from 'react-redux';

const ListItem = (props) => {
  const rateFavBeers = useSelector((state) => state.beers.beersFavRate);
  const beerId = props.item.id;

  const listItem = rateFavBeers.find((object) => object.id === beerId);

  return (
    <Pressable
      onPress={() => {
        props.navigation();
      }}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: props.item.image_url}} style={styles.image} />
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.title}>{props.item.name}</Text>
          <Text style={styles.tagline}>{props.item.tagline}</Text>
          <View>
            <Rating
              imageSize={20}
              readonly
              startingValue={listItem.rating}
              style={styles.rating}
              ratingBackgroundColor="#d6d6d6"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#d6d6d6',
    backgroundColor: '#fcfcfc',
  },
  imageWrapper: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  descriptionWrapper: {
    flex: 3,
    justifyContent: 'center',
    padding: 5,
  },
  title: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 12,
  },
  tagline: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#707070',
  },
  rating: {
    alignSelf: 'flex-start',
  },
});

export default ListItem;
