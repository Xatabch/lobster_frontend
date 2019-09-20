import React from 'react';
import classnames from 'classnames';
import './Button.css';

export default function Button(props) {
    return (
        <button onClick={(e) => {props.onClick && props.onClick(e)}} 
                className={classnames('button', props.modifiers)}>{props.buttonText}</button>
    )
}