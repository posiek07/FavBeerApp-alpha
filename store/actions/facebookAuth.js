import {AsyncStorage, Alert} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (email, userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimes(expiryTime));
    dispatch({type: AUTHENTICATE, userId, token, email});
  };
};

export const facebookLogIn = () => {
  return async (dispatch) => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expirationTime) * 1000,
    );
    await auth().signInWithCredential(facebookCredential);
    const token = await auth().currentUser.getIdToken();
    const user = await auth().currentUser.uid;
    const email = await auth().currentUser.email;
    saveDataToStorage(email, user, token, expirationDate);

    dispatch(
      authenticate(email, user, token, parseInt(data.expirationTime) * 1000),
    );
  };
};

// Sign-in the user with the credential

let timer;

export const facebookLogout = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.removeItem('userData');
      auth().signOut();
      dispatch(logout());
    } catch (err) {
      Alert.alert('Alert', err.message);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    clearLogoutTimer();
    dispatch({type: LOGOUT});
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimes = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(googleLogout());
    }, expirationTime);
  };
};

const saveDataToStorage = (email, userId, token, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      email: email,
      token: token,
      userId: userId,
      expirationDate: expirationDate.toISOString(),
      logout: 'facebookLogout',
    }),
  );
};
