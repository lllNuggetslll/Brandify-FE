import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const MAP = "MAP";
const TABLE = "TABLE";

const ButtonContainer = ({ selectView }) => {
  return (
    <div>
      <Button type="primary" onClick={() => selectView(MAP)}>
        Map
      </Button>
      <Button type="primary" onClick={() => selectView(TABLE)}>
        Table
      </Button>
    </div>
  );
};
ButtonContainer.constants = {
  MAP,
  TABLE
};
ButtonContainer.proptypes = {
  selectView: PropTypes.func.isRequired
};

export default ButtonContainer;
