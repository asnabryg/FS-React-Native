import { FlatList, View, StyleSheet } from "react-native";
import React, {useState} from 'react';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Order from "./Order";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export const RepositoryListContainer = ({ repositories, setOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <Header setOrder={setOrder}/>}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState();
  // console.log('repos', repositories);

  let orderBy = "CREATED_AT";
  let direction = "DESC";
  switch (order) {
    case "Latest":
      orderBy = "CREATED_AT";
      direction = "DESC";
      break;
    case 'Highest rated':
      orderBy = 'RATING_AVERAGE';
      direction = 'DESC';
      break;
    case 'Lowest rated':
      orderBy = 'RATING_AVERAGE';
      direction = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      direction = 'DESC';
      break;
  }

  const { repositories } = useRepositories({
    orderBy,
    direction
  });

  return <RepositoryListContainer repositories={repositories} setOrder={setOrder} />;
};

const Header = ({ setOrder }) => {
  return (
    <View>
      <Order setOrder={setOrder}/>
    </View>
  );
};

export default RepositoryList;