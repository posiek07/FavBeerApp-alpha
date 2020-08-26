import {AsyncStorage} from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimes(expiryTime));
    dispatch({type: AUTHENTICATE, userId, token});
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4uEk8QTe3s2ewigsndAu1wQ5ja3ubfus',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorresponseData = await response.json();
      const errorId = errorresponseData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000,
      ),
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000,
    );
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate,
    );
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4uEk8QTe3s2ewigsndAu1wQ5ja3ubfus',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorresponseData = await response.json();
      const errorId = errorresponseData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Wrong password!';
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000,
      ),
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000,
    );
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate,
    );
  };
};

let timer;

export const logout = () => {
  return (dispatch) => {
    AsyncStorage.removeItem('userData');
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
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = async (token, userId, expirationDate) => {
  
  await AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate.toISOString(),
      logout: 'emailLogout',
    }),
  );
};
