import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Table, Button, Icon } from "antd";
import styled from "styled-components";

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Address",
    dataIndex: "address"
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber"
  }
];

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
`;

const StyledTable = styled(Table)`
  width: 100%;
  min-width: 720px;
`;

const TableContainer = ({ locations, changePage, page }) => {
  const formattedData = locations.map(location => {
    const {
      name,
      address1,
      city,
      state,
      postalCode,
      phoneNumbers,
      locationId
    } = location;
    const { type, value } = phoneNumbers[0];
    const address = `${address1}, ${city}, ${state}, ${postalCode}`;
    const phoneNumber = `${type}: ${value}`;

    return {
      key: locationId,
      name,
      address,
      phoneNumber
    };
  });

  return (
    <Fragment>
      <ButtonContainer>
        <Button
          onClick={() => changePage(-1)}
          type="primary"
          disabled={page === 1}
        >
          <Icon type="left" />Back
        </Button>
        <span>{`Page: ${page}`}</span>
        <Button
          onClick={() => changePage(1)}
          type="primary"
          disabled={locations.length === 0}
        >
          Next<Icon type="right" />
        </Button>
      </ButtonContainer>
      <StyledTable
        columns={columns}
        dataSource={formattedData}
        pagination={false}
      />
    </Fragment>
  );
};
TableContainer.proptypes = {
  locations: PropTypes.array.isRequired,
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

export default TableContainer;
