import React, { Component } from 'react';
import { connect } from 'react-redux';
// Views
import Devices from '../views/Devices/Devices';

class DeviceContainer extends Component {
    render() {
        return (
            <>
                <Devices {...this.props}/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.sesion.user,
})

export default connect(mapStateToProps, {})(DeviceContainer);