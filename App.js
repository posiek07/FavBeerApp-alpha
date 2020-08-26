import React from 'react';

import {StyleSheet} from 'react-native';
import codePush from 'react-native-code-push'
import NavigationContainer from './navigation/NavigationContainer';

const App = () => {
  return <NavigationContainer />;
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START
}

export default codePush(codePushOptions)(App);
