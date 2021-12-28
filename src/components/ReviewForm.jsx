
import React from "react";
import { useHistory } from "react-router-native";
import * as yup from "yup";
import useReview from "../hooks/useReview";
import { Formik } from "formik";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "../components/Text";
import FormikTextInput from "./FormikTextInput";
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

const ReviewForm = () => {
    const [reviewRepository] = useReview();
    const history = useHistory();

    const validationSchema = yup.object().shape({
        ownerName: yup.string().required("Repository's owner is required"),
        repositoryName: yup.string().required("Repository's name is required"),
        rating: yup.number().min(0).max(100).required("A rating is required"),
        text: yup.string()
    });

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;
        const ratingNumber = Number(rating);
        try {
            const { data } = await reviewRepository({ repositoryName, ownerName, rating: ratingNumber, text });
            console.log(data);
            history.push(`/${data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={{ repositoryName: "", ownerName: "", rating: "", text: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <ReviewFormik onSubmit={handleSubmit} />}
        </Formik>
    );
};

const ReviewFormik = ({ onSubmit }) => {
    return (
        <View style={{backgroundColor: "white"}}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput multiline name="text" placeholder="Review" />
            <Pressable onPress={onSubmit}>
                <Text style={styles.button}>Create review</Text>
            </Pressable>
        </View>
    );
};

export default ReviewForm;