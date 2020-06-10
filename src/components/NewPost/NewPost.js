import React, { Component } from 'react';
import axios from '../../axios-orders';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import classes from './NewPost.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ImagesBlock from '../ImagesBlock/ImagesBlock';

import { storage } from '../../shared/firebase';

import Button from '../UI/Button/Button';
import ButtonBootstrap from 'react-bootstrap/Button';
import PropagateLoader from "react-spinners/PropagateLoader";

import ImageUploading from "react-images-uploading";

const maxNumber = 100;
const maxMbFileSize = 6 * 1024 * 1024;

class NewPost extends Component {
    state = {
        content: '',
        country: '',
        region: '',
        author: '',
        year: '',
        imgNeme:'',
        btnMessage: "Success",
        imageFile: {},
        checkBox: false,
        checked: {},
        sAuthorMassage: true
    }

    componentWilUpdate() {
        console.log('[newPost] ' + this.props.loading);
    }
    submitPost = () => {
        let key = null;
        if (!this.props.loading && !this.props.animate) {
            this.props.onFetchNewPost(
                this.state.content,
                this.state.country,
                this.state.region,
                this.state.author,
                this.state.year,
                this.state.imageFile,
                this.state.imgNeme,
                key = new Date().getTime())
            // this.handleFireBaseUpload();
        } else null;

        !this.props.loading && this.props.animate ?
            this.setState({
                content: '',
                country: '',
                region: '',
                author: '',
                year: '',
                imgNeme:''
            }) : null;
        this.props.onAnimateSuccesErrorButton();
    };

    handleImageAsFile = (imageList) => {
        const image = imageList;
        this.setState({ imageFile: image })
    };
    handleFireBaseUpload = () => {
        // console.log('start of upload');
        // if (this.state.imageFile === '') {
        //     console.error(`not an image, the image file is a ${typeof (imageFile)}`)
        // }

        // Array.from(this.state.imageFile).map(img => {
        //     const uploadTask = storage.ref(`/images/${img.file.name}`).put(img.file);
        // });
        // const uploadTask = storage.ref(`/images/${this.state.imageFile.name}`).put(this.state.imageFile);
        //initiates the firebase side uploading 
        //     uploadTask.on('state_changed',
        //         (snapShot) => {
        //             //takes a snap shot of the process as it is happening
        //             console.log(snapShot)
        //         }, (err) => {
        //             console.log(err)
        //         }, () => {
        //             storage.ref('images').child(this.state.imageFile.name).getDownloadURL()
        //                 .then(fireBaseUrl => {
        //                     console.log('[storege ref] ' + fireBaseUrl);
        //                 })
        //         })
    }

    handleChangeChk=(event,index)=>{
        console.log(event.target.name),

        this.setState(previousState => ({
            checked:{
                ...previousState.checked,
                [index]:!previousState.checked[index]
            }
            }));
        }
    
    render() {
        const { checked } = this.state;
        const checkedCount = Object.keys(checked).filter(key => checked[key]).length;
        const disabled = checkedCount > 0;
        let year = [];
        for (let i = 1960; i <= 2060; i++) {
            year.push(<option key={i} value={i}>{i}</option>);
        }




        console.log('[this.props.animate] -> ' + this.props.animate);
        let animationButton = null;
        let hidePostForm = "Show";
        if (!this.props.loading && !this.props.animate) {

            animationButton = <ButtonBootstrap
                variant="outline-dark"
                onClick={this.submitPost}>Add Post</ButtonBootstrap>

            if (this.state.btnMessage == "Do it again?") {
                this.setState({ btnMessage: "Success" });
            }
        } else if (!this.props.loading && this.props.animate) {
            hidePostForm = "Hide";
            setTimeout(() => {
                this.setState({ btnMessage: "Do it again?" })
            }, 1000);

            animationButton = <ButtonBootstrap
                variant="success"
                onClick={this.submitPost}>{this.state.btnMessage}</ButtonBootstrap>,
                <Button
                    btnType="Success"
                />

        } else { animationButton = <label className={classes.Loading}><PropagateLoader /></label> }


        return (
            <div className={classes.NewPost}>
                <div className={classes[hidePostForm]}>
                    <h1>Add a Post</h1>
                    <label>Architects</label>
                    <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option key='1' value="0" >Select Author</option>
                        <option key='2'value="Cichocka">Cichocka</option>
                        <option key='3'value="Manu">Manu</option>
                    </select>
                    <label>Location</label>
                    {/* <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} /> */}
                    <CountryDropdown
                        value={this.state.country}
                        onChange={(val) => this.setState({ country: val })} />
                    <br />
                    <RegionDropdown
                        country={this.state.country}
                        value={this.state.region}
                        onChange={(val) => this.setState({ region: val })} />

                    <label>Year</label>
                    <select value={this.state.year} onChange={(event) => this.setState({ year: event.target.value })}>
                        {year}
                    </select>
                    <label>Content</label>
                    <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                    <br />
                </div>
                <Button
                    btnState={hidePostForm + 'PostForm'}
                    btnType="Success"
                />
                <div className={classes.SubmitBtn}>
                    {animationButton}
                </div>
                <ImageUploading
                    onChange={this.handleImageAsFile}
                    maxNumber={maxNumber}
                    multiple
                    maxFileSize={maxMbFileSize}
                    acceptType={["jpg", "gif", "png"]}

                >
                    {({ imageList, onImageUpload, onImageRemoveAll }) => (
                        // write your building UI
                        <div className={classes.ImgDivWraper}>
                            <div className={classes.BtnWraper}>
                                <ButtonBootstrap variant="outline-primary" onClick={onImageUpload}>Upload images</ButtonBootstrap>{' '}
                                <ButtonBootstrap variant="outline-danger" onClick={onImageRemoveAll}>Remove all images</ButtonBootstrap>{' '}
                            </div>
                            {console.log(imageList.length)}
                            {imageList.length !== 0 ?
                                <div className={classes.PreloaderWraper}>
                                    {imageList.map((image,index) => (
                                        < div key={image.key}
                                            className={classes.ImgDiv}>
                                            <img src={image.dataURL} />
                                            <input
                                                ref={ref => this.fileInput = ref}
                                                key={index}
                                                type="checkbox"
                                                name={image.file.name}
                                                value={image.dataURL}
                                                checked={checked[index] || false}
                                                disabled={!checked[index] && disabled}
                                                onChange={(event) => this.handleChangeChk(event, index)} 
                                                />                                            <ButtonBootstrap variant="outline-info" onClick={image.onUpdate}>
                                                <svg className="bi bi-arrow-clockwise" width="0.9em" height="0.9em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z" />
                                                    <path fillRule="evenodd" d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </ButtonBootstrap>

                                            <ButtonBootstrap variant="outline-danger" onClick={image.onRemove}>
                                                <svg className="bi bi-trash" width="0.8em" height="0.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>

                                            </ButtonBootstrap>
                                        </div>
                                    ))}
                                </div> : null}
                        </div>
                    )}
                </ImageUploading>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.newpost.loading,
        animate: state.newpost.animate
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchNewPost: (content, country, region, author, year, imageFile, key) => dispatch(actions.addNewPost(content, country, region, author, year, imageFile, key)),
        onAnimateSuccesErrorButton: () => dispatch(actions.animateSuccesErrorButton()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);