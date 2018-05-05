const validate = values => {
  const errors = {};

  if (!values.lat) {
    errors.lat = "Required";
  } else if (values.lat > 180 || values.lat < -180) {
    errors.lat = "Latitude values must be between -180 and 180.";
  }

  if (!values.lng) {
    errors.lng = "Required";
  } else if (values.lng > 180 || values.lng < -180) {
    errors.lng = "Latitude values must be between -180 and 180.";
  }

  return errors;
};

export default validate;
