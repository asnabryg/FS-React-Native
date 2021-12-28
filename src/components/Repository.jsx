import React, { useState } from "react";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";
import { Pressable, View, StyleSheet, Linking, FlatList } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format, parseISO } from 'date-fns';

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: theme.colors.button,
    borderRadius: 5,
  },
  separator: {
    height: 10,
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10
  },
  rating: {
    borderRadius: 25,
    borderWidth: 2,
    height: 50,
    width: 50,
    borderColor: "#0366d6",
    textAlign: "center",
    margin: 10,
    paddingTop: 15,
  }
});

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const Repository = () => {
  const [repo, setRepo] = useState();
  const { id } = useParams();

  const item = useQuery(GET_REVIEWS, {
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

  const RepositoryInfo = () => {
    return (
      <View>
        <View>
          <RepositoryItem item={repo} />
        </View>
        <View style={{ backgroundColor: "white", marginBottom: 9 }}>
          <Pressable onPress={() => openGithub(repo.url)}>
            <Text style={styles.button}>Open in GitHub</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const ReviewItem = ({ review }) => {
    const date = format(parseISO(review.createdAt), "dd.MM.yyyy");
    return (
      <View style={styles.card}>
        <Text style={styles.rating} color="primary" fontWeight={"bold"}>{review.rating}</Text>
        <View style={{flexShrink: 1}}>
          <Text fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={repo.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={(item) => item.node.id}
        ListHeaderComponent={() => <RepositoryInfo repository={repo} />}
        ItemSeparatorComponent={ItemSeparator}
        />
    </View>
  );
};

export default Repository;