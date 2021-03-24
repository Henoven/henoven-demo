import React, { Component } from 'react';
import { connect } from 'react-redux';
// Views
import StorageScreen from '../views/Storage/StorageScreen';

class StorageContainer extends Component {
    render() {
        return (
            <>
                <StorageScreen {...this.props}/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.sesion.user,
})

export default connect(mapStateToProps, {})(StorageContainer);