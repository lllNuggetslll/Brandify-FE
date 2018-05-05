import axios from "axios";

const handleError = err => {
  console.log(new Error(err));
};
const URL = "https://one-staging-api.brandify.com/service";
const USER_NAME = "codingchallenge@brandify.com";
const PASSWORD = "appl!c@nt";
const CREDS = {
  username: USER_NAME,
  password: PASSWORD
};
// Not sure when sessionIDs expire, sessonStorage became unreliable
let sessionId = "";

const getSessionId = () => {
  return axios
    .post(`${URL}/user/authenticate`, CREDS)
    .then(
      data => (sessionId = data.data.session.sessionId)
      // sessionStorage.setItem("sessionId", data.data.session.sessionId)
    )
    .catch(handleError);
};

const API = async params => {
  if (
    !sessionId
    // !sessionStorage.getItem("sessionId")
  )
    await getSessionId();

  return axios
    .post(`${URL}/location/locationMarkers`, {
      ...params,
      filter: " accountId IN ('77b0c1a5-6159-44a9-8268-07b393da0d4e') ",
      sessionId
      // sessionId: sessionStorage.getItem("sessionId")
    })
    .then(data => data.data)
    .catch(handleError);
};

export default API;
