import React from 'react';
import classnames from 'classnames';

export default function Subtitle(props) {
    return (
        <div className={classnames('subtitle', props.modifiers)}>{props.subtitleText}</div>
    )
}