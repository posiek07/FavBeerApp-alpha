import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/actions';
import {Slider, SearchBar} from 'react-native-elements';
import Colors from '../constants/Colors';

const BeerHeader = (props) => {
  const dispatch = useDispatch();

  const [abv, setAbv] = useState(15);
  const [search, setSearch] = useState('');

  const saveFilters = (text) => {
    const appliedFilters = {
      abv: abv,
      search: typeof text === 'string' ? text : search,
    };
    dispatch(setFilters(appliedFilters));
  };

  const updateSearch = (text) => {
    setSearch(text);
    saveFilters(text);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Choose BrewDog</Text>
      <View
        style={{
          flex: 1,
          width: 200,
          alignItems: 'stretch',
          justifyContent: 'center',
        }}>
        <Slider
          value={abv}
          onValueChange={(value) => setAbv(value)}
          minimumValue={0}
          maximumValue={15}
          step={0.5}
          thumbTintColor={Colors.primary}
        />
        <Text>Max ABV: {abv}%</Text>
        <Button color={Colors.primary} title="Apply" onPress={saveFilters} />
      </View>
      <SearchBar
        placeholder="What BrewDog you looking for?"
        onChangeText={(text) => updateSearch(text)}
        onClear={() => setSearch('')}
        value={search}
        containerStyle={{width: '100%'}}
        lightTheme={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Frijole-Regular',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});

export default BeerHeader;
