import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Help from './Help';
import WishList from './WishList';
import '../App.css';
import { Lines } from 'react-preloaders';

class App extends Component {
  componentDidMount () {
    this.props.fetchUser ();
  }

  render () {
    return (
      <React.Fragment>
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/elderly" component={Help} />
            <Route exact path="/offers" component={Help} />
            <Route exact path="/employee" component={Help} />
            <Route exact path="/wishList" component={WishList} />

          </div>
        </BrowserRouter>
      </div>
      <Lines/>

      </React.Fragment>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}
export default connect (mapStateToProps, actions) (App);
