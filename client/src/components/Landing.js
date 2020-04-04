import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Slider, Slide, Caption} from 'react-materialize';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Rodal from 'rodal';
import {NotificationContainer,NotificationManager} from 'react-notifications';

class Landing extends Component {
  constructor (props) {
    super (props);
    this.state = {
      value: null,
      open: true,
    };
  }

  handleChange = event => {
    console.log (event.target.value);
    this.setState ({
      value: event.target.value,
    });
  };
  async updateUser () {
    if (!this.state.value) {
      NotificationManager.error ('Please select a type', 'Error', 2500);
    } else {
      const user = await axios.put ('/api/updateUser', {
        user: this.props.auth,
        type: this.state.value,
      });
      console.log (user);
      this.hide ();
    }
  }
  hide () {
    this.setState ({
      open: false,
    });
  }
  errorHide () {
    NotificationManager.error (
      'Please select a type and click send',
      'Error',
      2500
    );
  }
  render () {
    if (this.props.auth) console.log (this.props.auth.type);
    return (
      <div>
        {this.props.auth &&
          !this.props.auth.type &&
          <Rodal
            enterAnimation="slideUp"
            leaveAnimation="slideDown"
            width={350}
            visible={this.state.open}
            onClose={() => this.errorHide ()}
          >
            <div style={{marginTop: '10px'}}>

              <FormControl component="fieldset">
                <FormLabel component="legend">User type</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.value}
                  onChange={event => this.handleChange (event)}
                >
                  <FormControlLabel
                    value="elderly"
                    control={<Radio />}
                    label="Above 60 years old"
                  />
                  <FormControlLabel
                    value="employee"
                    control={<Radio />}
                    label="Employee"
                  />
                  <FormControlLabel
                    value="volunteer"
                    control={<Radio />}
                    label="Volunteer"
                  />

                </RadioGroup>
              </FormControl>

            </div>
            <div>
              <a
                style={({marginTop: '100%'}, {right: '0'})}
                onClick={() => this.updateUser ()}
                class="waves-effect waves-light btn right"
              >
                Send
              </a>
            </div>

          </Rodal>}
        <NotificationContainer />

        <div className="landing">
          <Slider
            fullscreen={false}
            options={{
              duration: 500,
              height: 400,
              indicators: true,
              interval: 3500,
            }}
          >
            <Slide
              image={
                <img alt="" src="http://lorempixel.com/780/580/nature/1" />
              }
            >
              <Caption placement="center">
                <h3>
                  We all work together.
                </h3>
                <h5 className="light grey-text text-lighten-3">
                  If you are an employee and lost your job, ask for help here.
                </h5>
              </Caption>
            </Slide>
            <Slide
              image={
                <img alt="" src="http://lorempixel.com/780/580/nature/2" />
              }
            >
              <Caption placement="left">
                <h3>
                  We all help our mothers and fathers.
                </h3>
                <h5 className="light grey-text text-lighten-3">
                  If you are above sixty years old, stay at home and ask for help here.
                </h5>
              </Caption>
            </Slide>
            <Slide
              image={
                <img alt="" src="https://lorempixel.com/580/250/nature/4" />
              }
            >
              <Caption placement="right">
                <h3>
                  Be a volunteer.
                </h3>
                <h5 className="light grey-text text-lighten-3">
                  Offer help and see peopl's requests to help them.
                </h5>
              </Caption>
            </Slide>
            <Slide
              image={
                <img alt="" /*src="https://lorempixel.com/580/250/nature/4" */ />
              }
            >
              <Caption placement="center">
                <h3>
                  We are Quarantine buddy.
                </h3>
                <h5 className="light grey-text text-lighten-3">
                  Your buddy who will do anything to help you out during this quarantine.
                </h5>
              </Caption>
            </Slide>
          </Slider>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (Landing);
