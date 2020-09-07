import {AsyncStorage, Alert} from 'react-native';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (email, userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimes(expiryTime));
    dispatch({type: AUTHENTICATE, userId, token, email});
  };
};

GoogleSignin.configure({
  webClientId:
    '312581652530-5sporlckoqu91bteag3u57d352eitr34.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/firebase.database',
  ],
  returnSecureToken: true,
});

export const googleLogIn = () => {
  return async (dispatch) => {
    try {
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();
      const accessToken = await GoogleSignin.getTokens();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      dispatch(
        authenticate(user.email, user.id, accessToken.accessToken, 60000 * 60),
      );

      const expirationDate = new Date(new Date().getTime() + 60000 * 60);
      saveDataToStorage(
        user.email,
        user.id,
        accessToken.accessToken,
        expirationDate,
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('user cancelled the login flow');
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signin in progress');
        throw new Error('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('PLAY_SERVICES_NOT_AVAILABLE');
        throw new Error('play services not available or outdated');
      } else {
        throw new Error(error.code);
      }
    }
    return;
  };
};

let timer;

export const googleLogout = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.removeItem('userData');

      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
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
      logout: 'googleLogout',
    }),
  );
};
