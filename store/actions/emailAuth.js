import { AsyncStorage } from 'react-native';
import auth from '@react-native-firebase/auth';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (email, userId, token, photoURL, authClient) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId, token, email, photoURL, authClient });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const userCredential = auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          throw new Error('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          throw new Error('That email address is invalid!');
        }

        console.error(error);
      });
    const emailCredentials = await auth.EmailAuthProvider.credential(
      userCredential,
    );

    let currentUser;

    auth().onAuthStateChanged((user) => (currentUser = user));

    const token = await auth().currentUser.getIdToken(true);

    console.log(token);

    dispatch(authenticate(currentUser.email, currentUser.uid, token, currentUser.photoURL));
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          throw new Error('That email address is already in use!');
        }

        if (error.code === 'auth/wrong-password') {
          throw new Error('Wrong password!');
        }

        if (error.code === 'auth/user-not-found') {
          throw new Error('User not found!');
        }

        if (error.code === 'auth/user-disabled') {
          throw new Error('User blocked. Please contant Admin.');
        }
      });
    let currentUser;

    auth().onAuthStateChanged((user) => (currentUser = user));

    const token = await auth().currentUser.getIdToken(true);

    console.log(currentUser);

    dispatch(authenticate(currentUser.email, currentUser.uid, token));

  };
};


export const logout = () => {
  auth().signOut();
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};

