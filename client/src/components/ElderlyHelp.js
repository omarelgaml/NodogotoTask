import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import M from 'materialize-css';
import {connect} from 'react-redux';
import Request from './Request';
class ElderlyHelp extends Component {
  constructor (props) {
    super (props);
    this.state = {
      posts: [],
      filter: null,
      currentPage: null,
    };
  }

  async componentDidMount () {
    const page = window.location.pathname.split ('/');
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true,
    };
    document.addEventListener ('DOMContentLoaded', function () {
      var elems = document.querySelectorAll ('select');
      var instances = M.FormSelect.init (elems, options);
    });
    if (page[page.length - 1] === 'elderly') {
      var route = '/api/getElderlyRequests';
    }
    if (page[page.length - 1] === 'offers') {
      var route = '/api/getOfferRequests';
    }
    if (page[page.length - 1] === 'employee') {
      var route = '/api/getEmployeeRequests';
    }
    const res = await axios.get (route);
    this.setState ({
      posts: res.data,
      currentPage: page[page.length - 1],
    });
  }
  async submitPost () {
    if (this.state.currentPage === 'elderly') {
      var route = '/api/elderlyRequest';
    }
    if (this.state.currentPage === 'offers') {
      var route = '/api/offerRequest';
    }
    if (this.state.currentPage === 'employee') {
      var route = '/api/employeeRequest';
    }
    const elem = document.getElementById ('select');
    const location = elem.options[elem.selectedIndex].value;
    const text = document.getElementById ('textarea1').value;
    const date = new Date ();
    if (location && text) {
      const res = await axios.post (route, {
        location: location,
        text: text,
        name: this.props.auth.name,
        emails: this.props.auth.emails,
        date: date,
        userID: this.props.auth._id,
      });
      this.componentDidMount ();
      document.getElementById ('textarea1').value = '';
      console.log (res);
    } else {
      alert ('Please enter text and location');
    }
  }

  async filterPosts () {
    if (this.state.currentPage === 'elderly') {
      var route = '/api/filterElderlyRequests';
    }
    if (this.state.currentPage === 'offers') {
      var route = '/api/filterOfferRequests';
    }
    if (this.state.currentPage === 'employee') {
      var route = '/api/filterEmployeeRequests';
    }
    const elem = document.getElementById ('filter');
    const location = elem.options[elem.selectedIndex].value;
    const posts = await axios.post (route, {
      location: location,
    });
    this.setState ({
      posts: posts.data,
    });
  }

  async yourPosts () {
    if (this.state.currentPage === 'elderly') {
      var route = '/api/elderlyUser';
    }
    if (this.state.currentPage === 'offers') {
      var route = '/api/offerUser';
    }
    if (this.state.currentPage === 'employee') {
      var route = '/api/employeeUser';
    }
    const posts = await axios.post (route, {
      id: this.props.auth._id,
    });
    this.setState ({
      posts: posts.data,
    });
  }
  render () {
    return (
      <div>
        <Request
          posts={this.state.posts}
          submitPost={() => this.submitPost ()}
          filterPosts={() => this.filterPosts ()}
          deletePost={post => this.deletePost (post)}
          yourPosts={() => this.yourPosts ()}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (ElderlyHelp);
