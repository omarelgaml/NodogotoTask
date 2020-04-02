import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Elderly from './ElderlyHelp';
const dashboard = () => <h2>dashboard</h2>;
class App extends Component {
  componentDidMount () {
    this.props.fetchUser ();
  }
  render () {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/elderly" component={Elderly} />


          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect (null, actions) (App);
