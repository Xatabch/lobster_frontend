import React, { Component } from 'react';
import classnames from 'classnames';
import './AddPost.css';
import nanoid from 'nanoid';

import AttachButton from '../AttachButton/AttachButton';
import UploadPhoto from '../UploadPhoto/UploadPhoto';

export default class AddPost extends Component {
    constructor(state) {
        super(state);

        this.state = {
            attachOpen: false, // нажата ли кнопка attach
            formActive: false, // активна ли форма
            postPhotos: {}, // прикрепленные фотографии поста(ключ, сгенрированный хеш, значение фото в base64)
            enterSym: Symbol.for('enter'), // "позиция" enter
            postText: [], // текст поста, включая позицию enter, фотографии
            enterText: '' // текст формы, на который в данный момент сфокусированны
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

    onInput(e) {
        const text = e.target.textContent;

        this.setState({
            enterText: text,
        });
    }

    onFocus(e) {
        const input = document.querySelector('.addpost_theme_default');
        const isInputText = input.classList.contains('addpost__input_theme_active');

        if(!e.target.classList.contains('addpost_theme_default')) {
            const enterIndex = this.state.postText.indexOf(this.state.enterSym);
            const postText = [...this.state.postText];

            if (enterIndex !== -1) {
                postText.splice(enterIndex, 1);
            }

            this.setState({
                enterText: e.target.textContent,
                postText: postText
            });

        } else {
            this.setState({
                enterText: !isInputText ? '' : e.target.textContent,
                formActive: true
            });
        }
    }

    onBlur(e) {
        const postText = [...this.state.postText];

        if (!this.state.postText.includes(this.state.enterSym)) {
            if (!e.target.classList.contains('addpost_theme_default')) {
                postText[e.target.dataset.num] = e.target.textContent;
            }

            const emptyIndex = postText.indexOf('');

            if (emptyIndex !== -1) {
                postText.splice(emptyIndex, 1);
            }

            this.props.onChangeText(postText.filter(item => item !== this.state.enterSym));

            this.setState(state => ({
                postText: [...postText, state.enterSym]
            }));
        } else {
            const isDefault = e.target.classList.contains('addpost_theme_default');

            if (!this.state.enterText) {
                this.setState({
                    formActive: false
                });
            } else if (isDefault) {
                const enterIndex = this.state.postText.indexOf(this.state.enterSym);
                postText.splice(enterIndex, 0, this.state.enterText);

                this.props.onChangeText(postText.filter(item => item !== this.state.enterSym));

                this.setState({
                    postText: postText,
                    formActive: false
                });
            }
        }
    }

    onUploadPhoto(e) {
        let reader = new FileReader();
        const photoHash = nanoid();

        reader.onload = (e) => {
            const enterIndex = this.state.postText.indexOf(this.state.enterSym);
            const postText = [...this.state.postText];
            const postPhotos = {...this.state.postPhotos};

            postText.splice(enterIndex, 1, photoHash, this.state.enterSym);
            postPhotos[photoHash] = e.target.result;

            this.setState({
                postPhotos: postPhotos,
                postText: postText
            });

        }

        reader.readAsDataURL(e.target.files[0]);
        this.props.onUploadPhoto(e, photoHash);
    }

   onKeyDown(e) {
        if(e.key === 'Enter') {
            const postText = [...this.state.postText];
            const isDefault = e.target.classList.contains('addpost_theme_default');

            if(isDefault) {
                const enterIndex = this.state.postText.indexOf(this.state.enterSym);
                postText.splice(enterIndex, 0, this.state.enterText);

                this.setState({
                    postText: postText,
                    formActive: false
                });

                this.props.onChangeText(postText.filter(item => item !== this.state.enterSym));
            }
        }
    }

    render() {
        return (
            <div className={classnames('addpost', this.props.modifiers)}>
                {this.state.postText.map((text, i) => {
                    if (typeof text === 'symbol' && Symbol.keyFor(text)) {
                        return (
                            <div key={i} className="addpost__form">
                                <span contentEditable="true" 
                                      suppressContentEditableWarning={true} 
                                      className={classnames('addpost__input', 
                                                            'addpost_theme_default',
                                                            this.state.formActive ? 'addpost__input_theme_active' : '')}
                                      onFocus={(e) => {this.onFocus(e)} }
                                      onBlur={(e) => {this.onBlur(e)}}
                                      onInput={(e) => {this.onInput(e)}}
                                      onKeyDown={(e) => {this.onKeyDown(e)}}
                                      data-num={i}>{!this.state.formActive ? 'Input text here...' : ''}</span>
                                { !this.state.enterText ? 
                                <AttachButton attachOpen={this.state.attachOpen}
                                              onOpenButtonClick={this.onOpenButtonClick.bind(this)}>
                                    <UploadPhoto attachOpen={this.state.attachOpen}
                                                 onUploadPhoto={this.onUploadPhoto.bind(this)} />
                                </AttachButton> : null}
                            </div>
                        )
                    } else if (this.state.postPhotos[text]){
                        return (
                            <figure key={text} className="addpost__image">
                                <img src={this.state.postPhotos[text]} />
                            </figure>
                        )
                    } else {
                        return (
                            <span key={i} 
                                contentEditable="true" 
                                suppressContentEditableWarning={true} 
                                className={classnames('addpost__input',
                                                      'addpost__input_theme_active')}
                                onFocus={(e) => {this.onFocus(e)} }
                                onBlur={(e) => {this.onBlur(e)}}
                                onInput={(e) => {this.onInput(e)}}
                                onKeyDown={(e) => {this.onKeyDown(e)}}
                                data-num={i}>{text}</span>
                        )
                    }
                })}
            </div>
        )
    }
}