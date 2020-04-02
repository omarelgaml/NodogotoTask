import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import M from 'materialize-css';

class Header extends Component {

  componentDidMount () {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true,
    };
    document.addEventListener ('DOMContentLoaded', function () {
      var elems = document.querySelectorAll ('.sidenav');
      var instances = M.Sidenav.init (elems, options);
    });
  }
  renderContect () {
    switch (this.props.auth) {
     
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login with google</a></li>;

      default:
        return [<li key="2"><a href="/api/logout">Logout</a></li>];
    }
  }
  render () {
    return (
      <div>

        <nav  style={{padding:"0px 5px"},{marginBottom:"50px"}}>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? '/landing' : '/'}
              className="brand-logo"
            >
              Quarantine Buddy
            </Link>
            {' '}{' '}
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              {this.renderContect ()}
            </ul>
            <ul className="right hide-on-med-and-down">
              <li><Link to='/elderly'>Elderly help</Link></li>
              <li><a href="badges.html">Employees help</a></li>
              <li><a href="mobile.html">Offering help</a></li>
              <li><a href="collapsible.html">Wishlist</a></li>
            </ul>

          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li><Link to='/elderly'>Elderly help</Link></li>
          <li><a href="badges.html">Employees help</a></li>
          <li><a href="mobile.html">Offering help</a></li>
          <li><a href="collapsible.html">Wishlist</a></li>
        </ul>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (Header);
