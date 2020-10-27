import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import { doLogIn } from "./../redux/actions/sesion";
// Views
import Home from '../views/Home/Home';

class HomeContainer extends Component {

    componentDidMount() {
        if(this.props.sesion){
            this.props.history.push("/mainPage");
        }
    }
    render() {
        return (
            <div>
                <Home
                    {...this.props}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    sesion: state.sesion.sesion,
    user: state.sesion.user,
})

export default connect(mapStateToProps, { doLogIn })(HomeContainer);