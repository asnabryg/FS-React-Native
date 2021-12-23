import React from "react";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

const SignIn = () => {
  const [signIn] = useSignIn();

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {

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

  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;