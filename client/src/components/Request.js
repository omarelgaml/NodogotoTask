import React, {Component} from 'react';
import Card from './Card';
import axios from 'axios';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import {connect} from 'react-redux';
import 'materialize-css';
import Select from './Select';
import {Button} from 'react-materialize';

class Request extends Component {
  constructor (props) {
    super (props);
    this.state = {
      visible: false,
      writerID: null,
      userEmail: null,
      userName: null,
      permission: this.props.permission (),
    };
  }
  componentDidMount () {
    document.addEventListener ('DOMContentLoaded', function () {});
  }

  renderPosts () {
    if (this.props.auth) {
      var id = this.props.auth._id;
    }

    this.props.posts.sort (function (a, b) {
      return new Date (b.date) - new Date (a.date);
    });
    this.props.posts.map (item => console.log (item.date));
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
            sendEmail={() => this.show (item.userID)}
          >
            Test
          </Card>
        ))}
      </div>
    );
  }
  show (id) {
    this.setState ({
      visible: true,
      writerID: id,
      userEmail: this.props.auth.emails[0],
      userName: this.props.auth.name,
    });
  }
  async sendEmail () {
    const text = document.getElementById ('textarea2').value;
    const res = await axios.post ('/api/sendEmail', {
      writerID: this.state.writerID,
      userEmail: this.state.userEmail,
      userName: this.state.userName,
      text: text,
    });
    console.log (res);
    this.hide ();
  }
  hide () {
    this.setState ({
      visible: false,
      writerID: null,
      userEmail: null,
      userName: null,
    });
  }
  //{() => axios.post ('/api/sendEmail', {post: item.text})}
  render () {
    return (
      <div>
        {this.state.permission &&
          <form>

            <div className="row new-post">
              <div className="input-field col s8 offset-s1">
                <textarea
                  id="textarea1"
                  maxlength="120"
                  className="materialize-textarea "
                />
                <label>New Post</label>
              </div>
              <div className="col s3 test">
                <Select
                  id="select"
                  action={() => null}
                  label="Select your location"
                />
              </div>
            </div>

          </form>}
        {this.state.permission &&
          <Button
            className="right custom-btn"
            type="submit"
            name="action"
            onClick={() => this.props.submitPost ()}
          >
            Submit
            <i className="material-icons right">send</i>
          </Button>}
        <div>

          <div className="row your-posts">
            <div className="col s3 offset-s1  ">
              {this.state.permission &&
                <Button
                  type="submit"
                  name="action"
                  id="filter-btn"
                  onClick={() => this.props.yourPosts ()}
                >
                  Your posts
                </Button>}

            </div>

            <div className="col s3 offset-s5">

              <Select
                id="filter"
                action={() => this.props.filterPosts ()}
                label="Filter by location"
              />

            </div>

          </div>
          {this.renderPosts ()}
        </div>
        <Rodal
          enterAnimation="slideUp"
          leaveAnimation="slideDown"
          width={350}
          visible={this.state.visible}
          onClose={() => this.hide ()}
        >
          <div>
            <div className="input-field send-mail">

              <textarea id="textarea2" className="materialize-textarea " />
              <label>Send Mail</label>
            </div>
            <a
              onClick={() => this.sendEmail ()}
              class="waves-effect waves-light btn right"
            >
              Send
            </a>

          </div>
        </Rodal>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (Request);
