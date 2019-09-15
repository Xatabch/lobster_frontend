import React, { Component } from 'react';
import classnames from 'classnames';
import './AddPost.css';

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

            if (enterIndex !== -1) {
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

                this.setState(state => ({
                    enterText: '',
                    formActive: false,
                    postText: postText,
                }));

                e.target.blur();
            } else {
                const textIndex = this.state.postText.indexOf(this.state.enterText);
                postText.splice(textIndex, 1, e.target.textContent, this.state.enterSym);

                this.setState({
                    postText: [...postText],
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19" stroke="#FFFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M5 12H19" stroke="#FFFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            <div className={classnames('attach__photo', 
                                                       this.state.attachOpen  ? '' : 'attach_theme_hidden', 
                                                       this.state.attachOpen  ? 'attach__photo_theme_open' : '')}>
                                <button className="photo__button">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            <input type="file" 
                                   className="photo__input" 
                                   onChange={(e) => { this.onUploadPhoto(e) }} multiple/>
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
                        <span key={text} contentEditable="true" 
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