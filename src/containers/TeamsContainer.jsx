import React, { Component } from 'react';
import { connect } from 'react-redux';
// Views
import Teams from '../views/Teams/Teams';

class TeamsContainer extends Component {
    render() {
        return (
            <>
                <Teams {...this.props}/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.sesion.user,
})

export default connect(mapStateToProps, {})(TeamsContainer);