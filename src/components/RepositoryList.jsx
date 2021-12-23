import { FlatList, View, StyleSheet } from "react-native";
import React from 'react';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoriyNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoriyNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;