import React from "react";
import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { Route, Switch, Redirect } from "react-router-native";
import SignIn from "./SignIn";
import Repository from "./Repository";
import ReviewForm from "./ReviewForm";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin" exact>
          <SignIn />
        </Route>

        <Route path="/review" exact>
          <ReviewForm />
        </Route>

        <Route path="/:id" exact>
          <Repository />
        </Route>

        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;