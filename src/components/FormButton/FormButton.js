import React from 'react';
import classnames from 'classnames';
import './FormButton.css';

export default function FormButton(props) {
    return (
      <button className={classnames('form-button', props.modifiers)}
              onClick={() => {props.onClick()}}>{props.buttonText}</button>
    )
}