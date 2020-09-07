import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  reviews: {},
  loading: false,
};

const fetchReviewsStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchReviewsSuccess = (state, action) => {
  console.log('reducerr');
  console.log(action.reviews);
  return updateObject(state, {
    loading: false,
    reviews: action.reviews,
  });
};

const fetchReviewsFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REVIEWS_START:
      return fetchReviewsStart(state, action);
    case actionTypes.FETCH_REVIEWS_SUCCESS:
      return fetchReviewsSuccess(state, action);
    case actionTypes.FETCH_REVIEWS_FAIL:
      return fetchReviewsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
