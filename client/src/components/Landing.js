import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import Card from './Card'
class Landing extends Component {
  async eldAdd () {
    const res = await axios.post ('/api/elderlyRequest', {
      text: 'hii',
      location: 'test',
    });
  }
  async eldGet () {
    const res = await axios.get ('/api/getElderlyRequests');
    console.log (res.data);
  }
  async eldFilter () {
    const res = await axios.post ('/api/filterElderlyRequests', {
      location: 'test',
    });
    console.log (res.data);
  }


  async offerAdd () {
    const res = await axios.post ('/api/offerRequest', {
      text: 'hii',
      location: 'bye',
    });
  }
  async offerGet () {
    const res = await axios.get ('/api/getOfferRequests');
    console.log (res.data);
  }
  async offerFilter () {
    const res = await axios.post ('/api/filterOfferRequests', {
      location: 'test',
    });
    console.log (res.data);
  }




  async empFilter () {
    const res = await axios.post ('/api/filterEmployeeRequests', {
      location: 'test',
    });
    console.log (res.data);
  }
  async empAdd () {
    const res = await axios.post ('/api/employeeRequest', {
      text: 'yesss',
      location: 'test',
    });
  }
  async empGet () {
    const res = await axios.get ('/api/getEmployeeRequests');
    console.log (res.data);
  }

  render () {
    return (
      <div >

        <button onClick={() => this.offerAdd ()}>Test</button>
        <button onClick={() => this.offerGet ()}>Test2</button>
        <button onClick={() => this.offerFilter ()}>Test3</button>
        <Card />
      </div>
    );
  }
}

export default connect (null, actions) (Landing);
