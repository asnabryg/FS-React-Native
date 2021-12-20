import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5
  },
  errorInput: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.errorInput ,style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;