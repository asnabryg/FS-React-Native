import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row"
  },
  tabText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 20
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tabText}>Repositories</Text>
        </Link>

        <Link to="/signin">
          <Text style={styles.tabText}>SignIn</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;