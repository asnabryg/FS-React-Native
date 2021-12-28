import { FlatList, View, StyleSheet } from "react-native";
import React, { useState } from 'react';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Order from "./Order";
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { setOrder, setFilter } = this.props;
    return (
      <Header
        setOrder={setOrder}
        setFilter={setFilter}
      />
    );
  };

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState();
  // console.log('repos', repositories);

  const [filter, setFilter] = useState('');
  const [filterValue] = useDebounce(filter, 500);

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
    direction,
    filterValue
  });

  return <RepositoryListContainer repositories={repositories} setOrder={setOrder} setFilter={setFilter} />;
};

const Header = ({ setOrder, setFilter }) => {
  return (
    <View>
      <Search setFilter={setFilter} />
      <Order setOrder={setOrder} />
    </View>
  );
};

const Search = ({ setFilter }) => {
  const [search, setSearch] = useState();
  const onChangeSearch = s => {
    setFilter(s);
    setSearch(s);
  };
  return (
    <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={search} />
  );
};

export default RepositoryList;