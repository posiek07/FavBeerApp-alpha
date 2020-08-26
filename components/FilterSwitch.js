import React from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import Colors from "../constants/Colors";

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        thumbColor={Platform.OS === "android" ? Colors.primary : ""}
        trackColor={{ true: Colors.primary }}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    margin: 15,
  },
});

export default FilterSwitch;
