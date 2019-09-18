import React from 'react';
import classnames from 'classnames';
import './Logo.css';

export default function Logo(props) {
    return (
        <div className={classnames('logo', props.modifiers)}>{props.children}</div>
    )
}