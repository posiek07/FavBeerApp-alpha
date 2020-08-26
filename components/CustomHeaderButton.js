import React from 'react';
import {StyleSheet} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeaderButton = (props) => {


  return <HeaderButton {...props} IconComponent={Icon} iconSize={23} />;
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
