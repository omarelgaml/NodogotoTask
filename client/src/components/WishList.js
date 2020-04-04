import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import {connect} from 'react-redux';
import Card from './Card';
import {Button} from 'react-materialize';

class WishList extends Component {
    
  constructor (props) {
    super (props);
    this.state = {
      posts: [],
    };
  }

  async componentDidMount () {
    const res = await axios.post ('/api/getWishes', {
      id: localStorage.getItem("id"),
    });
    this.setState ({
      posts: res.data,
    });      
  }


  renderPosts () {
    if (this.props.auth) {
      var id = this.props.auth._id;
    }

    this.state.posts.sort (function (a, b) {
      return new Date (b.date) - new Date (a.date);
    });
    return (
      <div>
        {this.state.posts.map ((item, i) => (
          <Card
            key={i}
            text={item.text}
            date={item.date}
            postID={item._id}
            userID={id}
            wish={true}
            delete={()=> axios.delete('/api/deleteWish',{data:{id:item._id}})}
            postOwner={item.userID}
          >
            Test
          </Card>
        ))}
      </div>
    );
  }
  async submit () {
    const text = document.getElementById ('textarea1').value;
    const date = new Date ();

    if (text) {
      const res = await axios.post ('/api/postWish', {
        text: text,
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
  render () {
    return (
      <div style={{marginTop: '100px'}}>

        <form>

          <div className="row">
            <div className="input-field col s10 offset-s1">
              <textarea id="textarea1" className="materialize-textarea " />
              <label>New Post</label>
            </div>

          </div>

        </form>

        <Button
          className="right custom-btn"
          type="submit"
          name="action"
          onClick={() => this.submit ()}
        >
          Submit
          <i className="material-icons right">send</i>
        </Button>

        {this.renderPosts ()}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (WishList);
