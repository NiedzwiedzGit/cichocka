import React, { Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';

import Button from '../../components/UI/Button/Button';
import NewPost from '../../components/NewPost/NewPost';
import Backdrop from '../../components/UI/Backdrop/Backdrop';


import * as actions from '../../store/actions/index';


class Main extends Component {
    state = {
        newPost: false,
        url: [],
        text: false,
        test: null
    }
    componentDidMount() {
        this.props.onFetchContent();
        this.props.onFetchPostContent();
    };

    onAddNewPost = () => {
        this.setState(prevState => {
            return { newPost: !prevState.newPost };
        })

        console.log('[NewPostAdd] ' + this.state.newPost);
    }
    render() {
        let ImgBlock = null;
        // if (this.props.postContent != null && this.props.imageContentFullPath != null) {
        //     if (this.props.postContent.length != 0 && this.props.imageContentFullPath.length != 0) {
        //         console.log('[Main Component] =>', this.props.postContent);
        //         ImgBlock = this.props.imageContentFullPath.map((url, index) => {

        //             return <ImagesBlock
        //                 key={index}
        //                 url={url}
        //             // architects={this.props.postContent[index].author}
        //             />
        //         });
        //         console.log('[Main Component FullPath] =>', ImgBlock);
        //     }

        //     // this.setState({ url: this.props.imageContentFullPath })

        // } else null;

        // const cache = [];

        // const urlImg = require.context('../../../public/images', true, /\.png$/);
        // let a = null;
        // urlImg.keys().map(key => {
        //     cache.push(String(key.substring(1)))
        //     a = key.substring(1);
        // });
        // if (this.props.postContent != null && this.props.imageContentFullPath != null) {
        // console.log(this.props.postContent.author)
        ImgBlock = this.props.imageContentFullPath.map((url, index) => {
            return <ImagesBlock
                key={index}
                url={url}
            // architects={this.props.postContent.author}
            />
        });

        console.log('[Main Component] =>', this.props.postContent)
        if (this.props.postContent != null) {
            if (this.props.postContent.length != 0) {
                // let Context = this.props.postContent.map(res => {
                //     console.log(res)
                // });
            }
        }

        if (this.props.imageContentPath.length != 0 && this.props.loadingContent == false) {
            // setTimeout(() => {
            //     this.setState({ url: this.props.imageContentFullPath })
            // }, 1000);
        }
        return (

            <div className={classes.Main} >

                <Button
                    btnType={!this.state.newPost ? "Add" : "Close"}
                    clicked={this.onAddNewPost} />
                {this.state.newPost && !this.props.loading ? <NewPost /> : null}
                {this.state.newPost ? <Backdrop
                    show={this.state.newPost}
                    clicked={this.onAddNewPost} /> : null}

                {ImgBlock}


            </div >
        );
    };
};


const mapStateToProps = state => {
    return {
        imageContentPath: state.main.imageContentPath,
        imageContentFullPath: state.main.imageContentFullPath,
        postContent: state.main.postContent,
        loadingNewPost: state.newpost.loading,
        loadingContent: state.main.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchContent: () => dispatch(actions.fetchMainContent()),
        onFetchPostContent: () => dispatch(actions.fetchPostContent())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);