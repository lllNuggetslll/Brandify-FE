import {
  RECEIVE_LOCATIONS,
  CHANGE_PAGE,
  SHOW_ERROR,
  HIDE_ERROR
} from "./../actions/actions";

const INITIAL_STATE = {
  center: { lat: 33.8326, lng: -117.9186 },
  locations: [],
  page: 1,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RECEIVE_LOCATIONS:
      return {
        ...state,
        ...payload
      };

    case CHANGE_PAGE:
      return {
        ...state,
        ...payload
      };

    case SHOW_ERROR:
      return {
        ...state,
        ...payload
      };

    case HIDE_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
