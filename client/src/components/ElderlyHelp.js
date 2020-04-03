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
    };
  }

  async componentDidMount () {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true,
    };
    document.addEventListener ('DOMContentLoaded', function () {
      var elems = document.querySelectorAll ('select');
      var instances = M.FormSelect.init (elems, options);
    });

    const res = await axios.get ('/api/getElderlyRequests');
    this.setState ({
      posts: res.data,
    });
  }
  async submitPost () {
    const elem = document.getElementById ('select');
    const loc = elem.options[elem.selectedIndex].value;
    const t = document.getElementById ('textarea1').value;
    const d = new Date ();
    if (loc && t) {
      const res = await axios.post ('/api/elderlyRequest', {
        location: loc,
        text: t,
        name: this.props.auth.name,
        emails: this.props.auth.emails,
        date: d,
        userID:this.props.auth._id
      });
      this.componentDidMount ();
      document.getElementById ('textarea1').value = '';
      console.log (res);
    } else {
      alert ('Please enter text and location');
    }
  }

  async filterPosts () {
    const elem = document.getElementById ('filter');
    const location = elem.options[elem.selectedIndex].value;
    const posts = await axios.post ('/api/filterElderlyRequests', {
      location: location,
    });
    this.setState ({
      posts: posts.data,
    });
  }

  async yourPosts () {
    const posts = await axios.post ('/api/elderlyUser', {
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
          filterPosts={()=>this.filterPosts()}
          deletePost={(post)=>this.deletePost(post)}
          yourPosts={()=>this.yourPosts()}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (ElderlyHelp);

/*
sort (function (a, b) {
      return new Date (b.date) - new Date (a.date);
    });*/
