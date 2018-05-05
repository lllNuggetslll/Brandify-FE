import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import mapReducer from "./mapReducer";

const rootReducer = combineReducers({
  mapReducer,
  form: formReducer
});

export default rootReducer;
