import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { compose, withStateHandlers } from "recompose";
import { Marker, InfoWindow } from "react-google-maps";
import isEqual from "lodash/isEqual";
import brandify from "./brandify.png";
import styled from "styled-components";

const Info = ({ onToggleOpen, name, address }) => {
  return (
    <InfoWindow
      onCloseClick={onToggleOpen}
      options={{ closeBoxURL: ``, enableEventPropagation: true }}
    >
      <div
        style={{
          opacity: 0.75,
          padding: `12px`
        }}
      >
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          {name}
          <br />
          {address}
        </div>
      </div>
    </InfoWindow>
  );
};

const MarkerMaker = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  )
)(props => {
  const { isOpen, onToggleOpen, position, icon, name, address } = props;

  return (
    <Marker onClick={() => onToggleOpen()} icon={icon} position={position}>
      {isOpen && (
        <Info onToggleOpen={onToggleOpen} name={name} address={address} />
      )}
    </Marker>
  );
});

const Markers = ({ center, locations }) => {
  const centerMarker = (
    <MarkerMaker
      position={center}
      icon={{
        url: brandify,
        scaledSize: {
          width: 64,
          height: 64
        }
      }}
      name={"Center!"}
    />
  );

  const markers = locations.map(location => {
    const {
      lat,
      lng,
      locationId,
      name,
      address1,
      city,
      state,
      postalCode,
      phoneNumbers
    } = location;
    const address = `${address1}, ${city}, ${state}, ${postalCode}`;

    if (!isEqual(center, { lat, lng }))
      return (
        <MarkerMaker
          key={locationId}
          position={{ lat, lng }}
          name={name}
          address={address}
        />
      );
  });

  return (
    <Fragment>
      {centerMarker}
      {markers}
    </Fragment>
  );
};

export default Markers;
