import React from 'react';
import classnames from 'classnames';
import './UploadPhoto.css';

import camera from '../../../public/img/camera.svg';

export default function UploadPhoto(props) {
    return (
        <div className={classnames('upload-photo', 
                                   props.attachOpen ? 'upload-photo_theme_open' : 'upload-photo_theme_hidden')}>
            <button className="upload-photo__button">
                <img src={camera} />
            </button>
            <input type="file" 
                   className="upload-photo__input" 
                   onChange={(e) => {props.onUploadPhoto(e)}}/>
        </div>
    )
}