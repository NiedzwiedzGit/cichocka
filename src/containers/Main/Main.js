import React, { Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';

import Button from '../../components/UI/Button/Button';
import NewPost from '../../components/NewPost/NewPost';


import * as actions from '../../store/actions/index';
class Main extends Component {
    state = {
        newPost: false,
        url: [],
        text: false
    }
    componentDidMount() {
        this.props.onFetchContent();
        console.log('[Main Container]', this.props.imageContentPath);

    };

    onAddNewPost = () => {
        this.setState(prevState => {
            return { newPost: !prevState.newPost };
        })

        console.log('[NewPostAdd] ' + this.state.newPost);
    }
    render() {
        // const cache = [];

        // const urlImg = require.context('../../../public/images', true, /\.png$/);
        // let a = null;
        // urlImg.keys().map(key => {
        //     cache.push(String(key.substring(1)))
        //     a = key.substring(1);
        // });

        if (this.props.imageContentPath !== null) {
            setTimeout(() => {
                this.setState({ url: this.props.imageContentFullPath })
            }, 10);
        }
        let key = null;
        const ImgBlock = this.props.imageContentFullPath.map((url, index) => {
            return <ImagesBlock key={index} url={url} />
        });

        return (

            <div className={classes.Main} >

                <Button
                    btnType={!this.state.newPost ? "Add" : "Close"}
                    clicked={this.onAddNewPost} />
                {this.state.newPost ? <NewPost /> : null}

                {ImgBlock}

            </div >
        );
    };
};


const mapStateToProps = state => {
    return {
        imageContentPath: state.main.imageContentPath,
        imageContentFullPath: state.main.imageContentFullPath,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchContent: () => dispatch(actions.fetchMainContent())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);