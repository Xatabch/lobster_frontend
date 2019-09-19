import React from 'react';
import classnames from 'classnames';
import './Button.css';

export default function Button(props) {
    return (
        <button onClick={() => {props.onClick && props.onClick()}} 
                className={classnames('button', props.modifiers)}>{props.buttonText}</button>
    )
}