import React from 'react';
import classnames from 'classnames';
import './Head.css';

export default function Head(props) {
    return (
        <div className={classnames('head', props.modifiers)}>{props.children}</div>
    )
}