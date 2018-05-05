import API from "./../utils/API";

export const GET_LOCATIONS = "GET_LOCATIONS";
export const RECEIVE_LOCATIONS = "RECEIVE_LOCATIONS";
export const CHANGE_PAGE = "CHANGE_PAGE";

const getPage = ({ locations, page, pageNum }) => {
  if (pageNum === 1 && locations.length === 0) return page;

  return page + pageNum > 0 ? page + pageNum : 1;
};

export const getLocations = params => {
  const { pageSize } = params;

  if (pageSize) {
    params.paging = {
      pageSize
    };

    delete params.pageSize;
  }
  console.log(params);
  return async dispatch => {
    const payload = await API(params);

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
  return async (dispatch, getState) => {
    const {
      mapReducer: { center, page, locations },
      form: { location: { values } }
    } = getState();
    const newPage = getPage({ locations, page, pageNum });
    console.log("newpage", newPage);
    const params = {
      radius: 100,
      paging: {
        page: newPage,
        pageSize: 10
      },
      ...center,
      ...values
    };

    await dispatch(getLocations(params));

    dispatch({
      type: CHANGE_PAGE,
      payload: { page: newPage }
    });
  };
};
