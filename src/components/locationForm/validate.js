const validate = values => {
  const errors = {};

  if (!values.lat) {
    errors.lat = "Required";
  } else if (values.lat > 90 || values.lat < -90) {
    errors.lat = "Must be between -90 and 90.";
  }

  if (!values.lng) {
    errors.lng = "Required";
  } else if (values.lng > 180 || values.lng < -180) {
    errors.lng = "Must be between -180 and 180.";
  }

  return errors;
};

export default validate;
