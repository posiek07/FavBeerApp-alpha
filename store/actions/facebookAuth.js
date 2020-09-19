import { AsyncStorage, Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (email, userId, token, photoURL, authClient) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId, token, email, photoURL, authClient });
  };
};

export const facebookLogIn = () => {
  return async (dispatch) => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }

    // Create a Firebase credential with the AccessToken

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );

    const token = await auth().currentUser.getIdToken();
    const { uid, email, photoURL } = await auth().currentUser
    const authClient = 'facebookSignIn'
    dispatch(
      authenticate(email, uid, token, photoURL, authClient),
    );
  };
};

// Sign-in the user with the credential


export const facebookLogout = () => {
  return async (dispatch) => {
    try {
      LoginManager.logOut()
      auth().signOut();
      dispatch(logout());
    } catch (err) {
      Alert.alert('Alert', err.message);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
