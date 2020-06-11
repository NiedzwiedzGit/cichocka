import React, { Suspense, Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';

import Button from '../../components/UI/Button/Button';
import NewPost from '../NewPost/NewPost';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import * as actions from '../../store/actions/index';
const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
class Main extends Component {
    state = {
        newPost: false,
        url: [],
        text: false,
        test: null
    }

    componentDidMount() {
        // this.props.onFetchContent();
        // this.props.onFetchPostContent();

    };
    componentDidUpdate() {
        if (!this.props.loadingNewPost && !this.props.loadingContent && this.state.url.length == 0) {
            setTimeout(() => {
                this.setState({ url: this.props.imageContentFullPath })
                //window.location.reload(false);
            }, 1000);
        }
    }

    onLoadContent = () => {
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={this.state.waitLoader}
        />;
        if (this.props.postContent != null && this.props.imageContentFullPath != null) {
            if (this.props.postContent.length != 0 && this.props.imageContentFullPath.length != 0) {
                console.log('[Main Component] =>', this.props.postContent);
                ImgBlock = this.props.imageContentFullPath.map((url, index) => {

                    return <ImagesBlock
                        key={index}
                        url={url}
                        architects={this.props.postContent[index].author}
                        locationCountry={this.props.postContent[index].country}
                        locationRegion={this.props.postContent[index].region}
                        year={this.props.postContent[index].year}
                        clicked={() => this.props.onDeletePost(this.props.postContent[index].id, this.props.postContent[index].imgName)}
                    />
                });
            }
        } else null;

        return ImgBlock;
    }
    onAddNewPost = () => {
        this.setState(prevState => {
            return { newPost: !prevState.newPost };
        })
        return
    }
    render() {
        return (

            <div className={classes.Main} >

                <Button
                    btnType={!this.state.newPost ? "Add" : "Close"}
                    clicked={this.onAddNewPost} />
                {this.state.newPost && !this.props.loading ? <NewPost /> : null}
                {this.state.newPost ? <Backdrop
                    show={this.state.newPost}
                    clicked={this.onAddNewPost} /> : null}
                <Suspense fallback={<div>loading</div>}>
                    {this.onLoadContent()}
                </Suspense>

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
        imageFile: state.newpost.imageFile,
        loadingContent: state.main.loading,
        refresh: state.main.refresh
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchContent: () => dispatch(actions.fetchMainContent()),
        onFetchPostContent: () => dispatch(actions.fetchPostContent()),
        onDeletePost: (id, imgName) => dispatch(actions.deletePost(id, imgName))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);