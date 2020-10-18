import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchReviewsStart = () => {
  return {
    type: actionTypes.FETCH_REVIEWS_START,
  };
};

export const fetchReviewsSuccess = (reviews) => {
  return {
    type: actionTypes.FETCH_REVIEWS_SUCCESS,
    reviews,
  };
};

export const fetchRatingSuccess = (rating) => {
  return {
    type: actionTypes.FETCH_RATING_SUCCESS,
    rating,
  };
};

export const fetchAllRatingSuccess = (ratings) => {
  return {
    type: actionTypes.FETCH_ALL_RATING_SUCCESS,
    ratings,
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

    await fetch(
      `https://favbeerapp.firebaseio.com/rating/${review.beerId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foam: review.rating.foam ? review.rating.foam : 0,
          recipe: review.rating.recipe ? review.rating.recipe : 0,
          taste: review.rating.taste ? review.rating.taste : 0,
        }),
      },
    );

    const responseData = await response.json();
  };
};

export const fetchReviews = (beerId) => {
  return async (dispatch) => {
    dispatch(fetchReviewsStart());
    (async () => {
      const [res] = await Promise.all([
        axios.get(`https://favbeerapp.firebaseio.com/reviews/${beerId}.json`),
      ]).catch((error) => {
        dispatch(fetchReviewFail(error));
      });

      dispatch(fetchReviewsSuccess(res.data));
    })();
  };
};

export const fetchRating = (beerId) => {
  return async (dispatch) => {
    dispatch(fetchReviewsStart());
    (async () => {
      const [res] = await Promise.all([
        axios.get(`https://favbeerapp.firebaseio.com/rating/${beerId}.json`),
      ]).catch((error) => {
        dispatch(fetchReviewFail(error));
      });

      let allRatings = [];

      Object.values(res.data).forEach((rating) => {
        allRatings.push(rating.foam, rating.taste, rating.recipe);
      });


      const averge = allRatings.reduce((a, b) => a + b) / allRatings.length;


      dispatch(fetchRatingSuccess(averge));
    })();
  };
};

export const fetchRatingsScreen = () => {
  return async (dispatch) => {
    // dispatch(fetchAllReviewsStart());
    (async () => {
      const [res] = await Promise.all([
        axios.get(`https://favbeerapp.firebaseio.com/rating.json`),
      ]).catch((error) => {
        dispatch(fetchReviewFail(error));
      });


      let allRatingsData = [];

      Object.entries(res.data).forEach(([beerId, userId]) => {
        Object.values(userId).forEach((user) => {
          const beerRate = Object.assign({
            id: beerId,
            foam: user.foam,
            taste: user.taste,
            recipe: user.recipe,
          });
          allRatingsData.push(beerRate);
        });
      });

      const objectIds = allRatingsData.reduce(
        (a, {id, taste, foam, recipe}) => {
          a[id] = a[id] || {id, taste: [], foam: [], recipe: []};
          return {
            ...a,
            ...{
              [id]: {
                id,
                foam: a[id].foam.concat(foam),
                taste: a[id].taste.concat(taste),
                recipe: a[id].recipe.concat(recipe),
              },
            },
          };
        },
        {},
      );
      const result = Object.values(objectIds);

      JSON.stringify(result);

      const medianResult = result.map((beer) => {
        return {
          id: beer.id,
          foam: +(beer.foam.reduce((a, b) => a + b) / beer.foam.length).toFixed(
            1,
          ),
          taste: +(
            beer.taste.reduce((a, b) => a + b) / beer.taste.length
          ).toFixed(1),
          recipe: +(
            beer.recipe.reduce((a, b) => a + b) / beer.recipe.length
          ).toFixed(1),
        };
      });

      dispatch(fetchAllRatingSuccess(medianResult));
    })();
  };
};
