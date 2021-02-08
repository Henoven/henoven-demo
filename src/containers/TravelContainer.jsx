import React, { Component } from 'react';
import { connect } from 'react-redux';
// Views
import TravelsPage from '../views/Travels/TravelsPage';

class TravelContainer extends Component {
    render() {
        return (
            <>
                <TravelsPage {...this.props}/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.sesion.user,
})

export default connect(mapStateToProps, {})(TravelContainer);