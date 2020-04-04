import React, {Component} from 'react';
import {Select} from 'react-materialize';
import 'materialize-css';

class SelectInput extends Component {
  render () {
    return (
      <Select
        id={this.props.id}
        multiple={false}
        onChange={() => this.props.action()}
        options={{
          classes: '',
          dropdownOptions: {
            alignment: 'right',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          },
        }}
        value=""
      >
        <option value="" disabled selected>{this.props.label}</option>
        <option value="New Cairo">New Cairo</option>
        <option value="Nasr City">Nasr City</option>
        <option value="Ma'adi">Ma'adi</option>
        <option value="heliopolis">heliopolis</option>
        <option value="October">October</option>
        <option value="Down Town">Down Town</option>
      </Select>
    );
  }
}
export default SelectInput;
