import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchReviewsStart = () => {
  console.log('asdasdasd');
  return {
    type: actionTypes.FETCH_REVIEWS_START,
  };
};

export const fetchReviewsSuccess = (reviews) => {
  console.log('success fetching');
  return {
    type: actionTypes.FETCH_REVIEWS_SUCCESS,
    reviews,
  };
};

export const fetchReviewFail = (error) => {
  return {
    type: actionTypes.FETCH_REVIEWS_FAIL,
    error: error,
  };
};

export const sendReview = (review) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log(userId);
    console.log(token);
    let firebaseReviewsUrl;
    isFinite(userId)
      ? (firebaseReviewsUrl = `https://favbeerapp.firebaseio.com/reviews/${review.beerId}/${review.id}.json?access_token=${token}`)
      : (firebaseReviewsUrl = `https://favbeerapp.firebaseio.com/reviews/${review.beerId}/${review.id}.json?auth=${token}`);
    const response = await fetch(firebaseReviewsUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: review.id,
        beerId: review.beerId,
        email: review.email,
        userId: userId,
        date: review.date,
        comment: review.comment,
        rating: review.rating,
        images: review.images,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
  };
};

export const fetchReviews = (beerId) => {
  console.log('blibluble');
  return async (dispatch) => {
    console.log('blablabla');
    dispatch(fetchReviewsStart());
    (async () => {
      console.log('blibluelbe');
      const [res] = await Promise.all([
        axios.get(`https://favbeerapp.firebaseio.com/reviews/${beerId}.json`),
      ]).catch((error) => {
        dispatch(fetchReviewFail(error));
      });

      dispatch(fetchReviewsSuccess(res.data));
    })();
  };
};
