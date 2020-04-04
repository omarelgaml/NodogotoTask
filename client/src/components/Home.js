import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Rodal from 'rodal';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Home extends Component {
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
    NotificationManager.error ('Please select a type and click send', 'Error', 2500);
  }
  render () {
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
                    label="Above 60"
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
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {auth: state.auth};
}

export default connect (mapStateToProps) (Home);
