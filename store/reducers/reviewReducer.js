import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  reviews: {},
  loading: false,
  rating: null,
  ratings: [],
};

const fetchReviewsStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchReviewsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    reviews: action.reviews,
  });
};

const fetchRatingSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    rating: action.rating,
  });
};

const fetchAllRatingsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    ratings: action.ratings,
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
    case actionTypes.FETCH_RATING_SUCCESS:
      return fetchRatingSuccess(state, action);
    case actionTypes.FETCH_ALL_RATING_SUCCESS:
      return fetchAllRatingsSuccess(state, action);
    case actionTypes.FETCH_REVIEWS_FAIL:
      return fetchReviewsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
