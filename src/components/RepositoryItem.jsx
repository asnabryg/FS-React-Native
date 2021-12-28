import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 10,
  },
  top: {
    flexDirection: "row",
    maxWidth: 320,
    flexShrink: 1
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  language: {
    backgroundColor: "#0366d6",
    borderRadius: 5,
    color: "white",
    alignSelf: "flex-start",
    padding: 5,
    marginVertical: 5
  },
  text: {
    textAlign: "center"
  }
});

const RepositoryItem = ({ item }) => {

  const round = (n) => {
    return n >= 100
      ? Math.round(n / 100) / 10 + "k"
      : n;
  };

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View>
          <Text testID="name" fontSize="header" fontWeight="bold">{item.fullName} </Text>
          <Text testID="description" fontSize="subheading" color="textSecondary">{item.description}</Text>
          <Text testID="language" style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View>
          <Text testID="stars" fontWeight="bold" style={styles.text}>{round(item.stargazersCount)}</Text>
          <Text color="textSecondary" style={styles.text}>Stars</Text>
        </View>
        <View>
          <Text testID="forks" fontWeight="bold" style={styles.text}>{round(item.forksCount)}</Text>
          <Text color="textSecondary" style={styles.text}>Forks</Text>
        </View>
        <View>
          <Text testID="reviews" fontWeight="bold" style={styles.text}>{round(item.reviewCount)}</Text>
          <Text color="textSecondary" style={styles.text}>Reviews</Text>
        </View>
        <View>
          <Text testID="ratings" fontWeight="bold" style={styles.text}>{round(item.ratingAverage)}</Text>
          <Text color="textSecondary" style={styles.text}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;