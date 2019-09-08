import React from 'react';
import classnames from 'classnames';
import './TextForm.css';

export default class TextForm extends React.Component {
    render() {
      return (
        <div className={classnames('text-form', this.props.modifiers)}>
          <label className="text-form__label">{this.props.labelText}</label>
          {this.props.descriptionText ? <div className="text-form__description">{this.props.descriptionText}</div> : null}
          <input className="text-form__input" 
                 type={this.props.inputType} 
                 value={this.props.inputValue} 
                 onChange={(event) => {this.props.onChange(event.target.value)}} 
                 onBlur={() => {this.props.onBlur()}} />
          {this.props.errorText ? <div className="text-form__error-text">{this.props.errorText}</div> : null}
        </div>
      )
    }
}