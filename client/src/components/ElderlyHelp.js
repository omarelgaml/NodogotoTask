import React, {Component} from 'react';
import Card from './Card';
import axios from 'axios';
import '../App.css';
import M from 'materialize-css';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
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

    if (this.state.filter === null) {
      console.log ('hii');

      const res = await axios.get ('/api/getElderlyRequests');
      this.setState ({
        posts: res.data,
      });
    } else {
      console.log ('asdjhasjdhakjdhkj');
      const res = await axios.get ('/api/filterElderlyRequests', {
        location: this.state.filter,
      });
      this.setState ({
        posts: res.data,
      });
    }
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
      });
      this.componentDidMount ();
      document.getElementById ('textarea1').value="";
      console.log (res);
    } else {
      alert ('Please enter text and location');
    }
  }
  renderPosts= ()=> {
    return this.state.posts.map (function (item, i) {
      return (
        <Card
          key={i}
          text={item.text}
          location={item.location}
          name={item.name}
          date={item.date}
          sendEmail={() => axios.post ('/api/sendEmail', {post: item.text})}
        >
          Test
        </Card>
      );
    });
  }
  async filterPosts () {
    const elem = document.getElementById ('filter');
    const location = elem.options[elem.selectedIndex].value;
    const posts = await axios.post ('/api/filterElderlyRequests', {
      location: location,
    });
    console.log (location);
    this.setState ({
      posts: posts.data,
    });
    console.log (this.state);
  }
  render () {
    return (
      <div>

        <form>

          <div className="row">
            <div className="input-field col s8 offset-s1">
              <textarea id="textarea1" className="materialize-textarea " />
              <label>New Post</label>
            </div>
            <div className="input-field col s2">
              <select id="select">
                <option value="Choose your location" disabled selected>Choose your location</option>
                <option value="New Cairo">New Cairo</option>
                <option value="Nasr City">Nasr City</option>
                <option value="Ma'adi">Ma'adi</option>
                <option value="heliopolis">heliopolis</option>
                <option value="October">October</option>
                <option value="Down Town">Down Town</option>
              </select>
              <label>Location</label>
            </div>
          </div>

        </form>

        <button
          className="btn right waves-effect waves-light red custom-btn"
          type="submit"
          name="action"
          onClick={() => this.submitPost ()}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
        <div className="row">
          <div className="input-field col s2 offset-s9">
            <select onChange={() => this.filterPosts ()} id="filter">
              <option value="" disabled selected>Filter by location</option>
              <option value="New Cairo">New Cairo</option>
              <option value="Nasr City">Nasr City</option>
              <option value="Ma'adi">Ma'adi</option>
              <option value="heliopolis">heliopolis</option>
              <option value="October">October</option>
              <option value="Down Town">Down Town</option>
            </select>
            <label>Location</label>
          </div>
        </div>
        {this.renderPosts ()}
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
