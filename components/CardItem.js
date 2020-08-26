import React from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import {Card} from 'react-native-elements';

const CardItem = (props) => {
  return (
    <View style={styles.cardWrapper}>
      <Pressable
        onPress={() => {
          props.navigation();
        }}>
        <Card
          containerStyle={styles.containerStyle}
          key={props.item.id}
          title={props.item.name}
          titleStyle={styles.cardTitle}
          titleNumberOfLines={3}>
          <View style={styles.imageWrap}>
            <Image
              resizeMode="contain"
              source={{uri: props.item.image_url}}
              style={styles.image}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontFamily: 'Roboto-Italic'}}>
              {props.item.tagline}
            </Text>
          </View>
        </Card>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 3,
    margin: 5,
    flex: 1,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 200,
    width: '100%',
  },
  cardWrapper: {
    flex: 0.5,
    justifyContent: 'flex-start',
    margin: 0,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontFamily: 'Frijole-Regular',
    fontWeight: 'normal',
    fontSize: 15,
    minHeight: 65,
  },
});

export default CardItem;
