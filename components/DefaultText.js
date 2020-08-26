import React from 'react';
import {StyleSheet, Text} from 'react-native';

const DefaultText = (props) => {
  return (
    <Text style={{...styles.text, ...props.myStyle}}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});

export default DefaultText;
