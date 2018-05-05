import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Table, Button, Icon } from "antd";

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
      <Table columns={columns} dataSource={formattedData} pagination={false} />
      <Button onClick={() => changePage(-1)} type="primary">
        <Icon type="left" />Backward
      </Button>
      <span>{`Page: ${page}`}</span>
      <Button onClick={() => changePage(1)} type="primary">
        Forward<Icon type="right" />
      </Button>
    </Fragment>
  );
};

export default TableContainer;
