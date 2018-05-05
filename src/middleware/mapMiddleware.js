import { GET_LOCATIONS } from "./../actions/actions";

export default ({ dispatch, getState }) => {
  return next => action => {
    // console.log("payload", action);
    next(action);
  };
};
