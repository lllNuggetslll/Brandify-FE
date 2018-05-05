import { RECEIVE_LOCATIONS, showError } from "./../actions/actions";

export default ({ dispatch, getState }) => {
  return next => action => {
    if (action.type === RECEIVE_LOCATIONS) {
      const { status: { code, description } } = action.payload;

      if (code !== 1) {
        dispatch(showError(description));
      }
    }

    next(action);
  };
};
