import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  beers: [],
  filteredBeers: [],
  loading: false,
  beersFavRate: [
    // {
    //   id: 1,
    //   favorite: false,
    //   rating: 5,
    // },
  ],
};

const fetchBeersStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchBeersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    beers: action.beers.beers,
    filteredBeers: action.beers.beers,
    beersFavRate: action.beers.favRate,
  });
};

const fetchBeersFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BEERS_START:
      return fetchBeersStart(state, action);
    case actionTypes.FETCH_BEERS_SUCCESS:
      return fetchBeersSuccess(state, action);
    case actionTypes.FETCH_BEERS_FAIL:
      return fetchBeersFail(state, action);
    case actionTypes.SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredBeers = state.beers.filter((beer) => {
        if (appliedFilters.abv <= beer.abv) {
          return false;
        }
        if (
          beer.name
            .toLowerCase()
            .includes(appliedFilters.search.toLowerCase()) ||
          beer.tagline
            .toLowerCase()
            .includes(appliedFilters.search.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
      return {
        ...state,
        filteredBeers: filteredBeers,
      };
    case actionTypes.TOGGLE_FAVORITE:
      const existingIndex = state.beersFavRate.findIndex(
        (beerFavRate) => beerFavRate.id === action.beerFavRate.id,
      );
      if (existingIndex >= 0) {
        const updatedFavRateBeers = [...state.beersFavRate];
        typeof action.beerFavRate.favorite !== 'undefined'
          ? (updatedFavRateBeers[existingIndex].favorite =
              action.beerFavRate.favorite)
          : null;
        action.beerFavRate.rating
          ? (updatedFavRateBeers[existingIndex].rating =
              action.beerFavRate.rating)
          : null;

        return {...state, beersFavRate: updatedFavRateBeers};
      } else {
        const beerFavRate = action.beerFavRate;
        return {...state, beersFavRate: state.beersFavRate.concat(beerFavRate)};
      }
    default:
      return state;
  }
};

export default reducer;
