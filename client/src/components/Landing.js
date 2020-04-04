import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Slider,Slide,Caption} from 'react-materialize';

import {NotificationContainer, NotificationManager} from 'react-notifications';

class Landing extends Component {
  constructor (props) {
    super (props);
    this.state = {
      value: null,
      open: false,
    };
  }

  render () {
    return (
      <div className="landing">
        <Slider
          fullscreen={false}
          options={{
            duration: 500,
            height: 400,
            indicators: true,
            interval: 6000,
          }}
        >
          <Slide
            image={<img alt="" src="http://lorempixel.com/780/580/nature/1" />}
          >
            <Caption placement="center">
              <h3>
                This is our big Tagline!
              </h3>
              <h5 className="light grey-text text-lighten-3">
                Here's our small slogan.
              </h5>
            </Caption>
          </Slide>
          <Slide
            image={<img alt="" src="http://lorempixel.com/780/580/nature/2" />}
          >
            <Caption placement="left">
              <h3>
                Left Aligned Caption
              </h3>
              <h5 className="light grey-text text-lighten-3">
                Here's our small slogan.
              </h5>
            </Caption>
          </Slide>
          <Slide
            image={<img alt="" src="https://lorempixel.com/780/580/nature/3" />}
          >
            <Caption placement="right">
              <h3>
                Right Aligned Caption
              </h3>
              <h5 className="light grey-text text-lighten-3">
                Here's our small slogan.
              </h5>
            </Caption>
          </Slide>
          <Slide
            image={<img alt="" src="https://lorempixel.com/580/250/nature/4" />}
          >
            <Caption placement="center">
              <h3>
                This is our big Tagline!
              </h3>
              <h5 className="light grey-text text-lighten-3">
                Here's our small slogan.
              </h5>
            </Caption>
          </Slide>
        </Slider>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (Landing);
