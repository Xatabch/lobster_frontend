import React from 'react';
import classnames from 'classnames';
import './Bar.css';

export default function Bar(props) {
    return (
        <div className={classnames('bar', props.modifiers)}>{props.children}</div>
    )
}