import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchBeersStart = () => {
  return {
    type: actionTypes.FETCH_BEERS_START,
  };
};

export const fetchBeersSuccess = (beers) => {
  return {
    type: actionTypes.FETCH_BEERS_SUCCESS,
    beers: beers,
  };
};

export const fetchBeersFail = (error) => {
  return {
    type: actionTypes.FETCH_BEERS_FAIL,
    error: error,
  };
};

export const setFilters = (filtersSettings) => {
  return {
    type: actionTypes.SET_FILTERS,
    filters: filtersSettings,
  };
};

export const updateRateFav = (beerFavRate) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    let firebaseFavRateUrl;

    isFinite(userId)
      ? (firebaseFavRateUrl = `https://favbeerapp.firebaseio.com/favrate/${userId}/${beerFavRate.id}.json?access_token=${token}`)
      : (firebaseFavRateUrl = `https://favbeerapp.firebaseio.com/favrate/${userId}/${beerFavRate.id}.json?auth=${token}`);

    const response = await fetch(firebaseFavRateUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: beerFavRate.id,
        favorite:
          beerFavRate.favorite !== 'undefined' ? beerFavRate.favorite : null,
        rating: beerFavRate.rating !== 'undefinded' ? beerFavRate.rating : null,
      }),
    });

    const responseData = await response.json();
    responseData;

    const updatedBeerFavRate = {
      id: beerFavRate.id,
      favorite:
        beerFavRate.favorite !== 'undefined' ? beerFavRate.favorite : null,
      rating: beerFavRate.rating !== 'undefinded' ? beerFavRate.rating : null,
    };

    dispatch({
      type: actionTypes.TOGGLE_FAVORITE,
      beerFavRate: updatedBeerFavRate,
    });
  };
};

export const fetchData = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    dispatch(fetchBeersStart());
    (async () => {
      const [res1, res2, res3, res4, res5, res6] = await Promise.all([
        axios.get(' https://api.punkapi.com/v2/beers?page=1&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=2&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=3&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=4&per_page=80'),
        axios.get('https://api.punkapi.com/v2/beers?page=5&per_page=80'),
        axios.get(`https://favbeerapp.firebaseio.com/favrate/${userId}/.json`),
      ]).catch((error) => {
        throw error;
      });

      const favRate = res6.data;

      const favRateArray = Object.values(favRate ? favRate : []);

      const fetchedBeers = [
        ...res1.data,
        ...res2.data,
        ...res3.data,
        ...res4.data,
        ...res5.data,
      ];

      fetchedBeers.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      const fetchedData = {
        beers: fetchedBeers,
        favRate: favRateArray ? favRateArray : [],
      };

      dispatch(fetchBeersSuccess(fetchedData));
    })();
  };
};
