import React, {Component} from 'react';
import Card from './Card';
import axios from 'axios';
import M from 'materialize-css';
import {connect} from 'react-redux';

class Request extends Component {
  componentDidMount () {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true,
    };
    document.addEventListener ('DOMContentLoaded', function () {
      var elems = document.querySelectorAll ('select');
      var instances = M.FormSelect.init (elems, options);
    });
  }

  renderPosts () {
    if (this.props.auth) {
      var id = this.props.auth._id;
    }

    return (
      <div>
        {this.props.posts.map ((item, i) => (
          <Card
            key={i}
            text={item.text}
            location={item.location}
            name={item.name}
            date={item.date}
            postID={item._id}
            userID={id}
            postOwner={item.userID}
            sendEmail={() => axios.post ('/api/sendEmail', {post: item.text})}
          >
            Test
          </Card>
        ))}
      </div>
    );
  }

  render () {
    return (
      <div>

        <form>

          <div className="row">
            <div className="input-field col s7 offset-s1">
              <textarea id="textarea1" className="materialize-textarea " />
              <label>New Post</label>
            </div>
            <div className="input-field col s3">
              <select id="select">
                <option value="Choose your location" disabled selected>
                  Choose your location
                </option>
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
          onClick={() => this.props.submitPost ()}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
        <div className="row">
          <div className="input-field col s3 offset-s5">
            <select onChange={() => this.props.filterPosts ()} id="filter">
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
          <div className="col s2 offset-s7">
            <button
              className="btn right waves-effect waves-light red custom-btn"
              type="submit"
              name="action"
              onClick={() => this.props.yourPosts()}
            >
              Your Posts
            </button>
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

export default connect (mapStateToProps) (Request);
