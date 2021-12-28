import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import * as yup from "yup";
import { Formik } from "formik";
import useSignUp from "../hooks/useSignup";
import useSignIn from "../hooks/useSignIn";
import Text from "./Text";
import theme from "../theme";
import FormikTextInput from "../components/FormikTextInput";

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

const SignUp = () => {
    const [signUp] = useSignUp();
    const history = useHistory();
    const [signIn] = useSignIn();

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(1, "The username is a required string with a length between 1 and 30")
            .max(30, "The username is a required string with a length between 1 and 30")
            .required("Username is required"),
        password: yup
            .string()
            .min(3, "The password is a required string with ar length between 5 and 50")
            .max(50, "The password is a required string with a length between 5 and 50")
            .required("Password is required"),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords doesn't match")
            .required("Password confirmation is required"),
    });

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signUp({ username, password });
            console.log(data);
            const { signInData } = await signIn({ username, password });
            console.log(signInData);
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={{ username: "", password: "", passwordConfirmation: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpFormik onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignUpFormik = ({ onSubmit }) => {
    return (
        <View style={{ backgroundColor: "white" }}>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput name='password' placeholder='Password' secureTextEntry />
            <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry />
            <Pressable onPress={onSubmit}>
                <Text style={styles.button}>Sign up</Text>    
            </Pressable>
        </View>
    );
};

export default SignUp;