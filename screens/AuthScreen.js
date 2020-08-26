import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/emailAuth';
import {googleLogIn, googleLogout} from '../store/actions/googleAuth';
import {facebookLogIn} from '../store/actions/facebookAuth';

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

const AuthScreen = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occuered', error, [{text: 'Okey'}]);
    }
    setError(null);
  });
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authHandler = async () => {
    let action;
    isSignUp
      ? (action = authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password,
        ))
      : (action = authActions.logIn(
          formState.inputValues.email,
          formState.inputValues.password,
        ));
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Beers', {
        logout: 'emailLogout',
      });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const googleAuthHandler = async () => {
    setError(null), setIsLoading(true);
    try {
      await dispatch(googleLogIn());
      props.navigation.navigate('Beers');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const facebookLoginHandler = async () => {
    setError(null), setIsLoading(true);
    try {
      await dispatch(facebookLogIn());
      props.navigation.navigate('Beers');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

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

  return (
    <ImageBackground
      source={require('../assets/image/brew-dog.png')}
      style={styles.imageBackground}>
      <View style={styles.screen}>
        <Card style={styles.cardContainer}>
          <ScrollView>
            <View style={styles.authContainer}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require('../assets/image/authLogo.png')}
                  style={styles.logoImage}
                />
              </View>
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter email adress."
                onInputChange={inputChangeHandler}
                initialValue=""
                secureTextEntry
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue=""
                secureTextEntry
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <Button
                    title={isSignUp ? 'Sign up' : 'Login'}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                  color={Colors.accent}
                  onPress={() => {
                    setIsSignUp((prevState) => !prevState);
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color="#DE5246"
                  title="Google Sign Up"
                  onPress={googleAuthHandler}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color="#4267B3"
                  title="Facebook Sign Up"
                  onPress={() => facebookLoginHandler()}
                />
              </View>
            </View>
          </ScrollView>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 500,
    padding: 20,
  },
  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoWrapper: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});

export default AuthScreen;
