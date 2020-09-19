import { AUTHENTICATE, LOGOUT } from '../actions/emailAuth';
const initialState = {
  email: null,
  token: null,
  userId: null,
  photoURL: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        email: action.email,
        photoURL: action.photoURL,
        authClient: action.authClient
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
