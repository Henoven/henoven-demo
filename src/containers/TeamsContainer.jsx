import React, { Component } from 'react';
import { connect } from 'react-redux';
// Views
import TeamsPage from '../views/Teams/TeamsPage';

class TeamsContainer extends Component {
    render() {
        return (
            <>
                <TeamsPage {...this.props}/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.sesion.user,
})

export default connect(mapStateToProps, {})(TeamsContainer);