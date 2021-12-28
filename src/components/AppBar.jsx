import React, { useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { AUTHORIZED_USER } from "../graphql/queries";
import AuthStorage from "../contexts/AuthStorageContext";

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
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorage);
  let authUser = useQuery(AUTHORIZED_USER).data?.authorizedUser;
  console.log(authUser);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tabText}>Repositories</Text>
        </Link>

        {authUser
          ?
          <>
            <Link to="/review">
              <Text style={styles.tabText}>Create a review</Text>
            </Link>

            <Pressable onPress={signOut}>
              <Text style={styles.tabText}>Sign out</Text>
            </Pressable>
          </>
          :
          <>
            <Link to="/signin">
              <Text style={styles.tabText}>Sign in</Text>
            </Link>

            <Link to="/signup">
              <Text style={styles.tabText}>Sign up</Text>
            </Link>
          </>
          }
      </ScrollView>
    </View>
  );
};

export default AppBar;