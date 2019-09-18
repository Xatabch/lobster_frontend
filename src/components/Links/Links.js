import React from 'react';
import classnames from 'classnames';
import './Links.css';

export default function Links(props) {
    return (
      <div className={classnames('links', props.modifiers)}>{props.children}</div>
    )
}