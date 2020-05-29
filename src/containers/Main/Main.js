import React, { Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';

import Button from '../../components/UI/Button/Button';
import NewPost from '../../components/NewPost/NewPost';
class Main extends Component {
    state = {
        newPost: false
    }
    componentDidMount() {

    };

    onAddNewPost = () => {
        this.setState(prevState => {
            return { newPost: !prevState.newPost };
        })

        console.log('[NewPostAdd] ' + this.state.newPost);
    }
    render() {
        const cache = [];

        const urlImg = require.context('../../../public/images', true, /\.png$/);
        let a = null;
        urlImg.keys().map(key => {
            cache.push(String(key.substring(1)))
            a = key.substring(1);
        });
        const ImgBlock = cache.map(url => {
            return <ImagesBlock url={url} />
        });

        return (

            <div className={classes.Main} >
                <ImagesBlock url="https://firebasestorage.googleapis.com/v0/b/cichocka-c6fc5.appspot.com/o/images%2Fburger-logo.png?alt=media&token=b50e1ba4-ad1d-4f9c-9fbd-8742380d1d49" />
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

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);