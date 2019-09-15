import React, { Component } from 'react';
import classnames from 'classnames';
import './AddPost.css';

import attach from '../../../public/img/attach.svg';
import camera from '../../../public/img/camera.svg';

export default class AddPost extends Component {
    constructor(state) {
        super(state);

        this.state = {
            attachOpen: false,
            formActive: false,
            postPhotos: {},
            enterSym: Symbol.for('enter'),
            postText: [],
            enterText: ''
        }
    }

    componentDidMount() {
        this.setState(state => ({
            postText: [...state.postText, state.enterSym]
        }));
    }

    onOpenButtonClick() {
        this.setState(state => ({
            attachOpen: !state.attachOpen
        }));
    }

    onInput(text) {
        this.setState({
            enterText: text
        })
    }

    onFocus(e) {
        if(!e.target.classList.contains('addpost_theme_default')) {
            const enterIndex = this.state.postText.indexOf(this.state.enterSym);

            if (enterIndex !== -1 && !this.state.enterText) {
                const postText = [...this.state.postText];
                postText.splice(enterIndex, 1);

                this.setState({
                    enterText: e.target.textContent,
                    postText: postText
                });
            }
        } else {
            if(!this.props.postText) {
                this.setState({
                    formActive: true
                });
            }
        }
    }

    onBlur() {
        if (!this.state.postText.includes(this.state.enterSym)) {
            this.setState(state => ({
                postText: [...state.postText, state.enterSym]
            }));
        } else if (!this.state.enterText) {
            if(!this.props.postText) {
                this.setState({
                    formActive: false
                });
            }
        }
    }

    onUploadPhoto(e) {
        var reader = new FileReader();
        const photoHash = Math.random().toString(36).substring(2, 10);

        reader.onload = (e) => {
            const enterIndex = this.state.postText.indexOf(this.state.enterSym);
            const postText = [...this.state.postText];
            const postPhotos = {...this.state.postPhotos};

            postText.splice(enterIndex, 1)
            postPhotos[photoHash] = e.target.result;

            this.setState(state => ({
                postPhotos: postPhotos,
                postText: [...postText, photoHash, state.enterSym]
            }));

        }

        reader.readAsDataURL(e.target.files[0]);
        this.props.onUploadPhoto(e, photoHash);
    }

   onKeyDown(e) {
        if(e.key === 'Enter') {
            const enterIndex = this.state.postText.indexOf(this.state.enterSym);
            const postText = [...this.state.postText];
            const text = e.target.textContent

            if (enterIndex !== -1) {
                postText.splice(enterIndex, 1, text, this.state.enterSym);

                this.setState({
                    enterText: '',
                    formActive: false,
                    postText: postText,
                });

                e.target.blur();
            } else {
                const textIndex = this.state.postText.indexOf(this.state.enterText);
                postText.splice(textIndex, 1, text, this.state.enterSym);

                this.setState({
                    postText: postText,
                });
            }

            this.props.onTextInput(e.target.textContent);
        }
    }

    render() {
        return (
            <div className={classnames('addpost', this.props.modifiers)}>
                {this.state.postText.map((text) => {
                    if (typeof text === 'symbol' && Symbol.keyFor(text)) {
                        return (
                            <div key={':enter:'} className="addpost__form">
                                <span contentEditable="true" 
                                      suppressContentEditableWarning={true} 
                                      className={classnames('addpost__input', 
                                                            'addpost_theme_default',
                                                            this.state.formActive ? 'addpost__input_theme_active' : '')}
                                      onFocus={(e) => {this.onFocus(e)} }
                                      onBlur={(e) => {this.onBlur(e)}}
                                      onInput={(e) => {this.onInput(e.target.textContent)}}
                                      onKeyDown={(e) => {this.onKeyDown(e)}}>{!this.state.formActive ? 'Input text here...' : ''}</span>
                                <div className="addpost__attach">
                                    <button className={classnames('attach__button', 
                                                                  this.state.attachOpen ? 'attach__button_theme_open' : '')}
                                            onClick={() => this.onOpenButtonClick()}>
                                                <img src={attach} />
                                    </button>
                                    <div className={classnames('attach__photo', 
                                                               this.state.attachOpen ? 'attach__photo_theme_open' : 'attach_theme_hidden')}>
                                        <button className="photo__button">
                                            <img src={camera} />
                                        </button>
                                        <input type="file" 
                                               className="photo__input" 
                                               onChange={(e) => {this.onUploadPhoto(e)}} multiple/>
                                    </div>
                                </div>
                            </div>
                        )
                    } else if (this.state.postPhotos[text]){
                        return (
                            <img key={text} src={this.state.postPhotos[text]} />
                        )
                    } else {
                        return (
                            <span key={text} 
                                contentEditable="true" 
                                suppressContentEditableWarning={true} 
                                className={classnames('addpost__input',
                                                        'addpost__input_theme_active')}
                                onFocus={(e) => {this.onFocus(e)} }
                                onBlur={(e) => {this.onBlur(e)}}
                                onKeyDown={(e) => {this.onKeyDown(e)}}>{text}</span>
                        )
                    }
                })}
            </div>
        )
    }
}