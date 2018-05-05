import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { Field, reduxForm } from "redux-form";
import isEqual from "lodash/isEqual";

import validate from "./validate";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && (error && <div style={{ marginBottom: -21 }}>{error}</div>)}
    </div>
  </div>
);

class LocationForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.center, nextProps.center))
      this.props.initialize(nextProps.center);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, center } = this.props;
    const { lat, lng } = center;

    return (
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", margin: 25 }}>
          <label style={{ width: 100 }}>Latitude</label>
          <div>
            <Field
              name="lat"
              component={renderField}
              type="number"
              placeholder="Latitude"
            />
          </div>
        </div>
        <div style={{ display: "flex", margin: 25 }}>
          <label style={{ width: 100 }}>Longitude</label>
          <div>
            <Field
              name="lng"
              component={renderField}
              type="number"
              placeholder="Longitude"
            />
          </div>
        </div>
        <div style={{ display: "flex", margin: 25 }}>
          <label style={{ width: 100 }}>Radius</label>
          <div>
            <Field
              name="radius"
              component={renderField}
              placeholder="Radius"
              type="number"
            />
          </div>
        </div>
        <div style={{ display: "flex", margin: 25 }}>
          <label style={{ width: 100 }}>Limit</label>
          <div>
            <Field
              name="pageSize"
              component={renderField}
              placeholder="Limit"
              type="number"
            />
          </div>
        </div>
        <div>
          <Button
            htmlType="submit"
            disabled={pristine || submitting}
            loading={submitting}
          >
            Submit
          </Button>
          <Button disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "location",
  validate
})(LocationForm);
