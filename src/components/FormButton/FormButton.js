import React from 'react';
import classnames from 'classnames';
import './FormButton.css';

export default function FormButton(props) {
    return (
      <button className={classnames('form-button', props.modifiers)}>{props.buttonText}</button>
    )
}