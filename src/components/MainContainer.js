import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";
import styled from "styled-components";
import { notification } from "antd";

import TableContainer from "./tableView";
import Map from "./mapView";
import LocationForm from "./locationForm";
import Buttons from "./buttons";

import { getLocations, changePage, hideError } from "./../actions/actions";

const { MAP, TABLE } = Buttons.constants;

const AppContainer = styled.div`
  margin: 5%;
  background-color: lightgrey;
  padding: 20px;
  min-height: 740px;
  min-width: 765px;
`;

const FormContainer = styled.div`
  margin: 20px;
`;

class MainContainer extends Component {
  state = {
    view: MAP
  };

  componentDidMount() {
    const { getLocations } = this.props;
    getLocations({ lat: 33.8326, lng: -117.9186 });
  }

  componentWillReceiveProps() {
    const { error, hideError } = this.props;

    if (error) {
      notification.open({ message: error });
      hideError();
    }
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
      <AppContainer>
        <Buttons selectView={this.handleOnSelectView} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <FormContainer>
            <LocationForm
              onSubmit={this.handleOnSubmit}
              initialValues={center}
              center={center}
            />
          </FormContainer>
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
      </AppContainer>
    );
  }
}
MainContainer.proptypes = {
  center: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  error: PropTypes.string,
  getLocations: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  hideError: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { locations, center, page, error } = state.mapReducer;

  return {
    center,
    locations,
    page,
    error
  };
};

export default connect(mapStateToProps, {
  getLocations,
  changePage,
  hideError
})(MainContainer);
