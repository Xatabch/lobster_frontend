import React from 'react';
import classnames from 'classnames';
import './Title.css';

export default function Title(props) {
    return (
      <div className={classnames('title', props.modifiers)}>{props.titleText}</div>
    )
}