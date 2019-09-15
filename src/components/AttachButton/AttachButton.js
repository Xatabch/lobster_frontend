import React, { Component } from 'react';
import classnames from 'classnames';
import './AttachButton.css';

import attach from '../../../public/img/attach.svg';

export default function AttachButton(props) {
        return (
            <div className="attach">
                <button className={classnames('attach__button', 
                                              props.attachOpen ? 'attach__button_theme_open' : '')}
                        onClick={() => props.onOpenButtonClick()}>
                    <img src={attach} />
                </button>
                {props.children}
            </div>
        )
}