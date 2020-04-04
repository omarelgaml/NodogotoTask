import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';


class Card extends Component {
  async deletePost(post){


    const page = window.location.pathname.split ('/');
    if (page[page.length - 1] === 'elderly') {
      var route = '/api/deletePost';
    }
    if (page[page.length - 1] === 'offers') {
      var route = '/api/deleteOfferPost';
    }
    if (page[page.length - 1] === 'employee') {
      var route = '/api/deleteEmployeePost';
    }
    if (page[page.length - 1] === 'wishlist') {
      var route = '/api/deleteWish';
    }
    const data = {data:{id:post}}
    const res = await axios.delete(route,data);
    console.log(res);
    window.location.reload(false);
  }
  render () {
    return (
      <div className="row custom-card ">
        <div className="col s10  offset-s1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                {this.props.name}, {this.props.location}
              </span>
              <p>{this.props.text}</p>
            </div>
            <div className="card-action">
              { this.props.userID===this.props.postOwner || this.props.wish ?
              <a className="right" onClick={()=>this.deletePost(this.props.postID)}>Delete</a>
              :
              <a className="right" onClick={this.props.sendEmail}>Contcat</a>

              }
              <a className="left">{this.props.date}</a>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
