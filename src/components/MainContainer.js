import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TableContainer from "./tableView";
import Map from "./mapView";
import LocationForm from "./locationForm";
import Buttons from "./buttons";
import throttle from "lodash/throttle";

import { getLocations, changePage } from "./../actions/actions";

const { MAP, TABLE } = Buttons.constants;

class MainContainer extends Component {
  state = {
    view: MAP
  };

  componentDidMount() {
    const { getLocations } = this.props;
    getLocations({ lat: 33.8326, lng: -117.9186, radius: 5 });
  }

  handleOnSelectView = view => {
    const { changePage } = this.props;

    if (view === TABLE) changePage(Number.NEGATIVE_INFINITY);
    this.setState({ view });
  };

  handleOnSubmit = values => {
    const { getLocations } = this.props;
    getLocations(values);
  };

  render() {
    const { view } = this.state;
    const { center, locations, getLocations, changePage, page } = this.props;
    const throttledGetLocations = throttle(getLocations, 1500, {
      trailing: true,
      leading: false
    });

    return (
      <div>
        <Buttons selectView={this.handleOnSelectView} />
        <div style={{ display: "flex" }}>
          <LocationForm
            onSubmit={this.handleOnSubmit}
            center={center}
            initialValues={center}
          />
          <div>
            {view === TABLE ? (
              <TableContainer
                locations={locations}
                changePage={changePage}
                page={page}
              />
            ) : (
              <Map
                getLocations={throttledGetLocations}
                center={center}
                locations={locations}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { locations, center, page } = state.mapReducer;

  return {
    center,
    locations,
    page
  };
};

export default connect(mapStateToProps, { getLocations, changePage })(
  MainContainer
);
