import { Alert } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (email, userId, token, photoURL, authClient) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId, token, email, photoURL, authClient });
  };
};

GoogleSignin.configure({
  webClientId:
    '312581652530-5sporlckoqu91bteag3u57d352eitr34.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  returnSecureToken: true,
});

export const googleLogIn = () => {
  return async (dispatch) => {
    try {
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const { idToken, user } = await GoogleSignin.signIn();
      const accessToken = await GoogleSignin.getTokens();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      const authClient = 'googleSignIn'
      dispatch(
        authenticate(user.email, user.id, accessToken.accessToken, user.photo, authClient),
      );

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('User cancelled the login flow');
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signin in progress');
        throw new Error('Operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('PLAY_SERVICES_NOT_AVAILABLE');
        throw new Error('Play services not available or outdated');
      } else {
        throw new Error(error.code);
      }
    }
    return;
  };
};


export const googleLogout = () => {
  return async (dispatch) => {
    try {
      auth().signOut();
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
    dispatch({ type: LOGOUT });
  };
};

