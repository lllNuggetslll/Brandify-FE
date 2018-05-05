import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Markers from "./Markers";

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

        return {
          onMapMounted: () => ref => {
            refs.map = ref;
          },
          onDragEnd: ({ center }) => () => {
            const lat = refs.map.getCenter().lat();
            const lng = refs.map.getCenter().lng();
            const distancePanned =
              Math.abs(center.lat - lat) + Math.abs(center.lng - lng);

            if (distancePanned > 0.5) this.handleMapChange({ lat, lng });
          },
          onZoomChanged: ({ center }) => () => {
            const { lat, lng } = center;

            this.handleMapChange({ lat, lng });
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
          defaultZoom={10}
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
                  height: 500,
                  minWidth: 500,
                  width: "100%"
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
MapContainer.proptypes = {
  locations: PropTypes.array.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired
};
