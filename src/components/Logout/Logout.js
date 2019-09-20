import React from 'react';
import classnames from 'classnames';
import './Logout.css';

export default function Logout(props) {
    return (
        <a onClick={(e) => {props.onClick & props.onClick(e)}}
           className={classnames('logout', props.modifiers)}></a>
    )
}