import React from 'react';
import classnames from 'classnames';
import './Forms.css';

export default function Forms(props) {
    return (
        <form className={classnames('forms', props.modifiers)}>{props.children}</form>
    )
}