import React from "react";
import { View, StyleSheet } from "react-native";
import { Select, Option } from "react-native-chooser";

const Order = ({ setOrder }) => {
    const styles = StyleSheet.create({
        menu: {
            paddingHorizontal: 20,
            backgroundColor: 'white',
            margin: 10,
            height: 150,
            borderWidth: 0.5,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
        },
        backdrop: {
            backgroundColor: 'rgba(225, 228, 232, 0.7)'
        },
        box: {
            margin: 10,
            borderRadius: 5,
            borderColor: '#24292e'
        },
        text: {
            color: '#24292e'
        }
    });
    return (
        <View>
            <Select
                onSelect={(value) => setOrder(value)}
                defaultText="Order by:"
                optionListStyle={styles.menu}
                backdropStyle={styles.backdrop}
                style={styles.box}
                textStyle={styles.text}
                indicatorColor="#24292e"
                indicator="down"
                transparent
            >
                <Option value="Latest">Latest repositories</Option>
                <Option value="Highest rated">Highest rated repositories</Option>
                <Option value="Lowest rated">Lowest rated repositories</Option>
            </Select>
        </View>
    );
};

export default Order;