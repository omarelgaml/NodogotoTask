import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class Header extends Component {
  renderContect () {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login with google</a></li>;

      default:
        return [

          <li key="2"><a href="/api/logout">Logout</a></li>,
        ];
    }
  }
  render () {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? '/landing' : '/'}
              className="left-brand-logo"
            >
              Emaily
            </Link>
            <ul className="right">
              {this.renderContect ()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (Header);
