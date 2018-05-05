import React, { Component } from "react";
import PropTypes from "prop-types";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

export default class SliderContainer extends Component {
  state = {
    value: 0
  };

  componentWillMount() {
    const { defaultValue } = this.props;

    this.handleChange(defaultValue);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;

    this.handleChange(value);
  }

  handleChange = value => {
    const { input: { onChange } } = this.props;
    onChange(value);

    this.setState({
      value: value
    });
  };

  render() {
    const { value } = this.state;
    const { max } = this.props;

    return (
      <div className="slider" style={{ width: 200 }}>
        <Slider min={0} max={max} value={value} onChange={this.handleChange} />
      </div>
    );
  }
}
SliderContainer.proptypes = {
  defaultValue: PropTypes.number,
  max: PropTypes.number
};
