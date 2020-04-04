import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Elderly from './ElderlyHelp';
import WishList from './WishList';

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
            <Route exact path="/elderly" component={Elderly} />
            <Route exact path="/offers" component={Elderly} />
            <Route exact path="/employee" component={Elderly} />
            <Route exact path="/wishList" component={WishList} />




          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect (null, actions) (App);
