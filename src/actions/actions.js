import API from "./../utils/API";

export const GET_LOCATIONS = "GET_LOCATIONS";
export const RECEIVE_LOCATIONS = "RECEIVE_LOCATIONS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export const getLocations = params => {
  return async (dispatch, getState) => {
    const {
      mapReducer: { page },
      form: { location: { values: { lat, lng, pageSize, radius } } }
    } = getState();

    const formattedParams = {
      paging: {
        page,
        pageSize
      },
      lat,
      lng,
      radius,
      ...params
    };

    const payload = await API(formattedParams);

    dispatch(receiveLocations(payload));
  };
};

export const receiveLocations = payload => {
  return {
    type: RECEIVE_LOCATIONS,
    payload
  };
};

export const changePage = pageNum => {
  return (dispatch, getState) => {
    const { mapReducer: { page } } = getState();
    const newPage = page + pageNum > 0 ? page + pageNum : 1;

    dispatch({
      type: CHANGE_PAGE,
      payload: { page: newPage }
    });

    dispatch(getLocations());
  };
};

export const showError = error => {
  return {
    type: SHOW_ERROR,
    payload: {
      error
    }
  };
};

export const hideError = () => {
  return {
    type: HIDE_ERROR
  };
};
