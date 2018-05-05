import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose, withState, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Markers from "./Markers";
import styled from "styled-components";

export default class MapContainer extends Component {
  state = {
    map: null
  };

  componentDidMount() {
    const { map } = this.state;

    if (!map) this.initMap();
  }

  handleMapChange = values => {
    const { getLocations } = this.props;
    getLocations(values);
  };

  initMap() {
    const map = compose(
      withHandlers(() => {
        const refs = {
          map: null
        };
        const getRadius = () => {
          const { b, f } = refs.map.getBounds();

          return Math.abs(b.f - b.b) + Math.abs(f.f - f.b) * 50;
        };

        return {
          onMapMounted: () => ref => {
            refs.map = ref;
          },
          onDragEnd: ({ center }) => () => {
            const lat = refs.map.getCenter().lat();
            const lng = refs.map.getCenter().lng();
            const distancePanned =
              Math.abs(center.lat - lat) + Math.abs(center.lng - lng);
            const radius = getRadius();

            if (distancePanned > 0.75)
              this.handleMapChange({ lat, lng, radius });
          },
          onZoomChanged: ({ center }) => () => {
            const { lat, lng } = center;
            const radius = getRadius();

            this.handleMapChange({ lat, lng, radius });
          }
        };
      }),
      withScriptjs,
      withGoogleMap
    )(props => {
      const {
        center,
        locations,
        onMapMounted,
        onZoomChanged,
        onDragEnd
      } = props;

      return (
        <GoogleMap
          ref={onMapMounted}
          onZoomChanged={() => onZoomChanged(center)}
          onDragEnd={() => onDragEnd(center)}
          center={center}
          defaultZoom={13}
        >
          <Markers center={center} locations={locations} />
        </GoogleMap>
      );
    });

    this.setState({ map });
  }

  render() {
    const Map = this.state.map;
    const { center, locations } = this.props;

    return (
      <Fragment>
        {Map ? (
          <Map
            center={center}
            locations={locations}
            containerElement={
              <div
                style={{
                  height: `500px`,
                  width: "500px"
                }}
              />
            }
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            mapElement={<div style={{ height: `100%` }} />}
            loadingElement={<div style={{ height: `100%` }} />}
          />
        ) : (
          Map
        )}
      </Fragment>
    );
  }
}
