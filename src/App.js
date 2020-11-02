import React, {Component} from 'react';
import MainPage from './components/MainPage/MainPage';

class App extends Component {
  render() {
    return (
      <MainPage>
        {this.props.children}
      </MainPage>
    );
  }
}

export default App;

