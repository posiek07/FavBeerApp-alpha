import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from './Input';

const formReducer = (state, action) => {
  if (action.type === 'INPUT_UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const DetailReview = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: '',
      description: '',
    },
    inputValidities: {
      title: false,
      description: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchForm({
        type: 'INPUT_UPDATE',
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [dispatchForm],
  );

  const {setComment} = props;
  const comment = formState.inputValues;
  const validity = formState.formIsValid;

  useEffect(() => {
    setComment(comment, validity);
  }, [setComment, comment, validity]);

  return (
    <View style={styles.inputContainer}>
      <Input
        id="title"
        label="Title"
        required
        errorText="Please enter title"
        onInputChange={inputChangeHandler}
        initialValue=""
      />
      <Input
        id="description"
        label="Description"
        required
        errorText="Please enter description"
        onInputChange={inputChangeHandler}
        initialValue=""
        numberOfLines={5}
        multiline={true}
      />
    </View>
  );
};

export default DetailReview;

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
  },
});
