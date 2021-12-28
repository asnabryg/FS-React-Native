import React, { useState } from "react";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { Pressable, View, StyleSheet, Linking } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: theme.colors.button,
    borderRadius: 5,
  }
});

const Repository = () => {
  const [repo, setRepo] = useState();
  const { id } = useParams();

  const item = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
    onCompleted: ({ repository }) => {
      setRepo(repository);
    }
  });

  if (item.loading || !repo) {
    return (
      <></>
    );
  }

  const openGithub = (url) => {
    Linking.openURL(url);
  };

  return (
    <View>
      <View>
        <RepositoryItem item={repo} />
      </View>
      <View style={{backgroundColor: "white"}}>
        <Pressable onPress={() => openGithub(repo.url)}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Repository;