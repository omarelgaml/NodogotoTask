import React, {Component} from 'react';
import '../App.css';
class Card extends Component {
  render () {
    return (
      <div className="row custom-card">
        <div className="col s10  offset-s1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                {this.props.name}, {this.props.location}
              </span>
              <p>{this.props.text}</p>
            </div>
            <div className="card-action">
              <a className="right" onClick={this.props.sendEmail}>Contcat</a>
              <a className="left">{this.props.date}</a>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
