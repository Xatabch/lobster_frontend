import React from 'react';
import classnames from 'classnames';

export default function Forms(props) {
    return (
        <form onSubmit={(e) => {props.onSubmit(e)}} className={classnames('forms', props.modifiers)}>{props.children}</form>
    )
}