import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { Field, reduxForm } from "redux-form";
import Slider from "./Slider";
import isEqual from "lodash/isEqual";
import styled from "styled-components";

import validate from "./validate";

const ButtonContainer = styled.div`
  float: right;
`;
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div style={{ width: 200 }}>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && (error && <div style={{ marginBottom: -21 }}>{error}</div>)}
    </div>
  </div>
);

class LocationForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.center, nextProps.center)) {
      this.props.initialize(nextProps.center);
    }
  }

  render() {
    const { handleSubmit, reset, submitting } = this.props;

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
          <label style={{ width: 100, lineHeight: 4 }}>Radius</label>
          <div>
            <Field
              name="radius"
              component={Slider}
              placeholder="Radius"
              max={100}
              defaultValue={50}
            />
          </div>
        </div>
        <div style={{ display: "flex", margin: 25 }}>
          <label style={{ width: 100, lineHeight: 4 }}>Limit</label>
          <div>
            <Field
              name="pageSize"
              component={Slider}
              placeholder="Limit"
              max={10}
              defaultValue={10}
            />
          </div>
        </div>
        <ButtonContainer>
          <Button htmlType="submit" disabled={submitting} loading={submitting}>
            Submit
          </Button>
          <Button disabled={submitting} onClick={reset}>
            Reset
          </Button>
        </ButtonContainer>
      </form>
    );
  }
}
LocationForm.proptypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: "location",
  validate
})(LocationForm);
